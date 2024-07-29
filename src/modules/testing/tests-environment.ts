/** ADAPTERS */
import { MockSpecialtiesGateway } from "@/modules/specialties/core/testing/specialties.gateway.mock";
import { InMemorySpecialtiesGateway } from "@/modules/specialties/core/infrastructure/in-memory/in-memory-specialties.gateway";
import { InMemoryCitiesGateway } from "@/modules/cities/core/infrastructure/in-memory/in-memory-cities.gateway";
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
