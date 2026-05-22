import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "../node_modules/@heroui/react/node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx,mjs}",
        "../node_modules/@heroui/system/node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx,mjs}",
        "../node_modules/@heroui/form/node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx,mjs}",
        "../node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx,mjs}",
    ],
    theme: {
        extend: {
            fontFamily: {
                "display": ["Fraunces", "Georgia", "serif"],
                "sans": ["Inter", "sans-serif"]
            },
            colors: {
                cream: "#FBF7F0",
                terracotta: "#E07A5F",
                olive: "#81A263",
                mustard: "#F2CC8F",
                ink: "#2D2A26",
            },
            boxShadow: {
                soft: "0 4px 20px -4px rgba(45, 42, 38, 0.08)",
                card: "0 2px 12px -2px rgba(45, 42, 38, 0.06)",
            },
        },
    },
    darkMode: "class",
    plugins: [
        heroui({
            themes: {
                light: {
                    colors: {
                        background: "#FBF7F0",
                        foreground: "#2D2A26",
                        primary: {
                            DEFAULT: "#E07A5F",
                            foreground: "#ffffff",
                        },
                        secondary: {
                            DEFAULT: "#81A263",
                            foreground: "#ffffff",
                        },
                        success: {
                            DEFAULT: "#81A263",
                            foreground: "#ffffff",
                        },
                        warning: {
                            DEFAULT: "#F2CC8F",
                            foreground: "#2D2A26",
                        },
                        default: {
                            50: "#F5F0E8",
                            100: "#ECE5D8",
                            200: "#DDD3BF",
                            300: "#C9BCA0",
                            400: "#A89B7D",
                            500: "#857A5F",
                            600: "#635A45",
                            700: "#453F30",
                            foreground: "#2D2A26",
                            DEFAULT: "#ECE5D8",
                        },
                    },
                },
                dark: {
                    colors: {
                        background: "#211E1A",
                        foreground: "#F5F0E8",
                        primary: {
                            DEFAULT: "#E07A5F",
                            foreground: "#ffffff",
                        },
                        secondary: {
                            DEFAULT: "#81A263",
                            foreground: "#ffffff",
                        },
                        success: {
                            DEFAULT: "#81A263",
                            foreground: "#ffffff",
                        },
                        warning: {
                            DEFAULT: "#F2CC8F",
                            foreground: "#2D2A26",
                        },
                    },
                },
            },
        }),
    ],
};
