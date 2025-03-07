import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginJest from "eslint-plugin-jest";

export default [
    { files: ["**/*.{js,mjs,cjs,jsx}"] },
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    pluginReact.configs.flat.recommended,
    {
        rules: {
            "react/prop-types": "off", // Aqui vão as suas configurações de regras
            // "no-unused-vars": "off",
        },
    },
    {
        files: ["**/*.test.{js,jsx}", "**/__tests__/**/*.{js,jsx}"],
        plugins: {
            jest: pluginJest,
        },
        languageOptions: {
            globals: globals.jest, // Define os globals do Jest para evitar erros
        },
        rules: {
            ...pluginJest.configs.recommended.rules, // Regras recomendadas do Jest
        },
    },
];
