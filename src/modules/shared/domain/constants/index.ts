/** MODELS */
import type { SpecialtyCode } from "@/modules/shared/domain/models";

export const SPECIALTIES = new Map<string, SpecialtyCode>([
	["En attente de publication", "ATT"],
	["Chirurgie maxillo-faciale", "CMF"],
	["Chirurgie orale", "COR"],
	["Chirurgie orthopédique et traumatologique", "COT"],
	["Chirurgie pédiatrique", "CPD"],
	["Chirurgie plastique, reconstructrice et esthétique", "CPR"],
	["Chirurgie thoracique et cardiovasculaire", "CTC"],
	["Chirurgie vasculaire", "CVA"],
	["Chirurgie viscérale et digestive", "CVD"],
	["Gynécologie obstétrique", "GYO"],
	["Neurochirurgie", "NCU"],
	["Ophtalmologie", "OPH"],
	["Oto-rhino-laryngologie - chirurgie cervico-faciale", "ORL"],
	["Urologie", "URO"],
	["Allergologie", "ALL"],
	["Anatomie et cytologie pathologiques", "ACP"],
	["Anesthésie-réanimation", "ARE"],
	["Dermatologie et vénéréologie", "DVE"],
	["Endocrinologie-diabétologie-nutrition", "EDN"],
	["Génétique médicale", "GEN"],
	["Gériatrie", "GER"],
	["Gynécologie médicale", "GYM"],
	["Hématologie", "HEM"],
	["Hépato-gastro-entérologie", "HGE"],
	["Maladies infectieuses et tropicales", "MIT"],
	["Médecine cardiovasculaire", "MCA"],
	["Médecine générale", "MGE"],
	["Médecine intensive-réanimation", "MIR"],
	["Médecine interne et immunologie clinique", "MII"],
	["Médecine légale et expertises médicales", "MLE"],
	["Médecine nucléaire", "NUC"],
	["Médecine physique et de réadaptation", "MPR"],
	["Médecine et santé au travail", "MTR"],
	["Médecine d’urgence", "MUR"],
	["Médecine vasculaire", "MVA"],
	["Néphrologie", "NEP"],
	["Neurologie", "NEU"],
	["Oncologie", "ONC"],
	["Pédiatrie", "PED"],
	["Pneumologie", "PNE"],
	["Psychiatrie", "PSY"],
	["Radiologie et imagerie médicale", "RAI"],
	["Rhumatologie", "RHU"],
	["Santé publique", "SPU"],
	["Biologie médicale", "BM"],
]);

export const CITIES = [
	"AP-HP",
	"STRASBOURG	",
	"NANCY	",
	"BESANCON	",
	"DIJON",
	"REIMS",
	"CAEN",
	"ROUEN",
	"LILLE",
	"AMIENS",
	"CLERMONT-FERRAND",
	"GRENOBLE",
	"HCL",
	"SAINT ETIENNE",
	"BREST",
	"RENNES",
	"ANGERS",
	"NANTES",
	"TOURS",
	"POITIERS",
	"MONTPELLIER",
	"AP-HM",
	"NICE",
	"BORDEAUX",
	"LA REUNION",
	"TOULOUSE",
	"LIMOGES",
	"GUADELOUPE",
];
