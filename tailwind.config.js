/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {boxShadow: {
        // 'glow-light': '0 0 8px rgba(59,130,246,0.5)',
        'glow-light': '0 0 8px rgba(190,120,220,0.5)',
      }},
  },
  plugins: [require('daisyui')
],
};
