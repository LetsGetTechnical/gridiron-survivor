module.exports = {
  printWidth: 80,
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  plugins: [
    // Automatically sorts tailwind classes to avoid speceficity issues
    'prettier-plugin-tailwindcss', // MUST COME LAST
  ],
};