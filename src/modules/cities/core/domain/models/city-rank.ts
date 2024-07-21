export type Form = {
	readonly year: string;
	readonly rank: string;
	readonly specialty: string;
};

export type FormErrors = Record<
	keyof Pick<Form, "year" | "rank" | "specialty">,
	string | null
>;
