/** ADAPTERS */
import { MockSpecialtiesGateway } from "../specialties/core/testing/specialties.gateway.mock";
import { InMemorySpecialtiesGateway } from "../specialties/core/infrastructure/in-memory/in-memory-specialties.gateway";
import { InMemoryCitiesGateway } from "../cities/core/infrastructure/in-memory/in-memory-cities.gateway";
/** MODELS */
import type { Dependencies } from "@/modules/shared/domain/models";

/**
 * Create testing dependencies with provided defaults
 * @param dependencies
 * @returns
 */
export const createTestDependencies = (
	dependencies?: Partial<Dependencies>
): Dependencies => ({
	specialtiesGateway: new MockSpecialtiesGateway(
		new InMemorySpecialtiesGateway()
	),
	citiesGateway: new InMemoryCitiesGateway(),
	...dependencies,
});
