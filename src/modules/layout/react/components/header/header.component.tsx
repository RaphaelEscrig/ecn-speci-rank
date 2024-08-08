import styles from "./header.module.scss";
import Link from "next/link";
/** ASSETS */
import Stethoscope from "@/modules/layout/react/assets/svg/header-app-icon.svg";
/** NEXT-INTL */
import { useTranslations } from "next-intl";

const Header = () => {
	const t = useTranslations("Header");

	return (
		<header className={styles.header}>
			<Stethoscope />

			<nav>
				<Link href="/specialties">{t("go-to-specialties")}</Link>
				<Link href="/specialties/simulations">{t("go-to-simulations")}</Link>
			</nav>
		</header>
	);
};

export default Header;
