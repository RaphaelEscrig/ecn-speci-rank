/** CONSTANTS */
import {
	SPECIALTIES_BLANK_ROUND_MAX_ROUND,
	SPECIALTIES_BLANK_ROUND_MIN_ROUND,
} from "@/modules/specialties/core/domain/constants";
/** IMMER */
import { produce } from "immer";
/** MODELS */
import type { SpecialtyBlankRound } from "@/modules/specialties/core/domain/models";
/** UTILS */
import { castStringNumberToNumber } from "@/modules/shared/utils/numbers.util";
/** ZOD */
import { z } from "zod";

export class SpecialtiesBlankRoundsForm {
	public update<T extends keyof SpecialtyBlankRound.Form>(
		state: SpecialtyBlankRound.Form,
		key: T,
		value: SpecialtyBlankRound.Form[T]
	): SpecialtyBlankRound.Form {
		return produce(state, (draft) => {
			draft[key] = value;
		});
	}

	public validate(
		state: SpecialtyBlankRound.Form
	): [boolean, SpecialtyBlankRound.FormErrors] {
		const schema = z.object({
			rank: z.string().refine((rank) => castStringNumberToNumber(rank) > 0),
			round: z
				.string()
				.min(1)
				.refine(
					(stage) =>
						castStringNumberToNumber(stage) >=
							SPECIALTIES_BLANK_ROUND_MIN_ROUND &&
						castStringNumberToNumber(stage) <= SPECIALTIES_BLANK_ROUND_MAX_ROUND
				),
		});

		const res = schema.safeParse(state);

		if (!res.success) {
			const errors = res.error.flatten().fieldErrors;

			return [
				false,
				{
					rank: errors.rank ? "INVALID_RANK" : null,
					round: errors.round ? "INVALID_ROUND" : null,
				},
			];
		}

		return [
			true,
			{
				rank: null,
				round: null,
			},
		];
	}
}
