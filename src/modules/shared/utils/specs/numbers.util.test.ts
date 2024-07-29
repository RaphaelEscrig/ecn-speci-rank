/** UTILS */
import {
	castStringNumberToNumber,
	numberWithoutSpaces,
	numberWithSpaces,
} from "../numbers.util";

describe("numberWithSpaces", () => {
	it.each([
		{
			value: "10",
			expected: "10",
		},
		{
			value: 89,
			expected: "89",
		},
		{
			value: "10.83",
			expected: "10.83",
		},
		{
			value: 10.83,
			expected: "10.83",
		},
		{
			value: "1 283",
			expected: "1 283",
		},
		{
			value: "1 283.78",
			expected: "1 283.78",
		},
		{
			value: 1897.1,
			expected: "1 897.1",
		},
		{
			value: "",
			expected: "",
		},
	])("should return $value when input is [$key]", ({ value, expected }) => {
		const res = numberWithSpaces(value);

		expect(res).toBe(expected);
	});
});

describe("numberWithoutSpaces", () => {
	it.each([
		{
			value: "10",
			expected: 10,
		},
		{
			value: "10.83",
			expected: 10.83,
		},
		{
			value: "1 283",
			expected: 1283,
		},
		{
			value: "1 283.78",
			expected: 1283.78,
		},
		{
			value: "",
			expected: 0,
		},
	])("should return $value when input is [$key]", ({ value, expected }) => {
		const res = numberWithoutSpaces(value);

		expect(res).toBe(expected);
	});
});

describe("castStringNumberToNumber", () => {
	it.each([
		{
			value: "10",
			expected: 10,
		},
		{
			value: "10.83",
			expected: 10.83,
		},
		{
			value: "1 283",
			expected: 1283,
		},
		{
			value: "1 283.78",
			expected: 1283.78,
		},
		{
			value: "",
			expected: 0,
		},
	])("should return $value when input is [$key]", ({ value, expected }) => {
		const res = castStringNumberToNumber(value);

		expect(res).toBe(expected);
	});
});
