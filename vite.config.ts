import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { resolve } from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy';


const plugins = [
	svelte(),
	viteStaticCopy({
		targets: [
			{
				src: 'manifest.json',
				dest: ''
			}
		]
	}),
];

export default defineConfig(({ mode }) => {
	// Check for content mode
	if (mode === 'content') {
		return {
			plugins,
			build: {
				rollupOptions: {
					input: resolve(__dirname, 'src/overlay/index.ts'), // Only the content script
					output: {
						inlineDynamicImports: true, // Bundle everything in one file for content script
						entryFileNames: 'content.js', // Name the output content script file
						assetFileNames: '[name][extname]', // Name the output asset files (css file as index.css into dist/content)
					},
				},

				outDir: 'dist/content', // Optional: To separate content build output
			},
		};
	}

	// Default build for popup and background
	return {
		plugins,
		build: {
			rollupOptions: {
				input: {
					popup: resolve(__dirname, 'src/popup/popup.html'),
					background: resolve(__dirname, 'src/background/background.ts'),
				},
				output: {
					entryFileNames: '[name].js',
					chunkFileNames: '[name].js',
					assetFileNames: '[name].[ext]',
				},
			},
		},
	};
});