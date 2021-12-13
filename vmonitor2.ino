#include <WiFi.h>;
#include <AWS_IOT.h>;
#include <ArduinoJson.h>
#include <EmonLib.h>
EnergyMonitor emon1;     // Create an instance
int touchvalue;

#define WIFI_SSID "HUAWEI-U3uy" // SSID of your WIFI
#define WIFI_PASSWD "Limaes01" //your wifi password

#define CLIENT_ID "WPMdata"// thing unique ID, this id should be unique among all things associated with your AWS account.
#define MQTT_TOPIC_DATAS "$aws/things/wpmbroker/shadow/name/datas" //topic for the MQTT data

#define AWS_HOST "a2hssfdpz59n4-ats.iot.ap-southeast-1.amazonaws.com" // your host for uploading data to AWS,


AWS_IOT aws;

void setup(){
  Serial.begin(9600);
  Serial.print("\n  Initializing WIFI: Connecting to ");
  Serial.println(WIFI_SSID);
  WiFi.begin(WIFI_SSID, WIFI_PASSWD);
  Serial.print("  ");
  while(WiFi.status() != WL_CONNECTED){
    Serial.print(".");
    delay(500);
  }
  Serial.println("\n  Connected.\n  Done");
  Serial.println("  Done.");
  Serial.println("\n  Initializing connetction to AWS....");
  if(aws.connect(AWS_HOST, CLIENT_ID) == 0){ // connects to host and returns 0 upon success
    Serial.println("  Connected to AWS\n  Done.");
  }
  else {
    Serial.println("  Connection failed!\n make sure your subscription to MQTT in the test page");
  }
  Serial.println("  Done.\n\nDone.\n");
  
  pinMode(19, OUTPUT);
  emon1.voltage(35, 99, 1.7);  // Voltage: input pin, calibration, phase_shift
  emon1.current(34, 3);       // Current: input pin, calibration.
}
void loop(){
  // read datas
  emon1.calcVI(20,1000);         // Calculate all. No.of half wavelengths (crossings), time-out
  emon1.serialprint();           // Print out all variables (realpower, apparent power, Vrms, Irms, power factor)
  
  float realPower       = emon1.realPower;        //extract Real Power into variable
  float apparentPower   = emon1.apparentPower;    //extract Apparent Power into variable
  float powerFActor     = emon1.powerFactor;      //extract Power Factor into Variable
  float supplyVoltage   = emon1.Vrms;             //extract Vrms into Variable
  float Irms            = emon1.Irms;             //extract Irms into Variable
  // check whether reading was successful or not
  if(supplyVoltage == NAN || Irms == NAN){ // NAN means no available data
    Serial.println("Reading failed.");
  }
  else{
    //create string payload for publishing

    DynamicJsonDocument doc(1024);

    doc["deviceID"] = WiFi.macAddress();
    doc["sensor"] = "WPM";
    doc["volt"] = supplyVoltage;
    doc["curr"] = Irms;
    doc["power"] = realPower;
    doc["timestamp"] = 0;

    char datas[256];
    serializeJson(doc, datas);
    Serial.print("Device ID: ");
    Serial.println(WiFi.macAddress());
    Serial.println("Publishing:- ");
     if(aws.publish(MQTT_TOPIC_DATAS, datas) == 0){// publishes payload and returns 0 upon success
      Serial.println("Send Success\n");
    }
    else{
      Serial.println("Send Failed!\n");
    }
    
  }touchvalue = touchRead(T0);
  Serial.println(touchvalue);
  if(touchvalue < 30){
    digitalWrite(19, HIGH);
  }
  else {
  digitalWrite(19, LOW);
  }
  delay(1000);
}
