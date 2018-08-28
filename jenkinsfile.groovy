def isReleaseJob() {
    return "true".equalsIgnoreCase(env.IS_RELEASE_JOB)
}

node("JenkinsOnDemand") {
    
    def repository = 'mist-ui'

    stage("Checkout") {
        autoCheckout(repository)
    }

    stage('Set release version') {
        def curVersion = getVersion()
        def releaseVersion = mapVersionToRelease(curVersion)
        sh "git checkout -b release_temp"
        setVersion(releaseVersion)
    }

    stage("Build") {
        sh "npm install"
        sh "npm run build-prod-tar"
    }

    if (currentBuild.result == 'UNSTABLE') {
        currentBuild.result = 'FAILURE'
        error("Errors in tests")
    }

    if (isReleaseJob()) {

        stage("Create GitHub Release"){
            def curVersion = getVersion()
            def tagComment = generateTagComment()

            sh "git commit -a -m 'Releasing ${curVersion}'"

            writeFile file: "/tmp/tagMessage${curVersion}", text: tagComment
            sh "git tag -a ${curVersion} --file /tmp/tagMessage${curVersion}"
            sh "git checkout ${env.BRANCH_NAME}"

            def nextVersion = mapReleaseVersionToNextDev(curVersion)
            setVersion(nextVersion)
            sh "git commit -a -m 'Development version increased: ${nextVersion}'"

            pushSource(repository)
            pushSource(repository, "refs/tags/${curVersion}")
            def releaseInfo = createReleaseInGithub(curVersion, tagComment, repository)
            
            def props = readJSON text: "${releaseInfo}"
            zip archive: true, dir: "${repository}", glob: "", zipFile: "release-${props.name}.zip"
            def releaseFile = "release-${props.name}.zip"

            uploadFilesToGithub(props.id, releaseFile, releaseFile, repository)

        }

    }
}
