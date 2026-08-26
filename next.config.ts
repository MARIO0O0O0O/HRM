import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // Checkpoint 4A: Retired /programs/* routes -> Level 2/3 /spokes/* routes
      { source: '/programs', destination: '/', permanent: true },
      { source: '/programs/harassment-prevention', destination: '/spokes/safety-prevention/harassment-prevention', permanent: true },
      { source: '/programs/harassment-prevention/policy-templates', destination: '/spokes/safety-prevention/harassment-prevention', permanent: true },
      { source: '/programs/harassment-prevention/training', destination: '/spokes/safety-prevention/harassment-prevention', permanent: true },
      { source: '/programs/injury-illness-prevention', destination: '/spokes/safety-prevention/osha-iipp', permanent: true },
      { source: '/programs/workplace-violence-prevention', destination: '/spokes/safety-prevention/workplace-violence', permanent: true },
      { source: '/programs/wage-and-hour', destination: '/spokes/wage-hour', permanent: true },
      { source: '/programs/wage-and-hour/meal-and-rest-breaks', destination: '/spokes/wage-hour/meal-rest-breaks', permanent: true },
      { source: '/programs/wage-and-hour/overtime-misclassification', destination: '/spokes/wage-hour/timekeeping-classification', permanent: true },
      { source: '/programs/wage-and-hour/pay-transparency', destination: '/spokes/wage-hour/paystubs-wage-statements', permanent: true },
      { source: '/programs/wage-and-hour/wage-statements', destination: '/spokes/wage-hour/paystubs-wage-statements', permanent: true },
      { source: '/programs/paga-defense', destination: '/paga-calculator', permanent: true },

      // Checkpoint 4B: Retired old /spokes/[slug] stub routes -> new Level 2/3 routes or /services
      { source: '/spokes/harassment-prevention', destination: '/spokes/safety-prevention/harassment-prevention', permanent: true },
      { source: '/spokes/workplace-violence', destination: '/spokes/safety-prevention/workplace-violence', permanent: true },
      { source: '/spokes/onboarding', destination: '/spokes/lifecycle-admin/onboarding', permanent: true },
      { source: '/spokes/labor-law', destination: '/spokes/wage-hour', permanent: true },
      { source: '/spokes/handbook', destination: '/services', permanent: true },
      { source: '/spokes/manager-support', destination: '/services', permanent: true },
      { source: '/spokes/hr-support', destination: '/services', permanent: true },
      { source: '/spokes/compliance-audit', destination: '/services', permanent: true },
      { source: '/spokes/ai-services', destination: '/services', permanent: true },
    ]
  },
  webpack: (config, { dev }) => {
    if (!dev) {
      config.optimization.minimize = false;
    }
    return config;
  }
};

export default nextConfig;
