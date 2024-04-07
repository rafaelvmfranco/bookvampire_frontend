module.exports = {
	plugins: ["prefer-arrow", "import"],
	extends: [
		"next",
		"next/core-web-vitals",
		"eslint:recommended",
		"plugin:import/recommended",
	],
	ignorePatterns: ["**/node_modules/", "**/.next/"],
	rules: {
		"import/no-named-as-default-member": "off",
		"import/no-named-as-default": "off",
		"import/extensions": "off",
		"import/no-unresolved": "off",
		"import/prefer-default-export": "off",
		"import/no-duplicates": "off",
		complexity: ["off", 10],
		"max-lines": ["off", 300],
		"max-depth": ["off", 3],
		"max-params": ["off", 4],
		eqeqeq: ["off", "smart"],
		"import/no-extraneous-dependencies": [
			"off",
			{
				devDependencies: true,
				optionalDependencies: false,
				peerDependencies: false,
			},
		],
		"no-shadow": [
			"off",
			{
				hoist: "all",
			},
		],
		"prefer-const": "off",
		"import/namespace": "off",
		"padding-line-between-statements": [
			"off",
			{
				blankLine: "always",
				prev: "*",
				next: "return",
			},
		],
		"prefer-arrow/prefer-arrow-functions": [
			"off",
			{
				disallowPrototype: true,
				singleReturnOnly: false,
				classPropertiesAllowed: false,
			},
		],
		"no-restricted-imports": [
			"off",
			{
				paths: [
					{
						name: "lodash",
						message: "Please use lodash/{module} import instead",
					},
					{
						name: "aws-sdk",
						message: "Please use aws-sdk/{module} import instead",
					},
					{
						name: ".",
						message: "Please use explicit import file",
					},
				],
			},
		],
		curly: ["off", "all"],
	},
	root: true,
	env: {
		es6: true,
		node: true,
		browser: true,
	},
	parserOptions: {
		ecmaVersion: 2021,
		sourceType: "module",
		babelOptions: {
			presets: [require.resolve("next/babel")],
		},
	},
	overrides: [
		{
			files: ["**/*.ts?(x)"],
			extends: [
				"plugin:@typescript-eslint/recommended",
				"plugin:@typescript-eslint/recommended-requiring-type-checking",
				"plugin:import/typescript",
			],
			parser: "@typescript-eslint/parser",
			parserOptions: {
				project: "./tsconfig.eslint.json",
				tsconfigRootDir: __dirname,
				sourceType: "module",
			},
			rules: {
				"@typescript-eslint/prefer-optional-chain": "off",
				"react-hooks/exhaustive-deps": "off",
				"react/no-unescaped-entities": "off",
				"no-shadow": "off",
				"@typescript-eslint/no-shadow": "off",
				"@typescript-eslint/prefer-nullish-coalescing": "off",
				"@typescript-eslint/ban-ts-comment": [
					"off",
					{
						"ts-ignore": "allow-with-description",
						minimumDescriptionLength: 10,
					},
				],
				"@typescript-eslint/explicit-function-return-type": "off",
				"@typescript-eslint/explicit-member-accessibility": "off",
				"@typescript-eslint/camelcase": "off",
				"@typescript-eslint/interface-name-prefix": "off",
				"@typescript-eslint/explicit-module-boundary-types": "off",
				"@typescript-eslint/no-explicit-any": "off",
				"@typescript-eslint/no-unused-vars": "off",
				"@typescript-eslint/ban-types": [
					"off",
					{
						types: {
							FC: "Use `const MyComponent = (props: Props): JSX.Element` instead",
							SFC: "Use `const MyComponent = (props: Props): JSX.Element` instead",
							FunctionComponent:
								"Use `const MyComponent = (props: Props): JSX.Element` instead",
							"React.FC":
								"Use `const MyComponent = (props: Props): JSX.Element` instead",
							"React.SFC":
								"Use `const MyComponent = (props: Props): JSX.Element` instead",
							"React.FunctionComponent":
								"Use `const MyComponent = (props: Props): JSX.Element` instead",
						},
						extendDefaults: true,
					},
				],
				"@typescript-eslint/no-unnecessary-boolean-literal-compare": "off",
				"@typescript-eslint/no-unnecessary-condition": "off",
				"@typescript-eslint/no-unnecessary-type-arguments": "off",
				"@typescript-eslint/prefer-string-starts-ends-with": "off",
				"@typescript-eslint/switch-exhaustiveness-check": "off",
				"@typescript-eslint/restrict-template-expressions": "off",
				"@typescript-eslint/no-unsafe-assignment": "off",
				"@typescript-eslint/no-unsafe-call": "off",
				"@typescript-eslint/no-unsafe-member-access": "off",
				"@typescript-eslint/no-unsafe-return": "off",
				"@typescript-eslint/no-unsafe-argument": "off",
				"@typescript-eslint/no-empty-function": "off",
				"@typescript-eslint/no-redundant-type-constituents": "off",
				"@typescript-eslint/no-misused-promises": "off",
				"@typescript-eslint/await-thenable": "off",
				"react-hooks/rules-of-hooks": "off",
				curly: "off",
			},
		},
	],
};
