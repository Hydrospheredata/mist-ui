def isRelease() {
  return env.IS_RELEASE_JOB == "true"
}

def version() {
  return sh(returnStdout: true, script: "node -p \"require('./package.json').version\"").trim()
}

def onRelease(Closure body) {
    if (isRelease()) {
      body(version())
    }
}

node("JenkinsOnDemand") {
    def organization = 'Hydrospheredata'
    def repository = 'mist-ui'
    def accessTokenId = 'HydroRobot_AccessToken' 
    
    stage("Checkout") {
        def branches = (isRelease()) ? [[name: env.BRANCH_NAME]] : scm.branches
        checkout([
            $class: 'GitSCM',
            branches: branches,
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

    onRelease { version ->
      stage("Create GitHub Release") {
          echo "Release ${version}"
          def releaseFile = "mist-ui-${version}.tar.gz"

          withCredentials([[
              $class: 'UsernamePasswordMultiBinding',
              credentialsId: accessTokenId,
              usernameVariable: 'GIT_USERNAME',
              passwordVariable: 'GIT_PASSWORD']]) {

              def request = """
                  {
                      "tag_name": "v${version}",
                      "name": "${version}",
                      "body": "${version}",
                      "draft": false,
                      "prerelease": false
                  }
              """
              echo request
              def response = httpRequest consoleLogResponseBody: true, acceptType: 'APPLICATION_JSON', contentType: 'APPLICATION_JSON', httpMode: 'POST', requestBody: request, url: "https://api.github.com/repos/${organization}/${repository}/releases?access_token=${GIT_PASSWORD}"
              def releaseInfo = response.content
              def props = readJSON text: "${releaseInfo}"
              def releaseId = props.id
              sh """curl --data-binary @"${releaseFile}" -H "Authorization: token ${
                  GIT_PASSWORD
              }" -H "Content-Type: application/zip" https://uploads.github.com/repos/${organization}/${repository}/releases/${
                  releaseId
              }/assets?name=${releaseFile}"""
          }
      }
    }
}
