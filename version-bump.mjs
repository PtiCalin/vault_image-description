import { readFileSync, writeFileSync } from 'fs';

function bump(version, type) {
  const [maj, min, patch] = version.split('.').map(Number);
  if (type === 'major') return `${maj + 1}.0.0`;
  if (type === 'minor') return `${maj}.${min + 1}.0.0`;
  return `${maj}.${min}.${patch + 1}`;
}

const type = process.argv[2] ?? 'patch';

const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
const manifest = JSON.parse(readFileSync('manifest.json', 'utf8'));
const versions = JSON.parse(readFileSync('versions.json', 'utf8'));

const newVersion = bump(manifest.version, type);

pkg.version = newVersion;
manifest.version = newVersion;
versions[newVersion] = manifest.minAppVersion;

writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n');
writeFileSync('manifest.json', JSON.stringify(manifest, null, 2) + '\n');
writeFileSync('versions.json', JSON.stringify(versions, null, 2) + '\n');

console.log(`Bumped to v${newVersion}`);
