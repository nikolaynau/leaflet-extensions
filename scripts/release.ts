import { execSync } from 'node:child_process';

const mode = process.argv[2] ?? 'patch';

execSync(`npm version --workspaces --git-tag-version=false ${mode}`);

execSync(
  'git add packages/* && git commit -m "build: update workspace versions"'
);

execSync(`npm version ${mode}`);
