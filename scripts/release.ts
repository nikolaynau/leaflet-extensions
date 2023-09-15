import { execSync } from 'node:child_process';

const mode = process.argv[2] ?? 'patch';

const result = execSync('git status -s').toString('utf-8');
if (result.length > 0) {
  console.log('Git working directory not clean.');
  process.exit(1);
}

execSync(`npm version --workspaces --git-tag-version=false ${mode}`, {
  stdio: 'inherit'
});

execSync(
  'git add package-lock.json packages/* && git commit -m "build: update workspace versions"',
  { stdio: 'inherit' }
);

execSync(`npm version ${mode}`, { stdio: 'inherit' });
