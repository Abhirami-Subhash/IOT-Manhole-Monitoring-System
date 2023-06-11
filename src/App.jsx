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
		type: "service_account",
		project_id: "mini-project-iot-d5240",
		private_key_id: "9feba2dc6ecab7775b3d6b58e20b628cd6124411",
		private_key:
			"-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC3zTktYl3YwfUo\nbPkgQhQfhwxiUElYM3qkC7E7OvkcNDS35MJyKxJQDnOuOCi7NKgfFl6aHKX6b5Yv\n7FRPYPAG8Ib8QnSgUGkExQwDT02CWl3j2v1p2ocysb2LP6BxzcaeQiNk6fu+SKU2\npJkZTVXluDhkCAnd4sDLmcY7BVdzEANBw4TFocGoiPARgBtZr3LcAzWtREMq4N4B\nKsR23y5QatFoEHs1lnIEbdGRRKxHhJXR9mq44OkS2jG5S52J04EoPfWIkNMjloN0\nMuwYW9TnWipwj8lp7AUWykSafU54H2hDRp//QcKlGCSeK1uID5ih89s/QIwQ83wE\nvF+D2KP9AgMBAAECggEAFMm7BQlKVHTxaaJTleSrWnp/edIbTYS7AvlIkQqlOJ2l\n9cODg36gGlpcFpEG+E9nEWcKCZOiaR38RkzMJ1MvKpXDKp5IiwY1LoMrzecG/O6E\nDnyK61E6N89XAPwQBTcRFv6jeqslHBsixnic0ToINExe4l9vYD9gb1ajzzKWNq7f\n+5OJf5BVMHHXDxSBXZG4jlWDCl89OsAC3ypLUL1DL9E3TY/fUXMu7D/eDGTaMgQU\npJc+5KCm/IABdmsWIc6CABonqa4gur4OZjO9YsgrfuraTwnMSTSWifwyHtcGeHW5\nByxWe1OoTEox6BVZ77U2qx3+lqfTvn7rHdqQkHkjqQKBgQD/O7qpagJhebRWmfi3\nm7TCuSNP4a8Wsxm+OYvewL+NsgSZ9iyBIdP4M+2pef/z198oXMkLU9aQcv2JZcWp\n7zGkojIlTRfjYLfG6Q6XnM8PK4abK+X+n7XWBNdlIRbWD3nA1sHEvzB2vgK5yqNZ\nmAe5F5SNxLiRU2uwW3gvx1GBiQKBgQC4WpByvZXM0/zGZyFIF6KqQ1H2OMfGsfKj\nF/UnuoHR4jVOtHJcjKzVeqXYCpi8/+ZEHoAz2yO6LcSRp7KolXSZIPDs7hKYv6gn\nYn7Fl4grWTFYygjRvYymA7PbE/5Nq1LTNloGUkXKACh3bnUN8iq5yc/YKJFyOFTO\nSQe7RmK11QKBgQDvoMpdqJPXpIY2EJU8/Uk20M9gfkj+jOSMfkbduiWeCRbc3g1m\np7X1f/uQdGRkMbbolESFCA+Yyv1S9GQiado38bgW4UyeQ/4HGGSE38pfOcRFB3AG\nITh9WUpJPknMa/cpn/eImuALe9XfTWsUAPKvSn5Eo/+NIb8ncplickYJ0QKBgFGo\nY9U/HqxktdGX+sj5Fyc9vH9ItUzQo34UbZXUag5ymVQsX3+ZHDFPK0ifoPoOi4te\ny0Cs741XGnu+AUflM4lkavM3nOsl8bDIUwjozvsMfewrSW7F/BfJChCfMYRrv7so\nlwW3yYvpOAN23Mh5nO1AdBz2Ez65ru7UsGUGj1ClAoGAVo/IoL63Nd2fcrjfHDfh\n51qya/w7fshZMsIQZZAhSnPnO/+/dcqwSXPS4sxBm5EkZJ/IuolYuhz4VqgPGCcY\n51+Q3ooBnwHh1eRYiFnvlkDiPzalWQ0xhi2vBGrN8QzNv3FmjOeeJonGbUCUPBga\norw+4XnKjD2AVGCd901Gn80=\n-----END PRIVATE KEY-----\n",
		client_email:
			"firebase-adminsdk-93uja@mini-project-iot-d5240.iam.gserviceaccount.com",
		client_id: "116923880824750730069",
		auth_uri: "https://accounts.google.com/o/oauth2/auth",
		token_uri: "https://oauth2.googleapis.com/token",
		auth_provider_x509_cert_url:
			"https://www.googleapis.com/oauth2/v1/certs",
		client_x509_cert_url:
			"https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-93uja%40mini-project-iot-d5240.iam.gserviceaccount.com",
		universe_domain: "googleapis.com",
		databaseURL:
			"https://mini-project-iot-d5240-default-rtdb.asia-southeast1.firebasedatabase.app/",
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
