# Automation using pyton-jenkins

## How to create pipeline jobs

Assuming you have [Python](https://www.python.org) installed, you have to install [python-jenkins](https://python-jenkins.readthedocs.io/en/latest/index.html) too. Then you can use the script to create pipeline jobs based on the xml definitions. Tested with Python 2.7.14, and python-jenkins 1.0.1-dev1.

`PYTHONHTTPSVERIFY=0 python create-jobs.py <jenkins-url> <jenkins-user-id> <jenkins-user-api-token>`

If there is no Jenkins instance installed on target OSCP cluster, it can be easily done via oc tool, see [OSCP documentation](https://docs.openshift.com/container-platform/3.7/dev_guide/dev_tutorials/openshift_pipeline.html#creating-the-jenkins-master) for details:
`oc new-project your-jenkins-project-name`
`oc new-app jenkins-persistent`

See [this Stack Overflow question](https://stackoverflow.com/questions/45466090/how-to-get-the-api-token-for-jenkins) for details on how to get User ID and API Token.

## How to use pipeline jobs

After pipelie jobs are successfully created, trigger 'Configure Jenkins' pipeline first. Correction of some plugin versions and restart of Jenkins might be required afterwards. Then continue by deploying Aerogear Digger and Coolstore MSA - order does not matter here. As a last step trigger 'Build Coolstore Mobile App'.

Android binary (.apk) is stored in Jenkins as Last Successful Artifact. You can download it and install on physical device or emulator.

## Troubleshooting

### Jenkins Plugin Updates/Installations

'Configure Jenkins' pipeline installs [Credentials Binding Plugin](https://wiki.jenkins.io/display/JENKINS/Credentials+Binding+Plugin) if not installed yet. It is possible that it will require restart of Jenkins and/or updates of various dependency plugins. For instance [Structs Plugin](https://wiki.jenkins.io/display/JENKINS/Structs+plugin) and [Pipeline Step API Plugin](https://wiki.jenkins.io/display/JENKINS/Pipeline+Step+API+Plugin) need to be updated if using OSCP 3.7.
