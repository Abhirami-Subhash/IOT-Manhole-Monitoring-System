import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import styles from "./App.module.css";
import Card from "./components/card";

function App() {
	const [ammoniaConcentration, setAmmoniaConcentration] = useState(0);
	const [distance, setdistance] = useState(0);
	const [methaneConcentration, setMethaneConcentration] = useState(0);
	const [tilt, setTilt] = useState(0);

	const firebaseConfig = {
		apiKey: "AIzaSyBg4lGtkxE1dOARADvyM-tQTgoFcHUKld4",
		authDomain: "mini-project-iot-d5240.firebaseapp.com",
		databaseURL:
			"https://mini-project-iot-d5240-default-rtdb.asia-southeast1.firebasedatabase.app",
		projectId: "mini-project-iot-d5240",
		storageBucket: "mini-project-iot-d5240.appspot.com",
		messagingSenderId: "624408154921",
		appId: "1:624408154921:web:bf0cf781f848828e07dd38",
		measurementId: "G-8HTQKNDYRR",
	};

	const app = initializeApp(firebaseConfig);
	const database = getDatabase(app);
	const sensorData = ref(database, "sensorData");

	const valueUpdateEffect = () => {
		onValue(sensorData, (snapshot) => {
			const data = snapshot.val();
			console.log("data", data);
			const {
				ammoniaConcentration: ammo,
				distance: dist,
				methaneConcentration: meth,
				tilt: tlt,
			} = data;

			setAmmoniaConcentration(ammo);
			setdistance(dist);
			setMethaneConcentration(meth);
			setTilt(tlt);
		});
	};

	// eslint-disable-next-line
	useEffect(valueUpdateEffect, []);

	return (
		<div className={styles.mainContainer}>
			<div className={styles.detailsContainer}>
				<div className={styles.title}>
					IOT - Manhole Monitoring System
				</div>
			</div>
			<div className={styles.dashboardContainer}>
				<div className={styles.dashboardSection}>
					<Card
						label="Ammonia Concentration"
						value={ammoniaConcentration}
						unit="ppm"
						threshold={350}
					/>
					<Card
						label="Distance"
						value={distance}
						unit="cm"
						threshold={20}
					/>
				</div>
				<div className={styles.dashboardSection}>
					<Card
						label="Methane Concentration"
						value={methaneConcentration}
						unit="ppm"
						threshold={350}
					/>
					<Card label="Tilt" value={tilt} threshold={1} />
				</div>
			</div>
		</div>
	);
}

export default App;
