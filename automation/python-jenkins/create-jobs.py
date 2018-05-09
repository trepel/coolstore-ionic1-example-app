import jenkins
import sys

server = jenkins.Jenkins(sys.argv[1], username=sys.argv[2], password=sys.argv[3])

file = open('./BuildCoolstoreMobileAppJob.xml', 'r')
xmlConfig = file.read()
server.create_job('Build Coolstore Mobile App', xmlConfig)

file = open('./ConfigureJenkinsJob.xml', 'r')
xmlConfig = file.read()
server.create_job('Configure Jenkins', xmlConfig)

file = open('./DeployAerogearDiggerJob.xml', 'r')
xmlConfig = file.read()
server.create_job('Deploy Aerogear Digger', xmlConfig)

file = open('./DeployCoolstoreMSAJob.xml', 'r')
xmlConfig = file.read()
server.create_job('Deploy Coolstore MSA', xmlConfig)
