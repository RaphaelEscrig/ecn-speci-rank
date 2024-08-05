/** MODELS */
import type { SpecialtyCode } from "@/modules/shared/domain/models";

export type Form = {
	readonly stage: string;
	readonly rank: string;
};

export type FormErrors = Record<
	keyof Pick<Form, "stage" | "rank">,
	string | null
>;

export type PerSpecialty = {
	readonly specialty: SpecialtyCode;
	readonly places: number;
	readonly assignedPlaces: number;
	readonly remainingPlaces: number;
	readonly bestRank: number;
	readonly worstRank: number;
};

export type PerSpecialtyWithResult = PerSpecialty & {
	readonly wouldHaveIt: boolean;
};
