import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
/** NEXT-INTL */
import { getLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "ECN SpeciRank",
	description:
		"Estimer la ville que vous aurez eu en fonction de votre classement et spécialité.",
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
			<body className={inter.className}>
				<NextIntlClientProvider messages={messages}>
					{children}
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
