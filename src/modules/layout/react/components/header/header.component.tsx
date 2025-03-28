"use client";

import styles from "./header.module.scss";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
/** ASSETS */
import Stethoscope from "@/modules/layout/react/assets/svg/header-app-icon.svg";
/** CONSTANTS */
import { HEADER_NAVIGATION_LINKS } from "@/modules/layout/core/domain/constants";
/** HOOKS */
import { useHeader } from "@/modules/layout/react/hooks/use-header.hook";
/** NEXT-INTL */
import { useTranslations } from "next-intl";

const Header = () => {
	const t = useTranslations("Header");
	const pathname = usePathname();
	const { updatePath, currentNavigationCategory } = useHeader(pathname);

	useEffect(() => {
		updatePath(pathname);
	}, [pathname, updatePath]);

	return (
		<header className={styles.header}>
			<Stethoscope />

			<nav>
				{HEADER_NAVIGATION_LINKS.map((item, index) => (
					<Link
						key={index}
						data-is-active={item.category === currentNavigationCategory}
						href={item.href}
					>
						{t(item.translation)}
					</Link>
				))}
			</nav>
		</header>
	);
};

export default Header;
