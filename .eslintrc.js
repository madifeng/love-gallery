module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
	},
	"parser": "babel-eslint",
    "extends": ["eslint:recommended", "plugin:react/recommended"],
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "indent": [
            "error",
            "tab"
        ],
        "linebreak-style": [
            "error",
            "windows"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
		],
		"no-console": "off",
		"react/prop-types": "off"
	},
	"globals": {
		"__dirname": true
	}
};