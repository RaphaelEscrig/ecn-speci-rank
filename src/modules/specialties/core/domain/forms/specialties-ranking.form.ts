/** CONSTANTS */
import {
	SPECIALTIES_LISTING_MAX_YEAR,
	SPECIALTIES_LISTING_MIN_YEAR,
} from "@/modules/specialties/core/domain/constants";
import { SPECIALTIES } from "@/modules/shared/domain/constants";
/** IMMER */
import { produce } from "immer";
/** MODELS */
import type { SpecialtyRanking } from "@/modules/specialties/core/domain/models";
/** UTILS */
import { castStringNumberToNumber } from "@/modules/shared/utils/numbers.util";
/** ZOD */
import { z } from "zod";

export class SpecialtiesRankingForm {
	public update<T extends keyof SpecialtyRanking.Form>(
		state: SpecialtyRanking.Form,
		key: T,
		value: SpecialtyRanking.Form[T]
	): SpecialtyRanking.Form {
		return produce(state, (draft) => {
			draft[key] = value;
		});
	}

	public validate(
		state: SpecialtyRanking.Form
	): [boolean, SpecialtyRanking.FormErrors] {
		const schema = z.object({
			specialty: z.enum(
				Array.from(new Set(SPECIALTIES.values())) as [string, ...string[]]
			),
			year: z
				.string()
				.min(1)
				.refine(
					(year) =>
						castStringNumberToNumber(year) >= SPECIALTIES_LISTING_MIN_YEAR &&
						castStringNumberToNumber(year) <= SPECIALTIES_LISTING_MAX_YEAR
				),
		});

		const res = schema.safeParse(state);

		if (!res.success) {
			const errors = res.error.flatten().fieldErrors;

			return [
				false,
				{
					specialty: errors.specialty ? "INVALID_SPECIALTY" : null,
					year: errors.year ? "INVALID_YEAR" : null,
				},
			];
		}

		return [
			true,
			{
				specialty: null,
				year: null,
			},
		];
	}
}
