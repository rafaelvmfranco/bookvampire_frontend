// import path from "node:path";

import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "standalone",
  /* webpack: (config) => {
    // Resolve the ~ alias for Sass
    config.resolve.alias["~"] = path.join(__dirname, ".");
    // Important: return the modified config
    return config;
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  }, */
  /* async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  }, */
  images: {
    remotePatterns: [
      { hostname: "images.unsplash.com" },
      { hostname: "avatar.vercel.sh" },
      { hostname: "www.quivr.app" },
      { hostname: "chat.quivr.app" },
      { hostname: "quivr-cms.s3.eu-west-3.amazonaws.com" },
      { hostname: "www.gravatar.com" },
      { hostname: "media.licdn.com" },
      { hostname: "upload.wikimedia.org" },
    ],
  },
  redirects: async () => {
    return [
      {
        source: "/library/library",
        destination: "/library",
        permanent: false,
      },
      {
        source: "/login",
        destination: "/auth/signin",
        permanent: false,
      },
      {
        source: "/auth/signup",
        destination: "/auth/signin",
        permanent: false,
      },
      {
        source: "/register",
        destination: "/auth/signin",
        permanent: false,
      },
      {
        source: "/signin",
        destination: "/auth/signin",
        permanent: false,
      },
      {
        source: "/signup",
        destination: "/auth/signin",
        permanent: false,
      },
    ];
  },
};

/* const ContentSecurityPolicy = {
  "default-src": [
    "'self'",
    "https://fonts.googleapis.com",
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    "https://api.june.so",
    "https://us.posthog.com",
    "https://preview.quivr.app",
    "https://chat.quivr.app",
    "*.intercom.io",
    "*.intercomcdn.com",
    "https://*.octolane.com",
    "https://*.vercel.app",
    process.env.NEXT_PUBLIC_FRONTEND_URL,
  ],
  "connect-src": [
    "'self'",
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_BACKEND_URL,
    process.env.NEXT_PUBLIC_CMS_URL,
    "*.intercom.io",
    "*.intercomcdn.com",
    "https://*.octolane.com",
    "https://api.june.so",
    "https://api.openai.com",
    "https://cdn.growthbook.io",
    "https://vitals.vercel-insights.com/v1/vitals",
    "https://us.posthog.com",
  ],
  "img-src": [
    "'self'",
    "https://www.gravatar.com",
    "*.intercom.io",
    "*.intercomcdn.com",
    "https://quivr-cms.s3.eu-west-3.amazonaws.com",
    "data:",
    "*",
  ],
  "media-src": [
    "'self'",
    "https://user-images.githubusercontent.com",
    process.env.NEXT_PUBLIC_FRONTEND_URL,
    "https://quivr-cms.s3.eu-west-3.amazonaws.com",
    "https://preview.quivr.app",
    "https://chat.quivr.app",
    "https://*.vercel.app",
  ],
  "script-src": [
    "'unsafe-inline'",
    "'unsafe-eval'",
    "https://va.vercel-scripts.com/",
    "*.intercom.io",
    "*.intercomcdn.com",
    "https://*.octolane.com",
    process.env.NEXT_PUBLIC_FRONTEND_URL,
    "https://preview.quivr.app",
    "https://*.vercel.app",
    "https://www.google-analytics.com/",
    "https://js.stripe.com",
    "https://us.posthog.com",
  ],
  "frame-src": ["https://js.stripe.com", "https://us.posthog.com"],
  "frame-ancestors": ["'none'"],
  "style-src": [
    "'unsafe-inline'",
    process.env.NEXT_PUBLIC_FRONTEND_URL,
    "https://preview.quivr.app",
    "https://*.vercel.app",
  ],
}; */

/* // Build CSP string
const cspString = Object.entries(ContentSecurityPolicy)
  .map(([key, values]) => `${key} ${values.join(" ")};`)
  .join(" ");

// Define headers
const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: cspString,
  },
  {
    key: "Referrer-Policy",
    value: "origin-when-cross-origin",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000",
  },
];
//AJouter le content security policy uniquement en pre-vew et en prod */

/* let sentryConfig;

// Check if the SENTRY_DSN environment variable is defined
if (process.env.SENTRY_DSN) {
  // SENTRY_DSN exists, include Sentry configuration
  const { withSentryConfig } = await import("@sentry/nextjs");

  sentryConfig = withSentryConfig(
    nextConfig,
    {
      // For all available options, see:
      // https://github.com/getsentry/sentry-webpack-plugin#options

      // Suppresses source map uploading logs during build
      silent: true,
      org: "book-vampire",
      project: "javascript-nextjs",
    },
    {
      // For all available options, see:
      // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

      // Upload a larger set of source maps for prettier stack traces (increases build time)
      widenClientFileUpload: true,

      // Transpiles SDK to be compatible with IE11 (increases bundle size)
      transpileClientSDK: true,

      // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
      tunnelRoute: "/monitoring",

      // Hides source maps from generated client bundles
      hideSourceMaps: true,

      // Automatically tree-shake Sentry logger statements to reduce bundle size
      disableLogger: true,

      // Enables automatic instrumentation of Vercel Cron Monitors.
      // See the following for more information:
      // https://docs.sentry.io/product/crons/
      // https://vercel.com/docs/cron-jobs
      automaticVercelMonitors: true,
    },
  );
} else {
  // SENTRY_DSN does not exist, use nextConfig without Sentry
  sentryConfig = nextConfig;
} */

export default withNextIntl(nextConfig);
