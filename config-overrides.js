// webpack 5 no longer resolve node core modules
// alternatively we can add NodePolyfillPlugin
// ref: https://stackoverflow.com/questions/69431515/how-to-use-webpack-and-web3-in-react
// ref: https://github.com/ChainSafe/web3.js#web3-and-create-react-app

const webpack = require('webpack');

module.exports = function override(config) {
    const fallback = config.resolve.fallback || {};
    Object.assign(fallback, {
        "crypto": require.resolve("crypto-browserify"),
        "stream": require.resolve("stream-browserify"),
        "assert": require.resolve("assert"),
        "http": require.resolve("stream-http"),
        "https": require.resolve("https-browserify"),
        "os": require.resolve("os-browserify"),
        "url": require.resolve("url")
    })
    config.resolve.fallback = fallback;
    config.plugins = (config.plugins || []).concat([
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer']
        })
    ])

    // suppressing warnings
    config.ignoreWarnings = [/Failed to parse source map/];
    return config;
}