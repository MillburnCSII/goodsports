const removeImports = require("next-remove-imports")();

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// }

module.exports = removeImports({
    webpack: (config, options) => {
        config.module.rules.push({
            test: /\.md$/,
            use: "raw-loader",
        });
        return config;
    },
    images: {
        domains: [
            "source.unsplash.com",
            "unsplash.com",
            "firebasestorage.googleapis.com",
        ],
    },
    reactStrictMode: true,
});
