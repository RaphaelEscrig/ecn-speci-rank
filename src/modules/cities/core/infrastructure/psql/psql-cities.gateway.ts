/** MODELS */
import type { SpecialtyCode } from "@/modules/shared/domain/models";
import type { CityRank } from "@/modules/cities/core/domain/models";
/** PORTS */
import type { ICitiesGateway } from "@/modules/cities/core/domain/ports/cities.port";
/** POSTGRES */
import type postgres from "postgres";

export class PSQLCitiesGateway implements ICitiesGateway {
	constructor(private readonly psql: postgres.Sql) {}

	public async find(
		_: number,
		specialty: SpecialtyCode,
		year: number
	): Promise<CityRank.City[]> {
		const result: Array<
			Omit<CityRank.City, "bestRank" | "worstRank"> & {
				bestrank: number;
				worstrank: number;
			}
		> = await this.psql`
    SELECT 
          city as name,
          COUNT(*) as places,
          MIN(rank) as bestrank,
          MAX(rank) as worstrank
        FROM ranks
        WHERE specialty = ${specialty} AND year = ${year}
        GROUP BY city;
    `;
		// column aliases in SQL are case insensitive

		return result.map(
			(city): CityRank.City => ({
				name: city.name,
				places: city.places,
				bestRank: city.bestrank,
				worstRank: city.worstrank,
			})
		);
	}
}
