/** MODELS */
import type { Specialty } from "@/modules/specialties/core/domain/models";
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
}
