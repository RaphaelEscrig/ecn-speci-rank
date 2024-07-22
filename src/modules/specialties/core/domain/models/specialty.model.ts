/** MODELS */
import type { SpecialtyCode } from "@/modules/shared/domain/models";

export type Form = {
	readonly year: string;
	readonly rank?: string;
};

export type FormErrors = Record<
	keyof Pick<Form, "year" | "rank">,
	string | null
>;

export type PerYear = {
	readonly specialty: SpecialtyCode;
	readonly places: number;
	readonly bestRank: number;
	readonly worstRank: number;
};
