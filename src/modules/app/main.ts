/** ADAPTERS */
import postgres from "postgres";
import { InMemorySpecialtiesGateway } from "../specialties/core/infrastructure/in-memory/in-memory-specialties.gateway";
import { PSQLSpecialtiesGateway } from "../specialties/core/infrastructure/psql/psql-specialties.gateway";
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
			specialtiesGateway: new PSQLSpecialtiesGateway(psql),
			// process.env.NODE_ENV === "development"
			// 	? new InMemorySpecialtiesGateway()
			// 	: new PSQLSpecialtiesGateway(psql),
		};
	}

	get dependencies(): Dependencies {
		return this.appDependencies;
	}
}

const app = new App();

export default app;
