def getVersion() {
  def describe = sh(returnStdout: true, script: "git describe").trim()
  if (describe ==~ /^v\d+.\d+.\d+(-RC\d+)?/)
    body(describe.replace("v", ""))
}

pipeline {
    agent { label 'JenkinsOnDemand' }

    def repository = 'mist-ui'

    stages {

        stage("Checkout") {
            autoCheckout(repository)
        }

        stage("Build") {
            sh "npm install"
            sh "npm run build-prod-tar"
        }

        if (currentBuild.result == 'UNSTABLE') {
            currentBuild.result = 'FAILURE'
            error("Errors in tests")
        }

        stage("Create GitHub Release"){
            when { tag "v*" }
            def curVersion = getVersion()
            def tagComment = generateTagComment()

            def releaseInfo = createReleaseInGithub(curVersion, tagComment, repository)
            def props = readJSON text: "${releaseInfo}"
            zip archive: true, dir: "${repository}", glob: "", zipFile: "release-${props.name}.zip"
            def releaseFile = "release-${props.name}.zip"
            uploadFilesToGithub(props.id, releaseFile, releaseFile, repository)
        }
    }
}
