/** MODELS */
import type { SpecialtyCode } from "@/modules/shared/domain/models";
import type {
	CityRank,
	CitySimulation,
} from "@/modules/cities/core/domain/models";
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

	public async findPerSimulation(
		_: number,
		specialty: SpecialtyCode,
		stage: number
	): Promise<CitySimulation.City[]> {
		const result: Array<
			Omit<
				CitySimulation.City,
				"assignedPlaces" | "remainingPlaces" | "places"
			> & {
				readonly places: string;
				readonly remainingPlaces: string;
				readonly assignedPlaces: string;
			}
		> = await this.psql`
			SELECT 
        city AS name,
        SUM(places) AS places,
        SUM(assigned_places) AS "assignedPlaces",
				SUM(remaining_places) AS "remainingPlaces",
        MIN(best_rank) AS "bestRank",
        MAX(worst_rank) AS "worstRank"
      FROM simulations_posts
      WHERE specialty = ${specialty} AND stage = ${stage}
      GROUP BY city;
    `;

		return result.map((item) => ({
			...item,
			places: parseInt(item.places),
			remainingPlaces: parseInt(item.remainingPlaces),
			assignedPlaces: parseInt(item.assignedPlaces),
		}));
	}
}
