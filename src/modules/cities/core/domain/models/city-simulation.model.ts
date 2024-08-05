export type Form = {
	readonly stage: string;
	readonly rank: string;
	readonly specialty: string;
};

export type FormErrors = Record<
	keyof Pick<Form, "stage" | "rank" | "specialty">,
	string | null
>;

export type City = {
	readonly name: string;
	readonly bestRank: number;
	readonly worstRank: number;
	readonly places: number;
	readonly assignedPlaces: number;
	readonly remainingPlaces: number;
};

export type CityWithRankResult = City & {
	readonly wouldHaveIt: boolean;
};
