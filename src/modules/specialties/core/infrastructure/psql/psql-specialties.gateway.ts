/** MODELS */
import type { SpecialtyCode } from "@/modules/shared/domain/models";
import type {
	Specialty,
	SpecialtyRanking,
} from "@/modules/specialties/core/domain/models";
/** PORTS */
import type { ISpecialtiesGateway } from "@/modules/specialties/core/domain/ports/specialties.port";
/** POSTGRES */
import type postgres from "postgres";

export class PSQLSpecialtiesGateway implements ISpecialtiesGateway {
	constructor(private readonly psql: postgres.Sql) {}

	public async findAllPerYear(year: number): Promise<Specialty.PerYear[]> {
		const result: Specialty.PerYear[] = await this.psql`
				SELECT specialty, COUNT(*) as places, MIN(rank) as "bestRank", MAX(rank) as "worstRank"
    		FROM ranks
    		WHERE year = ${year}
    		GROUP BY specialty
			`;

		return result;
	}

	public async findRanking(
		specialty: SpecialtyCode,
		year: number
	): Promise<SpecialtyRanking.Rank[]> {
		const result: SpecialtyRanking.Rank[] = await this.psql`
		SELECT specialty, city, rank, intern, year
		FROM ranks
		WHERE year = ${year} AND specialty = ${specialty}
		ORDER by rank
	`;

		return result;
	}
}
