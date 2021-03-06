# coolstore-ionic1-example-app

This is example mobile application for [Coolstore](https://github.com/jbossdemocentral/coolstore-microservice) based on [Ioinc v1](http://ionicframework.com/docs/v1/overview/), [AngularJS](https://angularjs.org/), and [Cordova](https://cordova.apache.org/) frameworks. This app was tested using 64-bit Fedora 26. NodeJS v6.11.3 was used.

## Prerequisities

Having Coolstore instance running is a prerequisite to fully excercise the app. The app only uses Catalog and Cart services thus having just minimal demo running is enough.
Anoter prerequisite is to have NodeJS (and NPM) installed on your machine. Visit [NodeJS Download page](https://nodejs.org/en/download/).

## Target Coolstore backend

To specify URLs for various Coolstore microservices this app talks to change the values in `www/js/config.json` file. The URLs vary based on your OpenShift domain and on whether you provisioned minimal, full installation, or something in between.

## Jump start
- clone this repo and `cd` there
- `npm install ionic cordova -g # global installation of Ionic and Cordova`
- `ionic serve`
- it should open the app in your browser

## Jump start using Ansible

The `ansible` directory contains simple playbook that installs the Ionic, Cordova and runs the app in your browser. The difference using Ansible is that the Cordova and Ionic are installed locally.

- clone this repo and `cd` there
- `ansible-playbook -i ansible/inventoryFile -c local ansible/jump-start.yml`

That is it for the jump start. Optionally, you can continue reading to explore other possibilities like building Android binary (*.apk file) locally, running app in emulator, and using Aerogear Digger for building Android binary in OpenShift.

## Build locally (Optional)

This is standard Ioinc Cordova application thus there is nothing special to do to build the Android binary. Obviously you have to have Android SDK installed on your machine and ANDROID_HOME environment variable properly set. If that is the case just execute following set of commands to build the app.
- `npm install ionic cordova -g`
- `cordova platform add android`
- `cordova prepare android`
- `cordova build android --debug # this requires ANDROID_HOME env variable to point to where Android SDK has been installed; Java SDK; Gradle`

Note you might need to `sudo` some commands. This also applies for the rest of the commands mentioned below. It creates `android-debug.apk` file you can download and install on emulator or real device.

## Automation

You can skip reading following sections and go directly to `automation/python-jenkins` to get things done quickly. Jenkins pipelines that automate many of following steps are there.

### Installing Java

Java is a programming language for Android application. You need Java compiler to build Android applications thus be sure to install Java SDK and not JRE only. For installation visit [download page](http://www.oracle.com/technetwork/java/javase/downloads).

If on Fedora you can execute
- `dnf install java-1.8.0-openjdk`
- `dnf install java-1.8.0-openjdk-devel`

### Installing Gradle

Android applications uses Gradle for dependency management and building the apps. Follow the [installation instructions](https://gradle.org/install/).

If on Fedora you can execute
- `dnf install gradle`

### Android Studio installation

If you don't have Android SDK installed you have several options on how to proceed. If you want to install full package of various Android tools (IDE, SDK tools, build tools, emulator etc.) consider installing [Android Studio](https://developer.android.com/studio/index.html). Just click on the link and follow the instructions specific for your operating system. Note that for 64-bit Fedora you have to have some 32-bit libraries installed. It is mentioned at the bottom of the instruction page but it is better to do it as the very first step so that installation finishes without errors.
- `dnf install zlib.i686 ncurses-libs.i686 bzip2-libs.i686`

Once installation completes set ANDROID_HOME environment variable to point to the directory where Android SDK has been installed. If you have Android Studio already installed but you don't know the location of Android SDK, open Android Studio and navigate to File -> Settings -> Appearance & Behaviour -> System Settings -> Android SDK.

### androidctl command line utility

Another option to install Android SDK is to use [androidctl](https://github.com/aerogear/androidctl) by Aerogear. The reprequisite here is to have [Python](https://www.python.org/) installed. Tested with 2.7.13 version.
- `export ANDROID_HOME=/path/to/where/to/install/Android/SDK`
- `pip install https://github.com/aerogear/androidctl/archive/0.1.0.zip`
- `androidctl sdk install`
- `git clone https://github.com/aerogear/androidctl.git`
- `androidctl sync androidctl/examples/android.cfg`
- it asks you to accept the license, just type 'y' and press Enter key and be patient, it takes a while but outputs nothing.

### Using Android Emulator

No matter if you installed Android Studio or if you used androidctl utility you should have Android SDK installed at $ANDROID_HOME location. To run the emulator do the following
- `cd $ANDROID_HOME/emulator`
- `./emulator -list-avds # outputs available avds, something like 'Nexus_5_API_25'`
- `./emulator -avd Nexus_5_API_25 # or other value outputted by previous command`

If you don't have any AVD (Android Virtual Device) configured you have to create it first. You can do it via [Android Studio](https://developer.android.com/studio/run/managing-avds.html) or running following commands
- `cd $ANDROID_HOME`
- `./tools/bin/sdkmanager "system-images;android-26;google_apis;x86"`
- `./tools/bin/avdmanager create avd --name testAVD --package "system-images;android-26;google_apis;x86" --force`
- `./emulator/emulator -avd testAVD`

To install your .apk file to the emulator do the following
- `cd $ANDROID_HOME/platform-tools`
- `./adb install path/to/apk/file`
    - e.g  `/platforms/android/build/outputs/apk/android-debug.apk if you build it locally`

## Build Farm a.k.a Aerogear Digger (Optional)

Aerogear Digger is Openshift based piece of software that enables building mobile applications. There is a nice short (~6:30 minutes) [youtube video](https://youtu.be/DxPgJcD6KSY) on what it is and how to use it. It uses `oc cluster up` to have Digger running locally. You don't have to watch it but if you do you might find it easier to follow the instructions below.

### Install Digger on Openshift

You can install Digger to build the application using [Ansible installer](https://github.com/aerogear/aerogear-digger-installer). See `digger` directory in this repository. In there update the `ansible_ssh_user` and set your OpenShift URL in `inventoryfile`. Also update the credentials in `group_vars/OSEv3.yml` file. Once done, you can install the Digger on your OpenShift instance by following:
- navigate to root directory of this repository
- update the information about your openshift cluster in files inside `./digger` directory
- `git clone https://github.com/aerogear/aerogear-digger-installer.git`
    - for simplicity execute this command in root directory of this repository or update the relative path below accordingly
- `cd aerogear-digger-installer`
- `ansible-playbook -i ../digger/youropensfhitdomain/inventoryfile sample-build-playbook.yml -e project_name=aerogear-digger -e skip_tls=true -e jenkins_route_protocol=http -e add_public_key_automatically=true --tags=deploy`

Once installed you should be able to access Jenkins instance that has been created in `aerogear-digger` project. If so you can proceed with using [Digger Node.js client](https://github.com/aerogear/aerogear-digger-node-client) to create and build your application (see below).

### Install Digger on local OpenShift (minishift)

Prerequisite is to have `oc` command line tool installed. It is very similar to installing on Openshift. You create local minishift instance (`oc cluster up`) and install the Digger there. Follow the [Kick Start documentation](https://github.com/aerogear/aerogear-digger#kick-start) - just replace the github URL mentioned there with URL of your (this) app. The aformentioned [youtube video](https://youtu.be/DxPgJcD6KSY) shows the process too.

### Using digger Node.js to build your app

[Digger Node.js client](https://github.com/aerogear/aerogear-digger-node-client) is nodejs jenkins client for Digger. To use for building the app follow the [documentation](https://github.com/aerogear/aerogear-digger#build). To make it easier for you to build this app proceed with following steps
- `npm install -g aerogear-digger-node-client`
- `digger login http://jenkins-aerogear-digger.youropenshiftdomain.com admin password`
  - the Jenkins URL depends on your Digger installation
- `digger job create coolstore-ionic1-example-app https://github.com/trepel/coolstore-ionic1-example-app.git master`
  - modify the github URL here (e.g. if you forked this repo or want to build different app)
- `digger job build coolstore-ionic1-example-app`
  - it outputs the build number to be used in subsequent commands, let's say it is `1` for instance
- `digger log coolstore-ionic1-example-app 1`
  - it streams the log, wait till the build finishes
- `digger artifact coolstore-ionic1-example-app 1`
  - it outputs the URL for Android binary (*.apk file) that has been produced by the build
- ``wget --auth-no-challenge --http-user=admin --http-password=password `digger artifact coolstore-ionic1-example-app 1` ``
  - this downloads the Android binary, it can be installed on the emulator or real device

### Creation of build job manually

If you are not willing to use Digger NodeJS client, you might want to use [Digger Java Client](https://github.com/aerogear/aerogear-digger-java-client). Or you can create the job manually as follows
- navigate your browser to Digger Jenkins instance
  - example URL: `http://jenkins-aerogear-digger.youropenshiftdomain.com`
- login using `admin` as username and `password` as password
- click on 'New Item' link
- enter nane of the job
- select the job to be of 'Pipeline' type
- this redirects you to configuration, select 'Pipeline script from SCM'
- select 'Git' as SCM
- fill in github URL of your repo in 'Repository URL' input field
  - `https://github.com/trepel/coolstore-ionic1-example-app.git`
- fill in 'Branch Specifier', e.g. `refs/heads/master`
- press 'Save' button
- click on 'Build Now' link
- once build finishes you can download the android-debug.apk file the build has produced

