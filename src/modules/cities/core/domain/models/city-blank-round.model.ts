export type Form = {
	readonly round: string;
	readonly rank: string;
	readonly specialty: string;
};

export type FormErrors = Record<
	keyof Pick<Form, "round" | "rank" | "specialty">,
	string | null
>;

export type City = {
	readonly name: string;
	readonly bestRank: number | null;
	readonly worstRank: number | null;
	readonly places: number;
	readonly assignedPlaces: number;
	readonly remainingPlaces: number;
};

export type CityWithRankResult = City & {
	readonly wouldHaveIt: boolean;
};
