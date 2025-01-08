import prettier from 'eslint-config-prettier';
import js from '@eslint/js';
import { includeIgnoreFile } from '@eslint/compat';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import { fileURLToPath } from 'node:url';
import ts from 'typescript-eslint';
import svelteParser from 'svelte-eslint-parser';

const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url));

export const extraFileExtensions = ['.svelte', '.ts'];

export default ts.config(
	includeIgnoreFile(gitignorePath),
	js.configs.recommended,
	...ts.configs.recommended,
	...svelte.configs['flat/recommended'],
	...svelte.configs['flat/prettier'],
	prettier,
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			},

			parserOptions: {
				extraFileExtensions,
				parser: ts.parser
			}
		}
	},
	{
		files: ['**/*.svelte'],
		languageOptions: {
			parser: svelteParser,
			parserOptions: {
				extraFileExtensions,
				parser: ts.parser
			}
		}
	}
);
