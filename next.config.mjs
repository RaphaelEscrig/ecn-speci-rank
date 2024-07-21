import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/app/locales/i18n.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
	skipMiddlewareUrlNormalize: true,
};

export default withNextIntl(nextConfig);
