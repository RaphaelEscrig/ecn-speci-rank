/** MODELS */
import type { SpecialtyCode } from "@/modules/shared/domain/models";

export type Form = {
	readonly year: string;
	readonly specialty: string;
};

export type FormErrors = Record<
	keyof Pick<Form, "year" | "specialty">,
	string | null
>;

export type Rank = {
	readonly specialty: SpecialtyCode;
	readonly rank: number;
	readonly intern: string;
	readonly city: string;
	readonly year: number;
};
