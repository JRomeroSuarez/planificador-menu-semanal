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
                "primary-custom": "#3713ec",
                "background-light": "#f6f6f8",
                "background-dark": "#131022",
            },
            fontFamily: {
                "display": ["Inter", "sans-serif"]
            },
        },
    },
    darkMode: "class",
    plugins: [heroui()],
};
