/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  content: [
    "./screens/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./Layouts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        primaryBtnColor: '#ad0808'
      }
    },
  },
  plugins: [],
};
