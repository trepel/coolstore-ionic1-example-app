# coolstore-ionic1-example-app

This is example mobile application for [Coolstore](https://github.com/jbossdemocentral/coolstore-microservice). Based on [Ioinc v1](http://ionicframework.com/docs/v1/overview/), [AngularJS](https://angularjs.org/), and [Cordova](https://cordova.apache.org/).

Follow the documentation of these three frameworks (Ionic and Cordova in particular) to set up an environment for running the app either in emulator or in the browser.

## Target the Coolstore backend

To specify URLs for various Coolstore microservices this app talks to change the values in `www/js/app.js` file.

Visit [NodeJS Download page](https://nodejs.org/en/download/) if you don't have `npm` installed.

## Jump start
- clone this repo and `cd` there
- `npm install ionic cordova -g`
- `ionic serve`
- it should open your browser with the app running

## Ansible

The `ansible` directory contains simple playbook that installs the Ionic, Cordova locally and runs the app in your browser. 

- clone this repo and `cd` there
- `ansible-playbook -i ansible/inventoryFile -c local ansible/jump-start.yml`
