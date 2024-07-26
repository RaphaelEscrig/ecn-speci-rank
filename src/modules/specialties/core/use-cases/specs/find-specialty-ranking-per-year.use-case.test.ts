/** ADAPTERS */
import { MockSpecialtiesGateway } from "../../testing/specialties.gateway.mock";
import { InMemorySpecialtiesGateway } from "../../infrastructure/in-memory/in-memory-specialties.gateway";
import { MockFailingSpecialtiesGateway } from "../../testing/failing-specialties.gateway.mock";
/** MODELS */
import type { SpecialtyCode } from "@/modules/shared/domain/models";
/** USE CASES */
import { FindSpecialtiesRankingPerYearUseCase } from "../find-specialties-ranking-per-year.use-case";

describe("Find specialty ranking per year", () => {
	const specialty: SpecialtyCode = "CMF";
	const year = 2023;
	it("Should find ranking", async () => {
		const gateway = new MockSpecialtiesGateway(
			new InMemorySpecialtiesGateway()
		);

		const { ranking } = await new FindSpecialtiesRankingPerYearUseCase(
			gateway
		).execute({ specialty, year });

		expect(ranking).toEqual([
			{
				specialty,
				year,
				rank: 1,
				intern: "John Doe",
				city: "Bordeaux",
			},
			{
				specialty,
				year,
				rank: 2,
				intern: "Jhin Dil",
				city: "Strasbourg",
			},
			{
				specialty,
				year,
				rank: 3,
				intern: "Lula Yuj",
				city: "Rennes",
			},
			{
				specialty,
				year,
				rank: 4,
				intern: "Mast Bard",
				city: "Amiens",
			},
			{
				specialty,
				year,
				rank: 5,
				intern: "Roat Bzar",
				city: "Montpellier",
			},
			{
				specialty,
				year,
				rank: 6,
				intern: "Basil Lud",
				city: "Rennes",
			},
			{
				specialty,
				year,
				rank: 7,
				intern: "Rita Ota",
				city: "Grenoble",
			},
			{
				specialty,
				year,
				rank: 8,
				intern: "Yan Jurd",
				city: "Clermont-Ferrand",
			},
		]);
	});

	it("Should failed to find ranking", async () => {
		const gateway = new MockFailingSpecialtiesGateway();

		expect(async () => {
			await new FindSpecialtiesRankingPerYearUseCase(gateway).execute({
				specialty,
				year,
			});
		}).rejects.toThrow(Error);
	});
});
