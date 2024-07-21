/** PORTS */
import type { ISpecialtiesGateway } from "@/modules/specialties/core/domain/ports/specialties.port";
import type { ICitiesGateway } from "@/modules/cities/core/domain/ports/cities.port";

export type Dependencies = {
	specialtiesGateway: ISpecialtiesGateway;
	citiesGateway: ICitiesGateway;
};

export type SpecialtyCode =
	| "ATT"
	| "CMF"
	| "COR"
	| "COT"
	| "CPD"
	| "CPR"
	| "CTC"
	| "CVA"
	| "CVD"
	| "GYO"
	| "NCU"
	| "OPH"
	| "ORL"
	| "URO"
	| "ALL"
	| "ACP"
	| "ARE"
	| "DVE"
	| "EDN"
	| "GEN"
	| "GER"
	| "GYM"
	| "HEM"
	| "HGE"
	| "MIT"
	| "MCA"
	| "MGE"
	| "MIR"
	| "MII"
	| "MLE"
	| "NUC"
	| "MPR"
	| "MTR"
	| "MUR"
	| "MVA"
	| "NEP"
	| "NEU"
	| "ONC"
	| "PED"
	| "PNE"
	| "PSY"
	| "RAI"
	| "RHU"
	| "SPU"
	| "BM";
