import styles from "./cities-estimator.module.scss";
/** COMPONENTS */
import CitiesEstimator from "../components/CitiesEstimator/CitiesEstimator.component";

const CitiesEstimatorPage = () => {
	return (
		<main id={styles.page}>
			<CitiesEstimator />
		</main>
	);
};

export default CitiesEstimatorPage;
