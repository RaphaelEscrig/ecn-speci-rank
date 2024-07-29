/** FACTORIES */
import { CityFactory } from "@/modules/cities/core/domain/factories/city.factory";
/** MODELS */
import type { SpecialtyCode } from "@/modules/shared/domain/models";
import type { CityRank } from "@/modules/cities/core/domain/models";
/** PORTS */
import type { ICitiesGateway } from "@/modules/cities/core/domain/ports/cities.port";

export class InMemoryCitiesGateway implements ICitiesGateway {
	public async find(
		_: number,
		__: SpecialtyCode,
		___: number
	): Promise<CityRank.City[]> {
		return CityFactory.createCities();
	}
}
