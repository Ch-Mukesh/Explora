// tailwind.config.js
module.exports = {
	darkMode: 'class', // Enable class-based dark mode only
	content: [
	  "./index.html",
	  "./src/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
	  extend: {
		borderRadius: {
		  lg: 'var(--radius)',
		  md: 'calc(var(--radius) - 2px)',
		  sm: 'calc(var(--radius) - 4px)',
		},
		colors: {
		  background: 'hsl(var(--background))',
		  foreground: 'hsl(var(--foreground))',
		  // Define other colors
		}
	  }
	},
	plugins: [require("tailwindcss-animate")],
  };
  