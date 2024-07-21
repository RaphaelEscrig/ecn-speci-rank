/** ADAPTERS */
import postgres from "postgres";
import { InMemoryCitiesGateway } from "../cities/core/infrastructure/in-memory/in-memory-cities.gateway";
import { InMemorySpecialtiesGateway } from "../specialties/core/infrastructure/in-memory/in-memory-specialties.gateway";
import { PSQLSpecialtiesGateway } from "../specialties/core/infrastructure/psql/psql-specialties.gateway";
import { PSQLCitiesGateway } from "../cities/core/infrastructure/psql/psql-cities.gateway";
/** MODELS */
import type { Dependencies } from "@/modules/shared/domain/models";

const psql = postgres(process.env.POSTGRES_URL!, {
	ssl: "allow",
});
export class App {
	private appDependencies: Dependencies;

	constructor() {
		this.appDependencies = this.setupDependencies();
	}

	private setupDependencies(): Dependencies {
		return {
			specialtiesGateway:
				process.env.NODE_ENV === "development"
					? new InMemorySpecialtiesGateway()
					: new PSQLSpecialtiesGateway(psql),
			citiesGateway:
				process.env.NODE_ENV === "development"
					? new InMemoryCitiesGateway()
					: new PSQLCitiesGateway(psql),
		};
	}

	get dependencies(): Dependencies {
		return this.appDependencies;
	}
}

const app = new App();

export default app;
