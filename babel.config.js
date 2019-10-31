module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ["module-resolver", {
         "root": ["./"],
         "alias": {
           "@App": "./",
           "@Assets": "./assets",
           "@Components": "./components/",
           "@Library": "./library/",
           "@Redux": "./redux/",
           "@Screens": "./screens/",
           "@Models": "./models/",
        }
      }]
    ]
  };
};
