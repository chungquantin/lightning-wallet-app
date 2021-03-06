module.exports = {
  presets: ["babel-preset-expo"],
  env: {
    production: {
      plugins: ["react-native-paper/babel"],
    },
  },
  plugins: [
    [
      "@babel/plugin-proposal-decorators",
      {
        legacy: true,
      },
    ],
    "macros",
    ["@babel/plugin-proposal-optional-catch-binding"],
    ["@babel/plugin-transform-async-to-generator"],
  ],
}
