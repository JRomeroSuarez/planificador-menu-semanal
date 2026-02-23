import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "primary": "#3713ec",
                "background-light": "#f6f6f8",
                "background-dark": "#131022",
            },
            fontFamily: {
                "display": ["Work Sans", "sans-serif"],
                "sans": ["Work Sans", "sans-serif"]
            },
        },
    },
    darkMode: "class",
    plugins: [heroui()],
};
