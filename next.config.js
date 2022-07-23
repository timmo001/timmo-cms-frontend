module.exports = {
  env: {
    API_URL: process.env.API_URL,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(graphql|gql|txt)$/,
      exclude: /node_modules/,
      loader: "raw-loader",
    });
    return config;
  },
};
