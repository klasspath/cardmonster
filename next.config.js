module.exports = {
  i18n: {
    locales: ["de"],
    defaultLocale: "de",
  },
  images: {
    domains: ["media.graphcms.com"],
  },
  env: {
    API_URL: process.env.API_URL,
    PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID,
  },
  rewrites() {
    return [
      {
        source: "/search/:category",
        destination: "/search",
      },
    ];
  },
};
