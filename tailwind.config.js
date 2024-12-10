/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,ts}"],
	theme: {
    screens: {
			456: "456px",
			576: "576px",
			768: "768px",
			992: "992px",
			1140: "1140px",
			1440: "1440px",
		},
		extend: {
      fontFamily: {
				sans: ["Roboto", "sans-serif"],
			},
    },
	},
  darkMode: "class",
	plugins: [require("rippleui")],
  rippleui: {
		themes: [
			{
				themeName: "light",
				colorScheme: "light",
			},
			{
				themeName: "dark",
				colorScheme: "dark",
			},
		],
	},
};
