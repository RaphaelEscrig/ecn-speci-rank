/** ADAPTERS */
import type { InMemoryCitiesGateway } from "@/modules/cities/core/infrastructure/in-memory/in-memory-cities.gateway";
/** MODELS */
import type { SpecialtyCode } from "@/modules/shared/domain/models";
import type {
	CityRank,
	CitySimulation,
} from "@/modules/cities/core/domain/models";
/** PORTS */
import type { ICitiesGateway } from "@/modules/cities/core/domain/ports/cities.port";

export class MockCitiesGateway implements ICitiesGateway {
	constructor(private readonly gateway: InMemoryCitiesGateway) {}

	public async find(
		year: number,
		specialty: SpecialtyCode,
		rank: number
	): Promise<CityRank.City[]> {
		return await this.gateway.find(year, specialty, rank);
	}

	public async findPerSimulation(
		stage: number,
		specialty: SpecialtyCode,
		rank: number
	): Promise<CitySimulation.City[]> {
		return await this.gateway.findPerSimulation(stage, specialty, rank);
	}
}
