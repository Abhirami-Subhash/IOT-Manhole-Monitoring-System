int tiltPin = 7;
int tilt;

int trigPin = 4;
int echoPin = 2;
long distance;

int mq4Pin=0;
int mq4Reading;

int mq135Pin=1;
int mq135Reading;

void setup() {
  Serial.begin(9600);
  pinMode(tiltPin, INPUT);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
}

void loop() {
  mq4Reading= analogRead(mq4Pin);
  Serial.print("meth:");
  Serial.println(mq4Reading);
  delay(2000);

  mq135Reading= analogRead(mq135Pin);
  Serial.print("ammo:");
  Serial.println(mq135Reading);
  delay(2000);

  tilt = digitalRead(tiltPin);
  Serial.print("tilt:");
  Serial.println(tilt);
  delay(2000);

  long duration;
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);    

  duration = pulseIn(echoPin, HIGH);
  distance = microsecondsToCentimeters(duration);
  Serial.print("dist:");
  Serial.println(distance);
  delay(2000);
}

long microsecondsToCentimeters(long microseconds) {
   return microseconds / 29 / 2;
}
