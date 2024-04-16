module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [ 
      'module-resolver',
      {
        root: ['.'],
        extensions: [
          '.ios.js',
          '.android.js',
          '.js',
          '.ts',
          '.tsx',
          '.json',
          '.svg',
          ".ios.tsx"
        ],
        alias: {
          tests: ['./tests/'],
          '@/components': './src/components',
          // '@/redux': './src/redux',
          '@/navigation': './src/navigation',
          '@/screens': './src/screens/',
          // '@/constants': './src/constants',
          // '@/styles': './src/styles',
          // '@/icons': './src/assets/icons',
          // '@/data': './src/data',
          // '@/constants': './src/constants',
          // '@/hooks': './src/hooks',
          // '@/utils': './src/utils'
        },
      },
     
    ],
    // 'react-native-reanimated/plugin',
  ],
};
