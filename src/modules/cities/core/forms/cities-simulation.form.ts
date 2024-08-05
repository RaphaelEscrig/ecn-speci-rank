/** CONSTANTS */
import {
	SPECIALTIES_SIMULATION_MAX_STAGE,
	SPECIALTIES_SIMULATION_MIN_STAGE,
} from "@/modules/specialties/core/domain/constants";
import { SPECIALTIES } from "@/modules/shared/domain/constants";
/** IMMER */
import { produce } from "immer";
/** MODELS */
import type { CitySimulation } from "@/modules/cities/core/domain/models";
/** UTILS */
import { castStringNumberToNumber } from "@/modules/shared/utils/numbers.util";
/** ZOD */
import { z } from "zod";

export class CitiesSimulationForm {
	public update<T extends keyof CitySimulation.Form>(
		state: CitySimulation.Form,
		key: T,
		value: CitySimulation.Form[T]
	): CitySimulation.Form {
		return produce(state, (draft) => {
			draft[key] = value;
		});
	}

	public validate(
		state: CitySimulation.Form
	): [boolean, CitySimulation.FormErrors] {
		const schema = z.object({
			rank: z
				.string()
				.min(1)
				.refine((rank) => castStringNumberToNumber(rank) > 0),
			stage: z
				.string()
				.min(1)
				.refine(
					(stage) =>
						castStringNumberToNumber(stage) >=
							SPECIALTIES_SIMULATION_MIN_STAGE &&
						castStringNumberToNumber(stage) <= SPECIALTIES_SIMULATION_MAX_STAGE
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
					stage: errors.stage ? "INVALID_STAGE" : null,
					specialty: errors.specialty ? "INVALID_SPECIALTY" : null,
				},
			];
		}

		return [
			true,
			{
				rank: null,
				stage: null,
				specialty: null,
			},
		];
	}
}
