import js from "@eslint/js";
import globals from "globals";
import pluginVue from "eslint-plugin-vue";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";
import vueParser from "vue-eslint-parser"

export default tseslint.config(
  // 1. Rekomendasi bawaan ESLint untuk JavaScript
  js.configs.recommended,

  // 2. Rekomendasi untuk TypeScript
  ...tseslint.configs.recommended,

  // 3. Rekomendasi untuk Vue 3 (Gunakan 'flat/essential' jika ingin lebih longgar)
  ...pluginVue.configs["flat/recommended"],

  // 4. Pengaturan Bahasa & Environment
  {
    languageOptions: {
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node, // Menambahkan node karena Anda memiliki @types/node
      },
      parser: vueParser,
      // Menggunakan parser TypeScript untuk file .vue dan .ts
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: [".vue"],
      },
    },
  },

  // 5. Kustomisasi Aturan (Rules) Anda sendiri
  {
    rules: {
      // Contoh mematikan aturan jika terlalu ketat:
      // '@typescript-eslint/no-explicit-any': 'off',

      // Contoh mengubah aturan Vue:
      "vue/multi-word-component-names": "off", // Memperbolehkan nama komponen 1 kata (misal: Home.vue)
      "vue/no-unused-vars": "error",
    },
  },

  // 6. WAJIB DI AKHIR: Mematikan aturan ESLint yang bentrok dengan Prettier
  eslintConfigPrettier,
);
