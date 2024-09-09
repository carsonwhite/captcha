import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { resolve } from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
	plugins: [svelte(),
	viteStaticCopy({
		targets: [
			{
				src: 'manifest.json',
				dest: ''
			}
		]
	})],
	build: {
		rollupOptions: {
			input: {
				popup: resolve(__dirname, 'index.html'),
				background: resolve(__dirname, 'src/background.js'),
				content: resolve(__dirname, 'src/content.js'),
				overlay: resolve(__dirname, 'src/overlay.js'),
			},
			output: {
				entryFileNames: '[name].js',
				chunkFileNames: '[name].js',
				assetFileNames: '[name].[ext]',
			},
		},
	},
});