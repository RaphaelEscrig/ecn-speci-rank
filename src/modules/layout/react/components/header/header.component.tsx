"use client";

import styles from "./header.module.scss";
import Link from "next/link";
/** ASSETS */
import Stethoscope from "@/modules/layout/react/assets/svg/header-app-icon.svg";
/** CONSTANTS */
import { HEADER_NAVIGATION_LINKS } from "@/modules/layout/core/domain/constants";
/** HOOKS */
import { useActivePath } from "@/modules/shared/react/hooks/use-active-path.hook";
/** NEXT-INTL */
import { useTranslations } from "next-intl";

const Header = () => {
	const t = useTranslations("Header");
	const checkActivePath = useActivePath();

	return (
		<header className={styles.header}>
			<Stethoscope />

			<nav>
				{HEADER_NAVIGATION_LINKS.map((item, index) => (
					<Link
						key={index}
						data-is-active={checkActivePath(item.href)}
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
