/** MODELS */
import type { SpecialtyCode } from "@/modules/shared/domain/models";

export type PerYear = {
	readonly code: SpecialtyCode;
	readonly places: number;
	readonly bestRank: number;
	readonly worstRank: number;
};
