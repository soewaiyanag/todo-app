import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";
import plugin from "tailwindcss/plugin";

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class",
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
                josefin: ["Josefin Sans", ...defaultTheme.fontFamily.sans],
            },
            backgroundImage: {
                "desktop-light": "url(/images/bg-desktop-light.jpg)",
                "desktop-dark": "url(/images/bg-desktop-dark.jpg)",
                "mobile-light": "url(/images/bg-mobile-light.jpg)",
                "mobile-dark": "url(/images/bg-mobile-dark.jpg)",
            },
            colors: {
                // primary
                "bright-blue": "hsl(220, 98%, 61%)",
                "cyan-blue": "hsl(192, 100%, 67%)",
                "light-purple": "hsl(280, 87%, 65%)",
                // light
                "very-light-gray": "hsl(0, 0%, 98%)",
                "very-light-grayish-blue": "hsl(236, 33%, 92%)",
                "light-grayish-blue": "hsl(233, 11%, 84%)",
                "dark-grayish-blue": "hsl(236, 9%, 61%)",
                "very-dark-grayish-blue": "hsl(235, 19%, 35%)",
                // dark
                "very-dark-blue": "hsl(235, 21%, 11%)",
                "very-dark-desaturated-blue": "hsl(235, 24%, 19%)",
                "light-grayish-blue": "hsl(234, 39%, 85%)",
                "light-grayish-blue-hover": "hsl(236, 33%, 92%)",
                "dark-grayish-blue": "hsl(234, 11%, 52%)",
                "very-dark-grayish-blue-1": "hsl(233, 14%, 35%)",
                "very-dark-grayish-blue-2": "hsl(237, 14%, 26%)",
            },
        },
    },

    plugins: [
        forms,
        plugin(function ({ addBase }) {
            addBase({
                html: { fontSize: "18px" },
            });
        }),
    ],
};
