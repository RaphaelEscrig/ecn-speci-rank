/** ADAPTERS */
import { InMemorySpecialtiesGateway } from "../specialties/core/infrastructure/in-memory/in-memory-specialties.gateway";
import { HttpSpecialtiesGateway } from "../specialties/core/infrastructure/http/http-specialties.gateway";
/** MODELS */
import type { Dependencies } from "@/modules/shared/domain/models";

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
					: new HttpSpecialtiesGateway(),
		};
	}

	get dependencies(): Dependencies {
		return this.appDependencies;
	}
}

const app = new App();

export default app;
