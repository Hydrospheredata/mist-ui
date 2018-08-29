def getVersion() {
  def describe = sh(returnStdout: true, script: "git describe").trim()
  if (describe ==~ /^v\d+.\d+.\d+(-RC\d+)?/)
    body(describe.replace("v", ""))
}

node("JenkinsOnDemand") {
    
    stage("Checkout") {
        checkout([
            $class: 'GitSCM',
            branches: scm.branches,
            doGenerateSubmoduleConfigurations: scm.doGenerateSubmoduleConfigurations,
            extensions: [[$class: 'CloneOption', noTags: false, shallow: false, depth: 0, reference: '']],
            userRemoteConfigs: scm.userRemoteConfigs,
       ])
    }

    stage("Build") {
        sh "npm install"
        sh "npm run build-prod-tar"
    }

    if (currentBuild.result == 'UNSTABLE') {
        currentBuild.result = 'FAILURE'
        error("Errors in tests")
    }

    stage("Create GitHub Release") {
        def curVersion = getVersion()

        echo scm.dump()
        echo "Release!"
        //def releaseInfo = createReleaseInGithub(curVersion, curVersion, repository)
        //def props = readJSON text: "${releaseInfo}"
        //def releaseFile = "mist-ui-${curVersion}.tar.gz"
        //uploadFilesToGithub(props.id, releaseFile, releaseFile, repository)
    }
}
