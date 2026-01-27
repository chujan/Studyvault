const path = require("path");
const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");

const config = {
  transformer: {
    babelTransformerPath: require.resolve("react-native-svg-transformer")
  },
  resolver: {
    extraNodeModules: {
      "@components": path.resolve(__dirname, "src/components"),
      "@helpers": path.resolve(__dirname, "src/components/helpers"),
      "@theme": path.resolve(__dirname, "src/components/theme"),
      "@constants": path.resolve(__dirname, "src/constants"),
      "@storage": path.resolve(__dirname, "src/storage"),
      "@services": path.resolve(__dirname, "src/services")    
    },
    assetExts: ["bin", "txt", "png", "jpg", "jpeg", "gif", "webp"],
    sourceExts: ["js", "jsx", "ts", "tsx", "json", "svg"]
  },
  watchFolders: [path.resolve(__dirname, "src")]
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
