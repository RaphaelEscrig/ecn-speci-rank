import Link from "next/link";
/** NEXT-INTL */
import { useTranslations } from "next-intl";

const Header = () => {
	const t = useTranslations("Header");

	return (
		<header>
			<nav className="menu">
				<ul>
					<li>
						<Link href="/specialties">{t("go-to-specialties")}</Link>
					</li>
					<li>
						<Link href="/specialties/simulations">
							{t("go-to-simulations")}
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
