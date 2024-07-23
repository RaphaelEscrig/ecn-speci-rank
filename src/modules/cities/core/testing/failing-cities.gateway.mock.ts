/** MODELS */
import type { CityRank } from "@/modules/cities/core/domain/models";
/** PORTS */
import type { ICitiesGateway } from "@/modules/cities/core/domain/ports/cities.port";

export class MockFailingSCitiesGateway implements ICitiesGateway {
	public async find(_: number): Promise<CityRank.City[]> {
		throw new Error("Error to find cities");
	}
}
