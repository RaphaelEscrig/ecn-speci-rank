"use client";

import { useEffect, useState } from "react";
import styles from "./CitiesEstimator.module.scss";
import { CitiesEstimatorForm } from "../CitiesEstimatorForm/CitiesEstimatorForm.component";
import { EstimateCitiesUseCase } from "@/modules/cities-estimator/core/use-cases/estimate-cities.use-case";
import { numberWithoutSpaces } from "@/modules/shared/utils/numbers.util";

type Form = {
	readonly rank: string;
	readonly specialty: string;
	readonly year: string;
};

type City = {
	readonly city: string;
	readonly wouldHaveIt: boolean;
	readonly bestRank: number;
	readonly worstRank: number;
	readonly myRank: number;
	readonly places: number;
};

const CityCard = ({ city }: { city: City }) => {
	if (city.places === 0 || city.places === null) return null;

	return (
		<div className={styles.cityCard} data-would-have-it={city.wouldHaveIt}>
			<h2>{city.city}</h2>

			<span>
				{city.places === 1
					? `Classement requis: ${city.bestRank}`
					: `Classement requis: ${city.bestRank} - ${city.worstRank}`}
			</span>
			<span>Place(s): {city.places}</span>
		</div>
	);
};

const CitiesSumUp = ({ cities }: { cities: City[] }) => {
	const [citiesWithPlaces, setCitiesWithPlaces] = useState<City[]>([]);

	useEffect(() => {
		setCitiesWithPlaces(
			cities.filter((city) => city.places > 0 && city.places !== null)
		);
	}, [cities]);

	return (
		<div className={styles.sumUp}>
			<span>
				Nombre de villes: <strong>{citiesWithPlaces.length}</strong>
			</span>
			<span>
				Nombre de places:{" "}
				<strong>
					{citiesWithPlaces.reduce((acc, city) => (acc += city.places), 0)}
				</strong>
			</span>
			<span>
				Vous auriez eu{" "}
				<strong>
					{citiesWithPlaces.reduce(
						(acc, city) => (acc += city.wouldHaveIt ? 1 : 0),
						0
					)}
				</strong>{" "}
				villes
			</span>
		</div>
	);
};

const CitiesEstimator = () => {
	const [estimateCities] = useState(new EstimateCitiesUseCase());
	const [cities, setCities] = useState<City[]>([]);

	const handleSubmit = (form: Form): void => {
		const res = estimateCities.execute({
			rank: numberWithoutSpaces(form.rank),
			specialty: form.specialty,
			year: parseInt(form.year),
		});

		setCities(res.cities);
	};

	return (
		<div className={styles.container}>
			<CitiesEstimatorForm onSubmit={handleSubmit} />

			{cities.length > 0 && (
				<>
					<CitiesSumUp cities={cities} />

					<div className={styles.cities}>
						{cities.map((city, index) => (
							<CityCard key={index} city={city} />
						))}
					</div>
				</>
			)}
		</div>
	);
};

export default CitiesEstimator;
