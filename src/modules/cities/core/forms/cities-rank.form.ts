/** CONSTANTS */
import {
	SPECIALTIES_LISTING_MAX_YEAR,
	SPECIALTIES_LISTING_MIN_YEAR,
} from "@/modules/specialties/core/domain/constants";
import { SPECIALTIES } from "@/modules/shared/domain/constants";
/** IMMER */
import { produce } from "immer";
/** MODELS */
import type { CityRank } from "@/modules/cities/core/domain/models";
/** UTILS */
import { castStringNumberToNumber } from "@/modules/shared/utils/numbers.util";
/** ZOD */
import { z } from "zod";

export class CitiesRankForm {
	public update<T extends keyof CityRank.Form>(
		state: CityRank.Form,
		key: T,
		value: CityRank.Form[T]
	): CityRank.Form {
		return produce(state, (draft) => {
			draft[key] = value;
		});
	}

	public validate(state: CityRank.Form): [boolean, CityRank.FormErrors] {
		const schema = z.object({
			rank: z
				.string()
				.min(1)
				.refine((rank) => castStringNumberToNumber(rank) > 0),
			year: z
				.string()
				.min(1)
				.refine(
					(year) =>
						castStringNumberToNumber(year) >= SPECIALTIES_LISTING_MIN_YEAR &&
						castStringNumberToNumber(year) <= SPECIALTIES_LISTING_MAX_YEAR
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
					year: errors.year ? "INVALID_YEAR" : null,
					specialty: errors.specialty ? "INVALID_SPECIALTY" : null,
				},
			];
		}

		return [
			true,
			{
				rank: null,
				year: null,
				specialty: null,
			},
		];
	}
}
