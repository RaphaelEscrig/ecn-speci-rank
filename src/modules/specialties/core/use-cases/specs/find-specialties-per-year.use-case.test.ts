/** ADAPTERS */
import { MockSpecialtiesGateway } from "../../testing/specialties.gateway.mock";
import { InMemorySpecialtiesGateway } from "../../infrastructure/in-memory/in-memory-specialties.gateway";
import { MockFailingSpecialtiesGateway } from "../../testing/failing-specialties.gateway.mock";
/** FACTORIES */
import { SpecialtyFactory } from "../../domain/factories/specialty.factory";
/** USE CASES */
import { FindSpecialtiesPerYearUseCase } from "../find-specialties-per-year.use-case";

describe("Find specialties per year", () => {
	it("Should find specialties without rank", async () => {
		const gateway = new MockSpecialtiesGateway(
			new InMemorySpecialtiesGateway()
		);
		const { specialties } = await new FindSpecialtiesPerYearUseCase(
			gateway
		).execute({ year: 2023 });

		expect(specialties).toEqual([
			{
				specialty: "CMF",
				wouldHaveIt: false,
				places: 21,
				bestRank: 89,
				worstRank: 1800,
			},
			{
				specialty: "ACP",
				wouldHaveIt: false,

				places: 89,
				bestRank: 789,
				worstRank: 4689,
			},
			{
				specialty: "RHU",
				wouldHaveIt: false,

				places: 33,
				bestRank: 145,
				worstRank: 3895,
			},
			{
				specialty: "ATT",
				wouldHaveIt: false,

				places: 21,
				bestRank: 89,
				worstRank: 1800,
			},
			{
				specialty: "COR",
				wouldHaveIt: false,

				places: 89,
				bestRank: 789,
				worstRank: 4689,
			},
			{
				specialty: "URO",
				wouldHaveIt: false,

				places: 33,
				bestRank: 145,
				worstRank: 3895,
			},
			{
				specialty: "PSY",
				wouldHaveIt: false,

				places: 128,
				bestRank: 789,
				worstRank: 7893,
			},
			{
				specialty: "PED",
				wouldHaveIt: false,

				places: 89,
				bestRank: 789,
				worstRank: 4689,
			},
			{
				specialty: "CTC",
				wouldHaveIt: false,

				places: 33,
				bestRank: 145,
				worstRank: 3895,
			},
			{
				specialty: "NEU",
				wouldHaveIt: false,

				places: 21,
				bestRank: 89,
				worstRank: 1800,
			},
			{
				specialty: "CVA",
				wouldHaveIt: false,

				places: 89,
				bestRank: 789,
				worstRank: 4689,
			},
			{
				specialty: "MLE",
				wouldHaveIt: false,

				places: 33,
				bestRank: 145,
				worstRank: 3895,
			},
		]);
	});

	it("Should find specialties with rank", async () => {
		const rank = 2000;
		const gateway = new MockSpecialtiesGateway(
			new InMemorySpecialtiesGateway()
		);
		const { specialties } = await new FindSpecialtiesPerYearUseCase(
			gateway
		).execute({ year: 2023, rank });

		expect(specialties).toEqual([
			{
				specialty: "CMF",
				wouldHaveIt: false,
				places: 21,
				bestRank: 89,
				worstRank: 1800,
			},
			{
				specialty: "ACP",
				wouldHaveIt: true,
				places: 89,
				bestRank: 789,
				worstRank: 4689,
			},
			{
				specialty: "RHU",
				wouldHaveIt: true,
				places: 33,
				bestRank: 145,
				worstRank: 3895,
			},
			{
				specialty: "ATT",
				wouldHaveIt: false,
				places: 21,
				bestRank: 89,
				worstRank: 1800,
			},
			{
				specialty: "COR",
				wouldHaveIt: true,
				places: 89,
				bestRank: 789,
				worstRank: 4689,
			},
			{
				specialty: "URO",
				wouldHaveIt: true,
				places: 33,
				bestRank: 145,
				worstRank: 3895,
			},
			{
				specialty: "PSY",
				wouldHaveIt: true,
				places: 128,
				bestRank: 789,
				worstRank: 7893,
			},
			{
				specialty: "PED",
				wouldHaveIt: true,
				places: 89,
				bestRank: 789,
				worstRank: 4689,
			},
			{
				specialty: "CTC",
				wouldHaveIt: true,
				places: 33,
				bestRank: 145,
				worstRank: 3895,
			},
			{
				specialty: "NEU",
				wouldHaveIt: false,
				places: 21,
				bestRank: 89,
				worstRank: 1800,
			},
			{
				specialty: "CVA",
				wouldHaveIt: true,
				places: 89,
				bestRank: 789,
				worstRank: 4689,
			},
			{
				specialty: "MLE",
				wouldHaveIt: true,
				places: 33,
				bestRank: 145,
				worstRank: 3895,
			},
		]);
	});

	it("Should fail to find specialties", async () => {
		const gateway = new MockFailingSpecialtiesGateway();

		expect(async () => {
			await new FindSpecialtiesPerYearUseCase(gateway).execute({ year: 2023 });
		}).rejects.toThrow(Error);
	});
});
