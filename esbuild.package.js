const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');
const { clean } = require('esbuild-plugin-clean');
const { copy } = require('esbuild-plugin-copy');
const { copyFolderFiles, addReleaseFlag } = require('@hackolade/hck-esbuild-plugins-pack');
const { EXCLUDED_EXTENSIONS, EXCLUDED_FILES, DEFAULT_RELEASE_FOLDER_PATH } = require('./buildConstants');

const packageData = JSON.parse(fs.readFileSync('./package.json').toString());
const RELEASE_FOLDER_PATH = path.join(DEFAULT_RELEASE_FOLDER_PATH, `${packageData.name}-${packageData.version}`);

esbuild
	.build({
		entryPoints: [
			path.resolve(__dirname, 'api', 'fe.js'),
			path.resolve(__dirname, 'forward_engineering', 'api.js'),
		],
		bundle: true,
		keepNames: true,
		platform: 'node',
		target: 'node16',
		outdir: RELEASE_FOLDER_PATH,
		minify: true,
		logLevel: 'info',
		external: ['lodash', 'typescript'],
		plugins: [
			clean({
				patterns: [DEFAULT_RELEASE_FOLDER_PATH],
			}),
			copy({
				assets: {
					from: [path.join('node_modules', 'lodash', '**', '*')],
					to: [path.join('node_modules', 'lodash')],
				},
			}),
			copy({
				assets: {
					from: [path.join('node_modules', 'typescript', '**', '*')],
					to: [path.join('node_modules', 'typescript')],
				},
			}),
			copyFolderFiles({
				fromPath: __dirname,
				targetFolderPath: RELEASE_FOLDER_PATH,
				excludedExtensions: EXCLUDED_EXTENSIONS,
				excludedFiles: EXCLUDED_FILES,
			}),
			addReleaseFlag(path.resolve(RELEASE_FOLDER_PATH, 'package.json')),
		],
	})
	.catch(() => process.exit(1));
