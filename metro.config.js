const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname)
config.resolver.unstable_conditionNames = [ 'browser', 'require', 'react-native', 'web' ]
config.resolver.unstable_enablePackageExports = false;

module.exports = withNativeWind(config, { input: './global.css' })