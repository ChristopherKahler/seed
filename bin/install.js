#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');

// Colors
const green = '\x1b[32m';
const cyan = '\x1b[36m';
const yellow = '\x1b[33m';
const dim = '\x1b[2m';
const reset = '\x1b[0m';

// Get version from package.json
const pkg = require('../package.json');

const banner = `
${green}  ███████╗███████╗███████╗██████╗
  ██╔════╝██╔════╝██╔════╝██╔══██╗
  ███████╗█████╗  █████╗  ██║  ██║
  ╚════██║██╔══╝  ██╔══╝  ██║  ██║
  ███████║███████╗███████╗██████╔╝
  ╚══════╝╚══════╝╚══════╝╚═════╝${reset}

  SEED ${dim}v${pkg.version}${reset}
  Structured Evaluation & Engineering Design
`;

// Parse args
const args = process.argv.slice(2);
const hasHelp = args.includes('--help') || args.includes('-h');
const hasLocal = args.includes('--local') || args.includes('-l');

// Parse --config-dir argument
function parseConfigDirArg() {
  const idx = args.findIndex(arg => arg === '--config-dir' || arg === '-c');
  if (idx !== -1) {
    const nextArg = args[idx + 1];
    if (!nextArg || nextArg.startsWith('-')) {
      console.error(`  ${yellow}--config-dir requires a path argument${reset}`);
      process.exit(1);
    }
    return nextArg;
  }
  const configDirArg = args.find(arg => arg.startsWith('--config-dir=') || arg.startsWith('-c='));
  if (configDirArg) {
    return configDirArg.split('=')[1];
  }
  return null;
}

/**
 * Expand ~ to home directory
 */
function expandTilde(filePath) {
  if (filePath && filePath.startsWith('~/')) {
    return path.join(os.homedir(), filePath.slice(2));
  }
  return filePath;
}

/**
 * Recursively copy directory, skipping .paul/, .git/, node_modules/, bin/
 */
function copyDir(srcDir, destDir, skipDirs = []) {
  fs.mkdirSync(destDir, { recursive: true });
  const entries = fs.readdirSync(srcDir, { withFileTypes: true });
  for (const entry of entries) {
    if (skipDirs.includes(entry.name)) continue;
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath, skipDirs);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

/**
 * Count files recursively
 */
function countFiles(dir, ext) {
  let count = 0;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      count += countFiles(fullPath, ext);
    } else if (!ext || entry.name.endsWith(ext)) {
      count++;
    }
  }
  return count;
}

console.log(banner);

// Show help
if (hasHelp) {
  console.log(`  ${yellow}Usage:${reset} npx @chrisai/seed [options]

  ${yellow}Options:${reset}
    ${cyan}-l, --local${reset}              Install to ./.claude/commands/ instead of global
    ${cyan}-c, --config-dir <path>${reset}  Specify custom Claude config directory
    ${cyan}-h, --help${reset}               Show this help message

  ${yellow}Examples:${reset}
    ${dim}# Install globally (default) — available in all workspaces${reset}
    npx @chrisai/seed

    ${dim}# Install to current project only${reset}
    npx @chrisai/seed --local

  ${yellow}What gets installed:${reset}
    ${cyan}commands/seed/${reset}
      seed.md              Entry point (routing + persona)
      tasks/               5 task files (ideate, graduate, launch, status, add-type)
      data/                15 type-specific data files (5 types x 3 files)
      templates/           5 PLANNING.md output templates
      checklists/          Planning quality gate
`);
  process.exit(0);
}

// Determine install target
const explicitConfigDir = parseConfigDirArg();
const configDir = expandTilde(explicitConfigDir) || expandTilde(process.env.CLAUDE_CONFIG_DIR);
const globalDir = configDir || path.join(os.homedir(), '.claude');
const claudeDir = hasLocal ? path.join(process.cwd(), '.claude') : globalDir;
const seedDest = path.join(claudeDir, 'commands', 'seed');

const locationLabel = hasLocal
  ? seedDest.replace(process.cwd(), '.')
  : seedDest.replace(os.homedir(), '~');

// Check if already installed
if (fs.existsSync(seedDest)) {
  console.log(`  ${yellow}Existing installation found at ${locationLabel}${reset}`);
  console.log(`  Updating...`);
  fs.rmSync(seedDest, { recursive: true, force: true });
}

console.log(`  Installing to ${cyan}${locationLabel}${reset}\n`);

// Copy skill files
const src = path.join(__dirname, '..');

// Copy entry point
fs.mkdirSync(seedDest, { recursive: true });
fs.copyFileSync(path.join(src, 'seed.md'), path.join(seedDest, 'seed.md'));
console.log(`  ${green}+${reset} seed.md ${dim}(entry point)${reset}`);

// Copy tasks
const tasksSrc = path.join(src, 'tasks');
const tasksDest = path.join(seedDest, 'tasks');
copyDir(tasksSrc, tasksDest);
const taskCount = countFiles(tasksSrc, '.md');
console.log(`  ${green}+${reset} tasks/ ${dim}(${taskCount} task files)${reset}`);

// Copy data
const dataSrc = path.join(src, 'data');
const dataDest = path.join(seedDest, 'data');
copyDir(dataSrc, dataDest);
const dataCount = countFiles(dataSrc, '.md');
const typeCount = fs.readdirSync(dataSrc, { withFileTypes: true }).filter(e => e.isDirectory()).length;
console.log(`  ${green}+${reset} data/ ${dim}(${typeCount} types, ${dataCount} files)${reset}`);

// Copy templates
const templatesSrc = path.join(src, 'templates');
const templatesDest = path.join(seedDest, 'templates');
copyDir(templatesSrc, templatesDest);
const templateCount = countFiles(templatesSrc, '.md');
console.log(`  ${green}+${reset} templates/ ${dim}(${templateCount} planning templates)${reset}`);

// Copy checklists
const checklistsSrc = path.join(src, 'checklists');
const checklistsDest = path.join(seedDest, 'checklists');
copyDir(checklistsSrc, checklistsDest);
console.log(`  ${green}+${reset} checklists/ ${dim}(planning quality gate)${reset}`);

console.log(`
  ${green}Done!${reset} Open Claude Code and type ${cyan}/seed${reset} to start.
`);
