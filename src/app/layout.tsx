import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
/** COMPONENTS */
import { CSPostHogProvider } from "@/modules/analytics/react/components/posthog-provider.component";
/** NEXT-INTL */
import { getLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import Layout from "@/modules/layout/react/components/layout/layout.component";
import styles from "@/app/layout.module.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "ECN SpeciRank",
	description:
		"Estimez la ville que vous auriez eue en fonction de votre classement et spécialité.",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const locale = await getLocale();
	const messages = await getMessages();

	return (
		<html lang={locale}>
			<CSPostHogProvider>
				<body className={inter.className}>
					<NextIntlClientProvider messages={messages}>
						<Layout>
							<div className={styles.mainContainer}>{children}</div>
						</Layout>
					</NextIntlClientProvider>
				</body>
			</CSPostHogProvider>
		</html>
	);
}
