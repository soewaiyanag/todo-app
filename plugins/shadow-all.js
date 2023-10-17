const plugin = require("tailwindcss/plugin");

module.exports = plugin(({ addUtilities }) => {
    const shadowAllSizes = {
        "": "0 0 10px rgba(0, 0, 0, 0.2)",
        sm: "0 0 4px rgba(0, 0, 0, 0.1)",
        md: "0 0 15px rgba(0, 0, 0, 0.3)",
        lg: "0 0 20px rgba(0, 0, 0, 0.4)",
        xl: "0 0 30px rgba(0, 0, 0, 0.5)",
        "2xl": "0 0 50px rgba(0, 0, 0, 0.6)",
    };

    const shadowAll = {};

    for (const size in shadowAllSizes) {
        shadowAll[`.shadow-all${size ? `-${size}` : ""}`] = {
            boxShadow: shadowAllSizes[size],
        };
    }

    addUtilities(shadowAll);
});
