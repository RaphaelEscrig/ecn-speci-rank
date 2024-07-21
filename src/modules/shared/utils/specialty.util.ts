/** CONSTANTS */
import { SPECIALTIES } from "@/modules/shared/domain/constants";

export const isValidSpecialty = (specialty: string): boolean => {
	return Array.from(SPECIALTIES.values()).some((value) => value === specialty);
};
