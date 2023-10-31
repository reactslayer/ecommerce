module.exports = {
  plugins: [
    "tailwindcss",
    "postcss-flexbugs-fixes",
    "postcss-preset-env",
    [
      "postcss-normalize",
      {
        allowDuplicates: false,
      },
    ],
    [
      "@fullhuman/postcss-purgecss",
      {
        content: [
          "./lib/components/*.{js,jsx,ts,tsx}",
          "./pages/**/*.{js,jsx,ts,tsx}",
          "./components/**/*.{js,jsx,ts,tsx}",
        ],
        defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
      },
    ],
    "autoprefixer",
  ],
};
