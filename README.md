# Geo Tracker
Geo Tracker is a mobile application built for recording activities. Built by Vaibhav Ekambaram for SWEN325 Assignment 3.

## Installation and Runtime Instructions

GeoTracker is built using the Ionic platform on top of React. In order to run the application,
several prerequisites are required.

The project directory can be cloned using git from the following link: <br>
```git clone https://gitlab.ecs.vuw.ac.nz/course-work/swen325/2021/assignment2/ekambavaib/swen325-assignment-3```
<br> Once cloned, switch to the project folder by changing directory to `swen325-assignment-3`
<br> ```cd swen325-assignment3```

### Prerequisites

**Node JS**: The Node JS Javascript runtime is required before setting up this development environment. The installation
instructions differ depending on what operating system you are using, but the download link can be found
here: https://nodejs.org/en/. <br>
After installation of Node JS is complete, you can verify it is working as intended by running the
command ```npm -version```


**Ionic CLI**: Ionic is the framework which is used for this application. 
<br>
To install Ionic and its associated command line tools, Node is required to be installed.
<br>
Ionic can be installed globally using the command ```npm install -g @ionic/cli```
<br>
The version of Ionic installed can then be verified using the command ```ionic --version```

### Retrieve Libraries

We need to retrieve the various libraries used by the project, as they are not stored in the repository. All required
packages can be installed using the command:
<br>```npm i``` or ```npm install``` (These do exactly the same thing.)

### Start development server

The development server can be started with:
<br> ```ionic serve``` <br>
This will result in the application being run in Web mode using the default web browser of the development device.

### Deploy to device
To deploy the application on an Android Device, the command ```ionic capacitor build android``` can be used to deploy the application.
<br> Doing this requires Android Studio to be installed on the development device, as well as USB debugging enabled on the device. 
<br> The application may also be live loaded on a device using ```ionic capacitor run android -l --external```
