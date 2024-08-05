/** ADAPTERS */
import { MockSpecialtiesGateway } from "@/modules/specialties/core/testing/specialties.gateway.mock";
import { InMemorySpecialtiesGateway } from "@/modules/specialties/core/infrastructure/in-memory/in-memory-specialties.gateway";
import { MockFailingSpecialtiesGateway } from "@/modules/specialties/core/testing/failing-specialties.gateway.mock";
/** USE CASES */
import { FindSpecialtiesPerSimulationUseCase } from "../find-specialties-per-simulation.use-case";

describe("Find specialties per year", () => {
	it("Should find specialties without rank", async () => {
		const gateway = new MockSpecialtiesGateway(
			new InMemorySpecialtiesGateway()
		);
		const { specialties } = await new FindSpecialtiesPerSimulationUseCase(
			gateway
		).execute({ stage: 1 });

		expect(specialties).toEqual([
			{
				specialty: "CMF",
				places: 1,
				bestRank: 89,
				worstRank: 89,
				remainingPlaces: 0,
				assignedPlaces: 1,
				wouldHaveIt: false,
			},
			{
				specialty: "ACP",
				places: 4,
				bestRank: 789,
				worstRank: 4689,
				remainingPlaces: 1,
				assignedPlaces: 3,
				wouldHaveIt: false,
			},
			{
				specialty: "RHU",
				places: 33,
				bestRank: null,
				worstRank: null,
				remainingPlaces: 33,
				assignedPlaces: 0,
				wouldHaveIt: false,
			},
			{
				specialty: "ATT",
				places: 21,
				bestRank: 89,
				worstRank: 1800,
				remainingPlaces: 0,
				assignedPlaces: 21,
				wouldHaveIt: false,
			},
			{
				specialty: "COR",
				places: 89,
				bestRank: 789,
				worstRank: 4689,
				remainingPlaces: 2,
				assignedPlaces: 87,
				wouldHaveIt: false,
			},
			{
				specialty: "URO",
				places: 33,
				bestRank: 145,
				worstRank: 3895,
				assignedPlaces: 20,
				remainingPlaces: 13,
				wouldHaveIt: false,
			},
			{
				specialty: "PSY",
				places: 128,
				bestRank: null,
				worstRank: null,
				assignedPlaces: 0,
				remainingPlaces: 0,
				wouldHaveIt: false,
			},
			{
				specialty: "PED",
				places: 89,
				bestRank: 789,
				worstRank: 4689,
				assignedPlaces: 89,
				remainingPlaces: 0,
				wouldHaveIt: false,
			},
			{
				specialty: "CTC",
				places: 33,
				bestRank: 145,
				worstRank: 3895,
				assignedPlaces: 33,
				remainingPlaces: 0,
				wouldHaveIt: false,
			},
			{
				specialty: "NEU",
				places: 21,
				bestRank: null,
				worstRank: null,
				assignedPlaces: 0,
				remainingPlaces: 21,
				wouldHaveIt: false,
			},
			{
				specialty: "CVA",
				places: 89,
				bestRank: null,
				worstRank: null,
				assignedPlaces: 0,
				remainingPlaces: 89,
				wouldHaveIt: false,
			},
			{
				specialty: "MLE",
				places: 33,
				bestRank: 145,
				worstRank: 3895,
				assignedPlaces: 15,
				remainingPlaces: 18,
				wouldHaveIt: false,
			},
		]);
	});

	it("Should find specialties with rank", async () => {
		const rank = 2000;
		const gateway = new MockSpecialtiesGateway(
			new InMemorySpecialtiesGateway()
		);
		const { specialties } = await new FindSpecialtiesPerSimulationUseCase(
			gateway
		).execute({ stage: 1, rank });

		expect(specialties).toEqual([
			{
				specialty: "CMF",
				places: 1,
				bestRank: 89,
				worstRank: 89,
				remainingPlaces: 0,
				assignedPlaces: 1,
				wouldHaveIt: false,
			},
			{
				specialty: "ACP",
				places: 4,
				bestRank: 789,
				worstRank: 4689,
				remainingPlaces: 1,
				assignedPlaces: 3,
				wouldHaveIt: true,
			},
			{
				specialty: "RHU",
				places: 33,
				bestRank: null,
				worstRank: null,
				remainingPlaces: 33,
				assignedPlaces: 0,
				wouldHaveIt: true,
			},
			{
				specialty: "ATT",
				places: 21,
				bestRank: 89,
				worstRank: 1800,
				remainingPlaces: 0,
				assignedPlaces: 21,
				wouldHaveIt: false,
			},
			{
				specialty: "COR",
				places: 89,
				bestRank: 789,
				worstRank: 4689,
				remainingPlaces: 2,
				assignedPlaces: 87,
				wouldHaveIt: true,
			},
			{
				specialty: "URO",
				places: 33,
				bestRank: 145,
				worstRank: 3895,
				assignedPlaces: 20,
				remainingPlaces: 13,
				wouldHaveIt: true,
			},
			{
				specialty: "PSY",
				places: 128,
				bestRank: null,
				worstRank: null,
				assignedPlaces: 0,
				remainingPlaces: 0,
				wouldHaveIt: true,
			},
			{
				specialty: "PED",
				places: 89,
				bestRank: 789,
				worstRank: 4689,
				assignedPlaces: 89,
				remainingPlaces: 0,
				wouldHaveIt: true,
			},
			{
				specialty: "CTC",
				places: 33,
				bestRank: 145,
				worstRank: 3895,
				assignedPlaces: 33,
				remainingPlaces: 0,
				wouldHaveIt: true,
			},
			{
				specialty: "NEU",
				places: 21,
				bestRank: null,
				worstRank: null,
				assignedPlaces: 0,
				remainingPlaces: 21,
				wouldHaveIt: true,
			},
			{
				specialty: "CVA",
				places: 89,
				bestRank: null,
				worstRank: null,
				assignedPlaces: 0,
				remainingPlaces: 89,
				wouldHaveIt: true,
			},
			{
				specialty: "MLE",
				places: 33,
				bestRank: 145,
				worstRank: 3895,
				assignedPlaces: 15,
				remainingPlaces: 18,
				wouldHaveIt: true,
			},
		]);
	});

	it("Should fail to find specialties", async () => {
		const gateway = new MockFailingSpecialtiesGateway();

		expect(async () => {
			await new FindSpecialtiesPerSimulationUseCase(gateway).execute({
				stage: 2023,
			});
		}).rejects.toThrow(Error);
	});
});
