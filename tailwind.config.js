// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts,scss}" // scan components, templates, and SCSS
  ],
  theme: { extend: {} },
  plugins: [],
  // If you see reset conflicts with Bootstrap, uncomment this to disable Tailwind Preflight:
  // corePlugins: { preflight: false },
};
