/** NEXT-INTL */
import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async () => {
	// Provide a static locale, fetch a user setting,
	// read from `cookies()`, `headers()`, etc.
	const locale = "fr";

	const modules = ["cities", "specialties", "shared"];

	const modulesMessages = await Promise.all(
		modules.map(
			async (module) =>
				(
					await import(`../../modules/${module}/core/locales/${locale}.json`)
				).default
		)
	);

	return {
		locale,
		messages: modulesMessages.reduce((accumulator, currentObject) => {
			return { ...accumulator, ...currentObject };
		}, {}),
	};
});
