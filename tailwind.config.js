/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Include all JavaScript and TypeScript files in the src directory
    "./public/index.html", // Include the HTML file in the public directory (if applicable)
  ],
  theme: {
    extend: {
      // You can extend the default theme here
    },
  },
  plugins: [
    // You can add Tailwind CSS plugins here
  ],
};
