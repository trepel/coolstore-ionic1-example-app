# coolstore-ionic1-example-app

This is example mobile application for [Coolstore](https://github.com/jbossdemocentral/coolstore-microservice). Having Coolstore instance running is a prerequisite to fully excercise the app.

[Ioinc v1](http://ionicframework.com/docs/v1/overview/), [AngularJS](https://angularjs.org/), and [Cordova](https://cordova.apache.org/) frameworks were used during development. Follow the documentation of these three frameworks (Ionic and Cordova in particular) to set up an environment for running the app either in emulator or in the browser.

## Target the Coolstore backend

To specify URL for various Coolstore microservices this app talks to change the value in `www/js/config.json` file. User `admin` is used as default when installing Coostore so it is prefilled there. Change if required. Also replace the `youropenshiftdomain.com` with Openshift domain Coolstore instance is running on.

Anoter prerequisite is to have NodeJS (and NPM) installed on your machine. Visit [NodeJS Download page](https://nodejs.org/en/download/) This app was tested with Node v6.11.3.

## Jump start
- clone this repo and `cd` there
- `npm install ionic cordova -g`
- `ionic serve`
- it should open your browser with the app running

## Ansible

The `ansible` directory contains simple playbook that installs the Ionic, Cordova locally and runs the app in your browser.

- clone this repo and `cd` there
- `ansible-playbook -i ansible/inventoryFile -c local ansible/jump-start.yml`
