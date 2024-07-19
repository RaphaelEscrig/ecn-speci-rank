import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "ECN SpeciRank",
	description:
		"Estimer la ville que vous aurez eu en fonction de votre classement et spécialité.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="fr">
			<body className={inter.className}>{children}</body>
		</html>
	);
}
