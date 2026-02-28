import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
        "../node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                "display": ["Work Sans", "sans-serif"],
                "sans": ["Inter", "sans-serif"]
            },
        },
    },
    darkMode: "class",
    plugins: [
        heroui({
            themes: {
                light: {
                    colors: {
                        background: "#f9fafb",
                        foreground: "#0f172a",
                        primary: {
                            DEFAULT: "#3713ec",
                            foreground: "#ffffff",
                        },
                    },
                },
                dark: {
                    colors: {
                        background: "#131022",
                        foreground: "#ffffff",
                        primary: {
                            DEFAULT: "#3713ec",
                            foreground: "#ffffff",
                        },
                    },
                },
            },
        }),
    ],
};
