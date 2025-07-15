import packageJson from "../../package.json";

const currentYear = new Date().getFullYear();

export const APP_CONFIG = {
  name: "Fidi UI",
  version: packageJson.version,
  copyright: `© ${currentYear}, Fidi UI.`,
  meta: {
    title: "Studio Admin - Modern Next.js Dashboard Starter Template",
    description:
      "Fidi Admin is a modern, open-source dashboard starter template built with Next.js 15, Tailwind CSS v4, and shadcn/ui. Perfect for SaaS apps, admin panels, and internal tools—fully customizable and production-ready.",
  },
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000',
  },
};
