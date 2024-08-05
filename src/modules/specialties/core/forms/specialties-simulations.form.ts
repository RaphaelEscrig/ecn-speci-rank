/** CONSTANTS */
import {
	SPECIALTIES_SIMULATION_MAX_STAGE,
	SPECIALTIES_SIMULATION_MIN_STAGE,
} from "@/modules/specialties/core/domain/constants";
/** IMMER */
import { produce } from "immer";
/** MODELS */
import type { SpecialtySimulation } from "@/modules/specialties/core/domain/models";
/** UTILS */
import { castStringNumberToNumber } from "@/modules/shared/utils/numbers.util";
/** ZOD */
import { z } from "zod";

export class SpecialtiesSimulationsForm {
	public update<T extends keyof SpecialtySimulation.Form>(
		state: SpecialtySimulation.Form,
		key: T,
		value: SpecialtySimulation.Form[T]
	): SpecialtySimulation.Form {
		return produce(state, (draft) => {
			draft[key] = value;
		});
	}

	public validate(
		state: SpecialtySimulation.Form
	): [boolean, SpecialtySimulation.FormErrors] {
		const schema = z.object({
			rank: z.string().refine((rank) => castStringNumberToNumber(rank) > 0),
			stage: z
				.string()
				.min(1)
				.refine(
					(stage) =>
						castStringNumberToNumber(stage) >=
							SPECIALTIES_SIMULATION_MIN_STAGE &&
						castStringNumberToNumber(stage) <= SPECIALTIES_SIMULATION_MAX_STAGE
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
				},
			];
		}

		return [
			true,
			{
				rank: null,
				stage: null,
			},
		];
	}
}
