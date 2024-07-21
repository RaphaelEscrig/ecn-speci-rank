/** MODELS */
import type { Specialty } from "../domain/models";
/** PORTS */
import type { ISpecialtiesGateway } from "../domain/ports/specialties.port";

type Request = {
	readonly year: number;
};

type Response = {
	readonly specialties: Specialty.PerYear[];
};

export class FindSpecialtiesPerYearUseCase {
	constructor(private readonly gateway: ISpecialtiesGateway) {}

	public async execute({ year }: Request): Promise<Response> {
		try {
			const specialties = await this.gateway.findAllPerYear(year);

			return {
				specialties,
			};
		} catch (error) {
			throw error;
		}
	}
}
