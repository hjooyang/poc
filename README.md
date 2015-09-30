** To install MQA on your device

https://developer.ibm.com/mobilefirstplatform/documentation/getting-started-7-1/quality-assurance/
https://developer.ibm.com/mobilefirstplatform/documentation/getting-started-8-0/quality-assurance/cordova/

Installing Libraries


Navigate to the directory that contains your app project files.

	cd lina-poc-client

Add the Mobile Quality Assurance plug-in to your Cordova project by completing the following steps:
1. Enter the following command to install the MQA plugin:
	cordova plugin add CordovaPlugin-3.0.12

Where plugin_location is the path to the directory of the extracted Mobile Quality Assurance plugin that you downloaded.

2. Enter the following command to install the required device plugin:

cordova plugin add cordova-plugin-device
