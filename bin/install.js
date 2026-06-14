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
const hasSkillsDir = args.includes('--skills-dir');

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
 * Parse --dir argument (used with --skills-dir)
 */
function parseDirArg() {
  const idx = args.findIndex(arg => arg === '--dir');
  if (idx !== -1) {
    const nextArg = args[idx + 1];
    if (!nextArg || nextArg.startsWith('-')) {
      console.error(`  ${yellow}--dir requires a path argument${reset}`);
      process.exit(1);
    }
    return nextArg;
  }
  const dirArg = args.find(arg => arg.startsWith('--dir='));
  if (dirArg) {
    return dirArg.split('=').slice(1).join('=');
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
 * Recursively copy directory, rewriting framework refs in text files.
 * Replaces @~/.claude/<x>-framework/ and @./.claude/<x>-framework/ with
 * ${CLAUDE_PLUGIN_ROOT}/<x>-framework/ so the plugin is self-contained.
 */
function copyDirWithRefRewrite(srcDir, destDir, skipDirs = []) {
  fs.mkdirSync(destDir, { recursive: true });
  const entries = fs.readdirSync(srcDir, { withFileTypes: true });
  for (const entry of entries) {
    if (skipDirs.includes(entry.name)) continue;
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);
    if (entry.isDirectory()) {
      copyDirWithRefRewrite(srcPath, destPath, skipDirs);
    } else {
      const content = fs.readFileSync(srcPath, 'utf8');
      // Rewrite @~/.claude/<x>-framework/ → ${CLAUDE_PLUGIN_ROOT}/<x>-framework/
      // Rewrite @./.claude/<x>-framework/ → ${CLAUDE_PLUGIN_ROOT}/<x>-framework/
      const rewritten = content
        .replace(/@~\/\.claude\/([^/\s]+)/g, '${CLAUDE_PLUGIN_ROOT}/$1')
        .replace(/@\.\/\.claude\/([^/\s]+)/g, '${CLAUDE_PLUGIN_ROOT}/$1');
      if (rewritten !== content) {
        fs.writeFileSync(destPath, rewritten, 'utf8');
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
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

/**
 * Derive a short plugin name from the package name.
 * "@chrisai/seed" → "seed", "seed" → "seed"
 */
function shortName(pkgName) {
  const parts = pkgName.split('/');
  return parts[parts.length - 1];
}

console.log(banner);

// Show help
if (hasHelp) {
  console.log(`  ${yellow}Usage:${reset} npx @chrisai/seed [options]

  ${yellow}Options:${reset}
    ${cyan}-l, --local${reset}              Install to ./.claude/commands/ instead of global
    ${cyan}-c, --config-dir <path>${reset}  Specify custom Claude config directory
    ${cyan}--skills-dir${reset}             Install as a Claude Code skills-directory plugin
    ${cyan}    --dir <path>${reset}         Target directory for --skills-dir (default: ./.claude/skills/seed/)
    ${cyan}-h, --help${reset}               Show this help message

  ${yellow}Examples:${reset}
    ${dim}# Install globally (default) — available in all workspaces${reset}
    npx @chrisai/seed

    ${dim}# Install to current project only${reset}
    npx @chrisai/seed --local

    ${dim}# Install as a skills-directory plugin (default target: .claude/skills/seed/)${reset}
    npx @chrisai/seed --skills-dir

    ${dim}# Install as a skills-directory plugin to a custom path${reset}
    npx @chrisai/seed --skills-dir --dir /path/to/.claude/skills/seed

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

// ─── Skills-dir install mode ───────────────────────────────────────────────

if (hasSkillsDir) {
  const short = shortName(pkg.name);
  const explicitDir = expandTilde(parseDirArg());
  const skillsTarget = explicitDir || path.join(process.cwd(), '.claude', 'skills', short);

  const locationLabel = skillsTarget.replace(os.homedir(), '~').replace(process.cwd(), '.');

  // Check if already installed
  if (fs.existsSync(skillsTarget)) {
    console.log(`  ${yellow}Existing skills-dir installation found at ${locationLabel}${reset}`);
    console.log(`  Updating...`);
    fs.rmSync(skillsTarget, { recursive: true, force: true });
  }

  console.log(`  Installing as skills-directory plugin to ${cyan}${locationLabel}${reset}\n`);

  // Write .claude-plugin/plugin.json
  const pluginMetaDir = path.join(skillsTarget, '.claude-plugin');
  fs.mkdirSync(pluginMetaDir, { recursive: true });
  const pluginJson = {
    name: short,
    version: pkg.version,
    description: pkg.description,
  };
  fs.writeFileSync(
    path.join(pluginMetaDir, 'plugin.json'),
    JSON.stringify(pluginJson, null, 2) + '\n',
    'utf8'
  );
  console.log(`  ${green}+${reset} .claude-plugin/plugin.json ${dim}(name=${short}, version=${pkg.version})${reset}`);

  // This package has commands/ only — copy them with ref rewriting
  const src = path.join(__dirname, '..');
  const commandsSrc = path.join(src, 'commands') || null;
  const seedCommandSrc = path.join(src); // seed files live at root level, installed under commands/seed/
  const commandsDest = path.join(skillsTarget, 'commands', short);

  fs.mkdirSync(commandsDest, { recursive: true });

  // Copy entry point
  fs.copyFileSync(path.join(src, 'seed.md'), path.join(commandsDest, 'seed.md'));
  console.log(`  ${green}+${reset} commands/${short}/seed.md ${dim}(entry point)${reset}`);

  // Copy tasks
  const tasksSrc = path.join(src, 'tasks');
  const tasksDest = path.join(commandsDest, 'tasks');
  copyDirWithRefRewrite(tasksSrc, tasksDest);
  const taskCount = countFiles(tasksSrc, '.md');
  console.log(`  ${green}+${reset} commands/${short}/tasks/ ${dim}(${taskCount} task files)${reset}`);

  // Copy data
  const dataSrc = path.join(src, 'data');
  const dataDest = path.join(commandsDest, 'data');
  copyDirWithRefRewrite(dataSrc, dataDest);
  const dataCount = countFiles(dataSrc, '.md');
  const typeCount = fs.readdirSync(dataSrc, { withFileTypes: true }).filter(e => e.isDirectory()).length;
  console.log(`  ${green}+${reset} commands/${short}/data/ ${dim}(${typeCount} types, ${dataCount} files)${reset}`);

  // Copy templates
  const templatesSrc = path.join(src, 'templates');
  const templatesDest = path.join(commandsDest, 'templates');
  copyDirWithRefRewrite(templatesSrc, templatesDest);
  const templateCount = countFiles(templatesSrc, '.md');
  console.log(`  ${green}+${reset} commands/${short}/templates/ ${dim}(${templateCount} planning templates)${reset}`);

  // Copy checklists
  const checklistsSrc = path.join(src, 'checklists');
  const checklistsDest = path.join(commandsDest, 'checklists');
  copyDirWithRefRewrite(checklistsSrc, checklistsDest);
  console.log(`  ${green}+${reset} commands/${short}/checklists/ ${dim}(planning quality gate)${reset}`);

  console.log(`
  ${green}Done!${reset} Plugin installed as ${cyan}${short}@skills-dir${reset}

  ${yellow}Notes:${reset}
    - This plugin loads ${dim}next session${reset} (skills-dir plugins require a Claude Code restart)
    - Requires ${dim}workspace trust${reset} to be enabled for this directory
    - For ${dim}Claude Code Cloud${reset}: commit ${cyan}.claude/skills/${short}/${reset} to your repository
      so team members and cloud agents can load the plugin automatically
    - Access commands via ${cyan}/${short}${reset} once loaded
`);
  process.exit(0);
}

// ─── Standard install mode ────────────────────────────────────────────────

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
