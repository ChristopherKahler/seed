#!/usr/bin/env node

// Skip if explicitly opted out
if (process.env.SEED_SKIP_POSTINSTALL === '1') process.exit(0);

// Only run automatically on global installs, not local/dependency installs
if (!process.env.npm_config_global) process.exit(0);

try {
  require('./install.js');
} catch (err) {
  console.warn('\n  [seed] postinstall skipped:', err.message, '\n');
}
