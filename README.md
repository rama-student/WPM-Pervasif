# Wireless Power Meter

## Table of Contents
1. [How WPM Works](#how-wpm-works)
1. [Core Components](#core-components)
   1. [Relay](#5-volt-relay)
   1. [ESP32](#esp32-devkit-v1)
   1. [ACS712](#acs712-30a)
   1. [ZMPT101b](#zmpt101b)
   1. [Hi-Link HLK-5M05](Hi-Link-HLK-5M05)
1. [Getting started with WPM device](#getting-started-with-wpm-device)
1. [Getting started with WPM Website](#getting-started-with-wpm-website)
1. [WPM Website](#wpm-website-dashboard)

## List of images
List Of Images | Description
------------ | -------------
[Figure 1](#Figure-1) | Schematics
[Figure 2](#Figure-2) | ESP32
[Figure 3](#Figure-3) | ZMPT101b
[Figure 4](#Figure-4) | ACS712 30A
[Figure 5](#Figure-5) | 5V Relay
[Figure 6](#Figure-6) | Hi-Link 5M05 Power Module
[Figure 7](#Figure-7) | Website Homepage

## How WPM Works
<a id="Figure-1">![Schematic Image](/images/Schematic.jpg)</a>
<p align="center">Figure 1. Schematic</p>

## Core Components

### ESP32-DEVKIT-V1
ESP32 from Espressif is our main microcontroller unit (MCU). 
This controller is easy to program and have all of features we need and more, most important being Wi-Fi.
<br>
<p align="center">
   <img align="center" id="Figure-2" src="/images/esp32.png" width="250" />
</p>
<p align="center">Figure 2. ESP32-Devkit-V1 </p>

### ZMPT101b
ZMPT101b returns output voltage to MCU.
<br>
<p align="center">
   <img id="Figure-3" src="/images/zmpt101b.jpg" width="250" />
</p>
<p align="center">Figure 3. ZMPT101b </p>

### ACS712 30A
ACS712 is a Hall Effect-Based Linear Current Sensor that reports AC Current used by output device and reports to MCU.
<br>
<p align="center">
   <img id="Figure-4" src="/images/acs712.jpg" width="250" />
</p>
<p align="center">Figure 4. ACS712 30A </p>

### 5 Volt Relay
We use 1 channel 5v relay to control the electricity flow from AC source to output plug.
<p align="center">
   <img id="Figure-5" src="/images/relay.jpg" width="250" />
</p>
<p align="center">Figure 5. 5V Relay </p>

### Hi-Link HLK-5M05
HLK-5M05 is a power supply module that converts 100-240Vac to 5 Volts and 1000mA DC.
<br>
<p align="center">
   <img id="Figure-6" src="/images/hilink-studio.jpg" width="250" />
</p>
<p align="center">Figure 6. Hi-Link HLK-5M05 </p>

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

## WPM Website (Dashboard)
<a id="Figure-7">![Homepage](/images/homepageplaceholder.png)</a>
<p align="center">Figure 7. Homepage after login</p>
