pipeline {
    agent any
    
    tools {
        nodejs "16.14.0"
    }

    stages {
        
        //stage("Clone Repository") {
        //    steps {
        //        git branch: "main", url: "https://github.com/latam-03-at/converter-service"
        //    }
        //}
        
        stage('Pre-requirements') {
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
                    def scannerHome = tool 'mysonarq'
                    def scannerParameters = "-Dsonar.projectName=convert_ci " +
                        "-Dsonar.projectKey=convert_ci -Dsonar.sources=. "+
                        "-Dsonar.javascript.lcov.reportPaths=${WORKSPACE}/coverage/lcov.info"
                    withSonarQubeEnv('sonarat') {
                        sh "${scannerHome}/bin/sonar-scanner ${scannerParameters}"
                    }
                }
                
            }
        }
        
    }
}