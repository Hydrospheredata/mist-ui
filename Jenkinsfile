def currentVersion() {
    def version = sh(returnStdout: true, script: 'cat package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[",]//g' | tr -d '[[:space:]]'').trim()
    return version
}

def changeVersion(version) {
    sh "sed -i  's/"version":.*/"version": "${version}",/' package.json"
}

def calculateReleaseVersion(currentVersion) {
    int index = currentVersion.lastIndexOf('.')
    String minor = currentVersion.substring(index + 1)
    int m = minor.toInteger() + 1
    return currentVersion.substring(0, index + 1) + m 
}


def checkoutSource(gitCredentialId, organization, repository) {
    withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: gitCredentialId, usernameVariable: 'GIT_USERNAME', passwordVariable: 'GIT_PASSWORD']]) {
        git url: "https://github.com/${organization}/${repository}.git", branch: env.BRANCH_NAME, credentialsId: gitCredentialId
        sh """
            git config --global push.default simple
            git config --global user.name '${GIT_USERNAME}'
            git config --global user.email '${GIT_USERNAME}'
        """
    }
}

def pushSource(gitCredentialId, organization, repository, pushCommand) {
    withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: gitCredentialId, usernameVariable: 'GIT_USERNAME', passwordVariable: 'GIT_PASSWORD']]) {
        sh "git push https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/${organization}/${repository}.git ${pushCommand}"
    }
}

def isReleaseJob() {
    return "release".equalsIgnoreCase(env.BRANCH_NAME)
}

def generateTagComment(releaseVersion){
    commitsList=sh(returnStdout: true, script: "git log --pretty=\"%B\n\r (%an)\" -1").trim()
    return "${commitsList}"
}

def createReleaseInGithub(gitCredentialId, organization, repository, releaseVersion, message){
   bodyMessage=message.replaceAll("\n","<br />").replace("\r", "")
   withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: gitCredentialId, usernameVariable: 'GIT_USERNAME', passwordVariable: 'GIT_PASSWORD']]) {
        def request = """
            {
                "tag_name": "${releaseVersion}",
                "name": "${releaseVersion}",
                "body": "${bodyMessage}",
                "draft": false,
                "prerelease": false
            }
        """
        echo request
        def response = httpRequest consoleLogResponseBody: true, acceptType: 'APPLICATION_JSON', contentType: 'APPLICATION_JSON', httpMode: 'POST', requestBody: request, url: "https://api.github.com/repos/${organization}/${repository}/releases?access_token=${GIT_PASSWORD}"
        return response.content
   }
}

def uploadRelease(gitCredentialId, organization, repository, releaseVersion, releaseId, releaseFile){
  withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: gitCredentialId, usernameVariable: 'GIT_USERNAME', passwordVariable: 'GIT_PASSWORD']]) {
    sh """curl --data-binary @"${releaseFile}" -H "Authorization: token ${GIT_PASSWORD}" -H "Content-Type: application/zip" https://uploads.github.com/repos/${organization}/${repository}/releases/${releaseId}/assets?name=release-${releaseVersion}.zip"""
   }
}

node("JenkinsOnDemand") {
    def repository = 'mist-ui'
    def organization = 'Hydrospheredata'
    def gitCredentialId = 'HydrospheredataGithubAccessKey'


    stage('Checkout') {
        deleteDir()
        checkoutSource(gitCredentialId, organization, repository)
    }

    if (isReleaseJob()) {
        stage('Set release version') {
            def curVersion = currentVersion()
            def nextVersion=calculateReleaseVersion(curVersion)
            changeVersion(nextVersion)
        }
    }

    stage('Build') {
        def curVersion = currentVersion()
        sh "npm install"
        sh "npm run build-prod-tar"
    }

    stage('Test') {
       // sh "./node_modules/.bin/ng test --browsers=\"ChromeNoSandboxHeadless\" --code-coverage --single-run"
    }
    if (isReleaseJob()) {
        //if (currentBuild.result == 'UNSTABLE') {
        //    currentBuild.result = 'FAILURE'
        //    error("Errors in tests")
        //}

        stage("Publish"){
            def curVersion = currentVersion()
            tagComment=generateTagComment(curVersion)
            sh "git commit -m 'Releasing ${curVersion}' -- version"
            sh "git tag -a ${curVersion} -m '${tagComment}'"

            sh "git checkout master"


            pushSource(gitCredentialId, organization, repository, "")
            pushSource(gitCredentialId, organization, repository, "refs/tags/${curVersion}")
            def releaseInfo=createReleaseInGithub(gitCredentialId, organization, repository,curVersion,tagComment)
            def props = readJSON text: "${releaseInfo}"
            def releaseFile="mist-ui-${curVersion}.tar.gz"
            uploadRelease(gitCredentialId, organization, repository, curVersion, props.id, releaseFile)
        }
    } 
}
