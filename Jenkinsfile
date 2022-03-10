pipeline {
    agent any
    
    tools {
        nodejs "16.14.0"
    }

    stages {
        
        stage("Pre-requirements") {
            steps {
                sh "curl http://localhost:8001/repository/converter_media_content/converter_files/test_files.zip --output ${WORKSPACE}/__test__/test_files.zip"
                sh "cd __test__/; yes | unzip test_files.zip"
            }
        }
        
        stage("Build") {
            steps {
                sh "npm install"
            }
        }
        
        stage("Tests") {
            steps {
                sh "npm test"
            }
        }
        
        stage ("Sonarqube analysis") {
            steps{
                script{
                    def scannerHome = tool "gtc_sonar_daof"
                    def scannerParameters = 
                        "-Dsonar.projectName=converter_ci " +
                        "-Dsonar.projectKey=converter_ci " +
                        "-Dsonar.sources=. " +
                        "-Dsonar.javascript.lcov.reportPaths=${WORKSPACE}/coverage/lcov.info"
                    withSonarQubeEnv('server_sonar_daof') {
                        sh "${scannerHome}/bin/sonar-scanner ${scannerParameters}"
                    }
                }
            }
        }
        
        stage("Quality Gate"){
            steps{
                script{
                    timeout(time: 1, unit: "HOURS") { 
                        def qg = waitForQualityGate() 
                        if (qg.status != "OK") {
                            error "Pipeline aborted due to quality gate failure: ${qg.status}"
                        }
                    }
                }
            }
        }
        
    }
}