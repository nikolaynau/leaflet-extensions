import { execSync } from 'node:child_process';

const mode = process.argv[2] ?? 'patch';

const gitStatus = execSync('git status -s').toString('utf-8');
console.log('status: ', gitStatus, gitStatus.length);
/*

execSync(`npm version --workspaces --git-tag-version=false ${mode}`, {
  stdio: 'inherit'
});

execSync(
  'git add package-lock.json packages/* && git commit -m "build: update workspace versions"',
  { stdio: 'inherit' }
);

execSync(`npm version ${mode}`, { stdio: 'inherit' });
*/
