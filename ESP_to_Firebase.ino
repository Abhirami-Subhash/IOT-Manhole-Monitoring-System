#include <ESP8266WiFi.h>
#include <FirebaseESP8266.h>

// Provide the token generation process info.
#include "addons/TokenHelper.h"
// Provide the RTDB payload printing info and other helper functions.
#include "addons/RTDBHelper.h"

//Define Firebase Data object
FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

String WIFI_SSID = "POCO_PHONE";
String WIFI_PASSWORD = "25542542";

String DATABASE_URL = "https://mini-project-iot-d5240-default-rtdb.asia-southeast1.firebasedatabase.app/";
String API_KEY = "AIzaSyBg4lGtkxE1dOARADvyM-tQTgoFcHUKld4";

String USER_EMAIL = "abhiramiss247@gmail.com";
String USER_PASSWORD = "abhirami@2000";

String uid;
// int test = 0;

// char data[20];

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);  
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  Serial.print("Connecting to WiFi ..");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print('.');
    delay(1000);
  }  
  Serial.println();
  Serial.println("Connected to " + WIFI_SSID);
  Serial.print("Local IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();

  /* Assign the RTDB URL (required) */
  config.database_url = DATABASE_URL;
  /* Assign the api key (required) */
  config.api_key = API_KEY;
  /* Assign the callback function for the long running token generation task */
  config.token_status_callback = tokenStatusCallback;  //see addons/TokenHelper.h

  auth.user.email = USER_EMAIL;
  auth.user.password = USER_PASSWORD;

  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);

  Serial.println("Getting User UID");
  while ((auth.token.uid) == "") {
    Serial.print('.');
    delay(1000);
  }

  uid = auth.token.uid.c_str();
  Serial.print("User UID: ");
  Serial.println(uid);
}

void loop() {
  // put your main code here, to run repeatedly:
  char data[20] = "";
  if (Serial.available()) {
    // Serial.print("From Arduino: ");
    Serial.readBytesUntil('\n', data, 20);
    // data = Serial.read();
    Serial.println(data);

    String dataString = String(data);
    String valueType = dataString.substring(0,4);
    
    if (valueType == "ammo") {
      int value;
      value = dataString.substring(5).toInt();
      sendDataToFirebase("/sensorData/ammoniaConcentration",value);
    }

    if (valueType == "dist") {
      int value;
      value = dataString.substring(5).toInt();
      sendDataToFirebase("/sensorData/distance",value);
    }

    if (valueType == "meth") {
      int value;
      value = dataString.substring(5).toInt();
      sendDataToFirebase("/sensorData/methaneConcentration",value);
    }

    if (valueType == "tilt") {
      int value;
      value = dataString.substring(5).toInt();
      sendDataToFirebase("/sensorData/tilt",value);
    }
  }
}

void sendDataToFirebase(String path, int value) {
  if (Firebase.setInt(fbdo, path, value)) {
      Serial.print("Successfully set ");
      Serial.print(value);
      Serial.print(" at ");
      Serial.println(path);

  } else {
    Serial.println(fbdo.errorReason());
  }
}
