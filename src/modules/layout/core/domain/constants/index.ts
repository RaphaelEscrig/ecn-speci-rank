/** MODELS */
import type { LayoutHeader } from "@/modules/layout/core/domain/models";

export const HEADER_NAVIGATION_LINKS: LayoutHeader.NavigationItem[] = [
	{
		href: "/specialties",
		translation: "go-to-specialties",
		category: "specialties",
	},
	{
		href: "/specialties/simulations",
		translation: "go-to-simulations",
		category: "simulations",
	},
	{
		href: "/specialties/blank-rounds",
		translation: "go-to-blank-rounds",
		category: "blankRounds",
	},
];

export const HEADER_CATEGORIES = [
	// SPECIALTIES
	{
		href: "/specialties",
		category: "specialties",
	},
	{
		href: "/specialties/ranking",
		category: "specialties",
	},
	{
		href: "/specialties/blankRounds",
		category: "blankRounds",
	},
	{
		href: "/cities",
		category: "specialties",
	},
	// SIMULATIONS
	{
		href: "/specialties/simulations",
		category: "simulations",
	},
	{
		href: "/cities/simulations",
		category: "simulations",
	},
];
