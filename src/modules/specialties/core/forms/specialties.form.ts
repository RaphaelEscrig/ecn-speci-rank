/** CONSTANTS */
import {
	SPECIALTIES_LISTING_MAX_YEAR,
	SPECIALTIES_LISTING_MIN_YEAR,
} from "@/modules/specialties/core/domain/constants";
/** IMMER */
import { produce } from "immer";
/** MODELS */
import type { Specialty } from "@/modules/specialties/core/domain/models";
/** UTILS */
import { castStringNumberToNumber } from "@/modules/shared/utils/numbers.util";
/** ZOD */
import { z } from "zod";

export class SpecialtiesForm {
	public update<T extends keyof Specialty.Form>(
		state: Specialty.Form,
		key: T,
		value: Specialty.Form[T]
	): Specialty.Form {
		return produce(state, (draft) => {
			draft[key] = value;
		});
	}

	public validate(state: Specialty.Form): [boolean, Specialty.FormErrors] {
		const schema = z.object({
			rank: z
				.string()
				.refine((rank) => (rank ? castStringNumberToNumber(rank) > 0 : true))
				.optional(),
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
					rank: errors.rank ? "INVALID_RANK" : null,
					year: errors.year ? "INVALID_YEAR" : null,
				},
			];
		}

		return [
			true,
			{
				rank: null,
				year: null,
			},
		];
	}
}
