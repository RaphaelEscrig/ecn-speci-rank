/** MODELS */
import type { LayoutHeader } from "@/modules/layout/core/domain/models";

export const HEADER_NAVIGATION_LINKS: LayoutHeader.NavigationItem[] = [
	{
		href: "/specialties",
		translation: "go-to-specialties",
	},
	{
		href: "/specialties/simulations",
		translation: "go-to-simulations",
	},
];
