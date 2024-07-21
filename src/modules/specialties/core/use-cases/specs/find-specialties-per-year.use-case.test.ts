/** ADAPTERS */
import { MockSpecialtiesGateway } from "../../testing/specialties.gateway.mock";
import { InMemorySpecialtiesGateway } from "../../infrastructure/in-memory/in-memory-specialties.gateway";
import { MockFailingSpecialtiesGateway } from "../../testing/failing-specialties.gateway.mock";
/** FACTORIES */
import { SpecialtyFactory } from "../../domain/factories/specialty.factory";
/** USE CASES */
import { FindSpecialtiesPerYearUseCase } from "../find-specialties-per-year.use-case";

describe("Find specialties per year", () => {
	it("Should find specialties", async () => {
		const gateway = new MockSpecialtiesGateway(
			new InMemorySpecialtiesGateway()
		);
		const { specialties } = await new FindSpecialtiesPerYearUseCase(
			gateway
		).execute({ year: 2023 });

		expect(specialties).toEqual(SpecialtyFactory.createSpecialtiesPerYear());
	});

	it("Should fail to find specialties", async () => {
		const gateway = new MockFailingSpecialtiesGateway();

		expect(async () => {
			await new FindSpecialtiesPerYearUseCase(gateway).execute({ year: 2023 });
		}).rejects.toThrow(Error);
	});
});
