import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
	globalIgnores(['dist']),
	{
		files: ['**/*.{js,jsx}'],
		plugins: {
			react,
			'react-hooks': reactHooks,
			'react-refresh': reactRefresh,
		},
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
			parserOptions: {
				ecmaFeatures: { jsx: true },
				sourceType: 'module',
			},
		},
		settings: {
			react: {
				version: 'detect',
			},
		},
		rules: {
			...js.configs.recommended.rules,
			...react.configs.recommended.rules,
			...reactHooks.configs['recommended-latest'].rules,
			'react-refresh/only-export-components': 'warn',
			'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
			'react/prop-types': 'off',
			'react/react-in-jsx-scope': 'off',
		},
	},
]);
