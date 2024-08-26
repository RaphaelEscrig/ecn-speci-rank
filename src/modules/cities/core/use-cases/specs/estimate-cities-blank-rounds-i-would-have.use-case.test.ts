/** ADAPTERS */
import { InMemoryCitiesGateway } from "@/modules/cities/core/infrastructure/in-memory/in-memory-cities.gateway";
import { MockFailingSCitiesGateway } from "@/modules/cities/core/testing/failing-cities.gateway.mock";
/** MODELS */
import type { SpecialtyCode } from "@/modules/shared/domain/models";
/** PORTS */
import { MockCitiesGateway } from "@/modules/cities/core/testing/cities.gateway.mock";
/** USE CASES */
import { EstimateCitiesBlankRoundsIWouldHaveUseCase } from "@/modules/cities/core/use-cases/estimate-cities-blank-rounds-i-would-have.use-case";

describe("Estimate cities I would have with this blank round", () => {
	const rank = 789;
	const specialty: SpecialtyCode = "CMF";
	const round = 1;

	it("Should find cities", async () => {
		const gateway = new MockCitiesGateway(new InMemoryCitiesGateway());
		const { cities } = await new EstimateCitiesBlankRoundsIWouldHaveUseCase(
			gateway
		).execute({ round, rank, specialty });

		expect(cities).toEqual([
			{
				name: "Bordeaux",
				bestRank: 89,
				worstRank: 89,
				places: 1,
				assignedPlaces: 1,
				remainingPlaces: 0,
				wouldHaveIt: false,
			},
			{
				name: "Toulouse",
				bestRank: 182,
				worstRank: 182,
				places: 1,
				assignedPlaces: 1,
				remainingPlaces: 0,
				wouldHaveIt: false,
			},
			{
				name: "Strasbourg",
				bestRank: 278,
				worstRank: 897,
				places: 3,
				assignedPlaces: 3,
				remainingPlaces: 0,
				wouldHaveIt: true,
			},
			{
				name: "Montpellier",
				bestRank: 387,
				worstRank: 523,
				places: 3,
				assignedPlaces: 3,
				remainingPlaces: 0,
				wouldHaveIt: false,
			},
			{
				name: "Reims",
				bestRank: 452,
				worstRank: 8974,
				places: 7,
				assignedPlaces: 5,
				remainingPlaces: 2,
				wouldHaveIt: true,
			},
			{
				name: "Grenoble",
				bestRank: null,
				worstRank: null,
				places: 2,
				assignedPlaces: 0,
				remainingPlaces: 2,
				wouldHaveIt: true,
			},
			{
				name: "Rennes",
				bestRank: null,
				worstRank: null,
				places: 1,
				assignedPlaces: 0,
				remainingPlaces: 1,
				wouldHaveIt: true,
			},
		]);
	});

	it("Should fail to find cities", async () => {
		const gateway = new MockFailingSCitiesGateway();
		expect(async () => {
			await new EstimateCitiesBlankRoundsIWouldHaveUseCase(gateway).execute({
				round,
				rank,
				specialty,
			});
		}).rejects.toThrow(Error);
	});
});
