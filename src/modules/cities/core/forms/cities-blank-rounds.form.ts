/** CONSTANTS */
import {
	SPECIALTIES_BLANK_ROUND_MAX_ROUND,
	SPECIALTIES_BLANK_ROUND_MIN_ROUND,
} from "@/modules/specialties/core/domain/constants";
import { SPECIALTIES } from "@/modules/shared/domain/constants";
/** IMMER */
import { produce } from "immer";
/** MODELS */
import type { CityBlankRound } from "@/modules/cities/core/domain/models";
/** UTILS */
import { castStringNumberToNumber } from "@/modules/shared/utils/numbers.util";
/** ZOD */
import { z } from "zod";

export class CitiesBlankRoundsForm {
	public update<T extends keyof CityBlankRound.Form>(
		state: CityBlankRound.Form,
		key: T,
		value: CityBlankRound.Form[T]
	): CityBlankRound.Form {
		return produce(state, (draft) => {
			draft[key] = value;
		});
	}

	public validate(
		state: CityBlankRound.Form
	): [boolean, CityBlankRound.FormErrors] {
		const schema = z.object({
			rank: z
				.string()
				.min(1)
				.refine((rank) => castStringNumberToNumber(rank) > 0),
			round: z
				.string()
				.min(1)
				.refine(
					(round) =>
						castStringNumberToNumber(round) >=
							SPECIALTIES_BLANK_ROUND_MIN_ROUND &&
						castStringNumberToNumber(round) <= SPECIALTIES_BLANK_ROUND_MAX_ROUND
				),
			specialty: z.enum(
				Array.from(new Set(SPECIALTIES.values())) as [string, ...string[]]
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
					specialty: errors.specialty ? "INVALID_SPECIALTY" : null,
				},
			];
		}

		return [
			true,
			{
				rank: null,
				round: null,
				specialty: null,
			},
		];
	}
}
