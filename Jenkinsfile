/**
* Cordova Jenkinsfile
*/

//     in RHMAP's case, the following parameters are sent by RHMAP to Jenkins job.
//     this means, the Jenkins job must be a parametrized build with those parameters.
def platform = params?.PLATFORM?.trim()                      // e.g. "ios" or "android"
BUILD_CONFIG = params?.BUILD_CONFIG?.trim()                 // e.g. "Debug" or "Release"
CODE_SIGN_PROFILE_ID = params?.BUILD_CREDENTIAL_ID?.trim()   // e.g. "redhat-dist-dp"
// COOLSTORE_GATEWAY_URL = params?.COOLSTORE_GATEWAY_URL

//     To hardcode values uncomment the lines below
platform = "android"
BUILD_CONFIG = "debug"

// sample values commented below are for https://github.com/feedhenry-templates/sync-cordova-app
/* ------------- use these to hardcode values in Jenkinsfile ---------------- */
PROJECT_NAME = "Coolstore Ionic1 Example App"
CLEAN = true                          // Do a clean build and sign


node(platform) {

    parameters {
        string(name: 'COOLSTORE_GATEWAY_URL', description: 'URL for Coolstore Gateway')
    }

    stage("Checkout") {
        checkout scm
    }

    stage("Configure") {
        String config = '{ "gateway_backend_url": "' + COOLSTORE_GATEWAY_URL + '", "webui_backend_url" : "' + COOLSTORE_GATEWAY_URL.replaceAll('coolstore-gw-', 'web-ui-') + '" }'
        writeFile encoding: 'UTF-8', file: './www/js/config.json', text: config
    }

    stage("Prepare") {
        sh "npm install"
        sh "cordova platform rm ${platform}"
        sh "cordova platform add ${platform}"
        sh "cordova prepare ${platform}"
    }

    stage("Build") {
            if (BUILD_CONFIG == 'debug') {
               sh "cordova build ${platform} --debug"
            } else {
               sh "cordova build ${platform} --release"
            }
    }

    stage("Sign") {
        if (platform == 'android') {
            if (BUILD_CONFIG == 'release') {
                signAndroidApks (
                    keyStoreId: "${params.BUILD_CREDENTIAL_ID}",
                    keyAlias: "${params.BUILD_CREDENTIAL_ALIAS}",
                    apksToSign: "platforms/android/**/*-unsigned.apk",
                    // uncomment the following line to output the signed APK to a separate directory as described above
                    // signedApkMapping: [ $class: UnsignedApkBuilderDirMapping ],
                    // uncomment the following line to output the signed APK as a sibling of the unsigned APK, as described above, or just omit signedApkMapping
                    // you can override these within the script if necessary
                    // androidHome: '/usr/local/Cellar/android-sdk'
                )
            } else {
                println('Debug Build - Using default developer signing key')
            }
        }
        if (platform == 'ios') {
            codeSign(
                profileId: "${CODE_SIGN_PROFILE_ID}",
                clean: CLEAN,
                verify: true,
                appPath: "platforms/ios/build/emulator/${PROJECT_NAME}.app"
            )
        }
    }

    stage("Archive") {
        if (platform == 'android') {
            archiveArtifacts artifacts: "platforms/android/build/outputs/apk/android-${BUILD_CONFIG}.apk", excludes: 'platforms/android/build/outputs/apk/*-unaligned.apk'
        }
        if (platform == 'ios') {
            archiveArtifacts artifacts: "platforms/ios/build/emulator/${PROJECT_NAME}.ipa"
        }
    }
}
