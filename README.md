# Wireless Power Meter

## Table of Contents
1. [How WPM Works](#how-wpm-works)
1. [Core Components](#core-components)
   1. [Relay](#5-volt-relay)
   1. [ESP32](#esp32-devkit-v1)
   1. [ACS712](#acs712)
   1. [ZMPT101b](#zmpt101b)
   1. [Hi-Link HLK-5M05](#HLK-5M05)
1. [Getting started with WPM device](#getting-started-with-wpm-device)

## List of images
List Of Images | Description
------------ | -------------
[Figure 1](#figure-1) | Schematics
[Figure 2](#figure-2) | Relay, ESP32, ACS712, ZMPT101b
[Figure 3](#figure-3) | Hi-Link 5M05 Power Module
[Figure 4](#figure-4) | Website Homepage

## How WPM Works
<a id="Figure-1">![Schematic Image](/images/Schematic.jpg)</a>
<p align="center">Figure 1. Schematic</p>

## Core Components
<a id="Figure-2">![Relay, ESP32, ACS712, ZMPT101b](/images/Relay-ESP-ACS-ZMPT.png)</a>
<p align="center">Figure 2. from left: 5V Relay, ESP32-Devkit-V1, ACS712 Current Sensor, ZMPT101b Voltage Sensor</p>

<a id="Figure-3">![Power Module: Hi-Link HLK-5M05](/images/hilink.png)</a>
<p align="center">Figure 3. Hi-Link HLK-5M05</p>

### 5 Volt Relay
We use 1 channel 5v relay to control the electricity flow from AC source to output plug.

### ESP32-DEVKIT-V1
ESP32 from Espressif is our main microcontroller unit (MCU). 
This controller is easy to program and have all of features we need and more, most important being Wi-Fi.

### ACS712 
ACS712 is a Hall Effect-Based Linear Current Sensor that reports AC Current used by output device and reports to MCU.

### ZMPT101b
ZMPT101b returns output voltage to MCU.

### Hi-Link HLK-5M05
HLK-5M05 is a power supply module that converts 100-240Vac to 5 Volts and 1000mA DC.

## Getting started with WPM device
- Prepare all the component needed
  - ESP32-DEVKIT-V1
  - ACS712
  - ZMPT101b
  - Hi-Link HLK-5M05
  - 5 Volt Relay
  - Male to Male jumper
  - Male to Female jumper
  - Jumper clip
- Assemble all the component as shown in Figure.1
- Copy and paste all code in blablabla.c to the ArduinoIDE
- In the ArduinoIDE change the WiFi SSID & password to your WiFi SSID & Password
- Compile the program
- Check serial monitor to make sure everything is working correctly

## Getting started with WPM Website
- Go to [WPM Website](https://wpmumn.herokuapp.com/).
- Click **Don't have an account? Sign Up**
- Enter your account information
- Click **Sign Up**
- You will see a message confirming that your account is successfully created
> Berhasil mendaftar
- You can proceed to login with your email and password
- Because it's the first time you log in, you need to enter your WPM's MAC Address
- To get your device MAC Address, simply plug your ESP32 to your PC and it should be in the serial monitor
- If everthing inserted correctly, You should be able to monitor your devices now as shown in figure n.
- Next time, just log in with the account you have just made.

## WPM Website
<a id="Figure-4">![Homepage](/images/homepageplaceholder.png)</a>
<p align="center">Figure 4. Homepage after login</p>
