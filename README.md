# coolstore-ionic1-example-app

This is example mobile application for [Coolstore](https://github.com/jbossdemocentral/coolstore-microservice). You can use your favourite IDE for development and testing.

## Prerequisities

Having Coolstore instance running is a prerequisite to fully excercise the app.
Anoter prerequisite is to have NodeJS (and NPM) installed on your machine. Visit [NodeJS Download page](https://nodejs.org/en/download/) This app was tested with Node v6.11.3, newer versions should be ok to use as well.

[Ioinc v1](http://ionicframework.com/docs/v1/overview/), [AngularJS](https://angularjs.org/), and [Cordova](https://cordova.apache.org/) frameworks were used during development. Follow the documentation of these three frameworks (Ionic and Cordova in particular) to set up an environment for running the app either in emulator or in the browser.

## Target the Coolstore backend

To specify URL for various Coolstore microservices this app talks to change the value in `www/js/config.json` file. User `admin` is used as default when installing Coostore so it is prefilled there. Update as needed. Also replace the `youropenshiftdomain.com` with Openshift domain Coolstore instance is running on.

## Jump start
- clone this repo and `cd` there
- `npm install ionic cordova -g`
- `ionic serve`
- it should open the app in your browser

## Jump start using Ansible

The `ansible` directory contains simple playbook that installs the Ionic, Cordova locally and runs the app in your browser.

- clone this repo and `cd` there
- `ansible-playbook -i ansible/inventoryFile -c local ansible/jump-start.yml`

## Build locally

This is standard Ioinc Cordova application thus there is nothing special to do to build the Android binary (*.apk file).
- `npm install ionic cordova -g`
- `cordova platform add android`
- `cordova prepare android`
- `cordova build android --debug`

It creates `android-debug.apk` file you can download and install on emulator or real device.

# Build Farm a.k.a Aerogear Digger (Optional)

Build Farm is Openshift based piece of software that enables building mobile applications. There is a nice short (~6:30 minutes) [youtube video](https://youtu.be/DxPgJcD6KSY ) on what it is and how to use it. After watching it should be easier for you to follow the next instructions around Build Farm.

## Install Build Farm on Openshift

You can optionally install Build Farm to build the application using [Ansible installer](https://github.com/aerogear/aerogear-digger-installer). See `digger` directory. In there update the `ansible_ssh_user` and set your OpenShift URL in `inventoryfile`. Also update the credentials in `group_vars/OSEv3.yml` file. Once done, you can install the Build Farm on your OpenShift instance by running following commands:
- navigate to root directory of this repository
- `git clone https://github.com/aerogear/aerogear-digger-installer.git`
- `cd digger-installer`
- `ansible-playbook -i ../digger/youropensfhitdomain/inventoryfile sample-build-playbook.yml -e project_name=build-farm -e skip_tls=true -e jenkins_route_protocol=http --skip-tags=provision-osx`

Once installed you should be able to access Jenkins instance that has been created in `build-farm` project. If so you can proceed with using digger Node.js client to create and build your application (see below).

## Install Build Farm on local OpenShift (minishift)

Prerequisite is to have `oc` command line tool installed. It is very similar to installing on Openshift. You create local minishift instance (`oc cluster up`) and install the Build Farm there. Follow the [Kick Start documentation](https://github.com/aerogear/aerogear-digger#kick-start) - just replace the github URL mentioned there with URL of your (this) app.

## Using digger Node.js to build your app

[Digger Node.js client](https://github.com/aerogear/aerogear-digger-node-client) is nodejs jenkins client for Build Farm. To use for building the app follow the [documentation] (https://github.com/aerogear/aerogear-digger#build). To make it easier for you to build this app proceed with following steps
- `npm install -g aerogear-digger-node-client`
- `digger login http://jenkins-build-farm.youropenshiftdomain.com --user=admin --password=password`
-- the Jenkins URL depends on your Build Farm installation
- `digger job create coolstore-ionic1-example-app https://github.com/trepel/coolstore-ionic1-example-app.git master`
-- modify the github URL here (e.g. if you forked this repo or want to build different app)
- `digger job build coolstore-ionic1-example-app`
-- it outputs the build number to be used in subsequent commands, let's say it is `1` for instance
- `digger log coolstore-ionic1-example-app 1`
-- it streams the log, wait till the build finishes
- `digger artifact coolstore-ionic1-example-app 1`
-- it outputs the URL for Android binary (*.apk file) that has been produced by the build
- ``wget --auth-no-challenge --http-user=admin --http-password=password `digger artifact coolstore-ionic1-example-app 1` ``
-- this downloads the Android binary, it can be installed on the emulator or real device
