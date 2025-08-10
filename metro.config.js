// This is the correct import for Expo projects
const { getDefaultConfig } = require('expo/metro-config');

// Get the default configuration from Expo
const config = getDefaultConfig(__dirname);

// This is the modern way to add the SVG transformer
config.transformer.babelTransformerPath = require.resolve('react-native-svg-transformer');

// This is the modern way to handle the file extensions
config.resolver.assetExts = config.resolver.assetExts.filter(ext => ext !== 'svg');
config.resolver.sourceExts.push('svg');

// Export the final, modified configuration
module.exports = config;