/** ADAPTERS */
import { InMemoryCitiesGateway } from "../../infrastructure/in-memory/in-memory-cities.gateway";
import { MockFailingSCitiesGateway } from "../../testing/failing-cities.gateway.mock";
/** MODELS */
import type { SpecialtyCode } from "@/modules/shared/domain/models";
/** PORTS */
import { MockCitiesGateway } from "../../testing/cities.gateway.mock";
/** USE CASES */
import { EstimateCitiesIWouldHaveUseCase } from "../estimate-cities-i-would-have.use-case";

describe("Estimate cities I would have", () => {
	const rank = 789;
	const specialty: SpecialtyCode = "CMF";
	const year = 2023;
	it("Should find cities", async () => {
		const gateway = new MockCitiesGateway(new InMemoryCitiesGateway());
		const { cities } = await new EstimateCitiesIWouldHaveUseCase(
			gateway
		).execute({ year, rank, specialty });

		expect(cities).toEqual([
			{
				name: "Grenoble",
				wouldHaveIt: true,
				bestRank: 17,
				worstRank: 3782,
				places: 2,
			},
			{
				name: "Bordeaux",
				wouldHaveIt: false,
				bestRank: 89,
				worstRank: 89,
				places: 1,
			},
			{
				name: "Toulouse",
				wouldHaveIt: false,
				bestRank: 182,
				worstRank: 182,
				places: 1,
			},
			{
				name: "Strasbourg",
				wouldHaveIt: true,
				bestRank: 278,
				worstRank: 897,
				places: 3,
			},
			{
				name: "Montpellier",
				wouldHaveIt: false,
				bestRank: 387,
				worstRank: 523,
				places: 3,
			},
			{
				name: "Rennes",
				wouldHaveIt: false,
				bestRank: 451,
				worstRank: 451,
				places: 1,
			},
			{
				name: "Reims",
				wouldHaveIt: true,
				bestRank: 452,
				worstRank: 8974,
				places: 7,
			},
		]);
	});
	it("Should fail to find cities", async () => {
		const gateway = new MockFailingSCitiesGateway();
		expect(async () => {
			await new EstimateCitiesIWouldHaveUseCase(gateway).execute({
				year,
				rank,
				specialty,
			});
		}).rejects.toThrow(Error);
	});
});
