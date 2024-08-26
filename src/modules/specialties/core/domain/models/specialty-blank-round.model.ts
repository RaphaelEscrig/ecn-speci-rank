/** MODELS */
import type { SpecialtyCode } from "@/modules/shared/domain/models";

export type Form = {
	readonly round: string;
	readonly rank: string;
};

export type FormErrors = Record<
	keyof Pick<Form, "round" | "rank">,
	string | null
>;

export type PerSpecialty = {
	readonly specialty: SpecialtyCode;
	readonly places: number;
	readonly assignedPlaces: number;
	readonly remainingPlaces: number;
	readonly bestRank: number | null;
	readonly worstRank: number | null;
};

export type PerSpecialtyWithResult = PerSpecialty & {
	readonly wouldHaveIt: boolean;
};
