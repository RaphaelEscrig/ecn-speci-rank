export type Form = {
	readonly year: string;
	readonly rank: string;
	readonly specialty: string;
};

export type FormErrors = Record<
	keyof Pick<Form, "year" | "rank" | "specialty">,
	string | null
>;

export type City = {
	readonly name: string;
	readonly bestRank: number;
	readonly worstRank: number;
	readonly places: number;
};

export type CityWithRankResult = City & {
	readonly wouldHaveIt: boolean;
};
