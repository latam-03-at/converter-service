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
                    def scannerHome = tool 'gtc_sonar_stoh'
                    def scannerParameters = "-Dsonar.projectName=convert_ci " +
                        "-Dsonar.projectKey=convert_ci -Dsonar.sources=. "+
                        "-Dsonar.javascript.lcov.reportPaths=${WORKSPACE}/coverage/lcov.info"
                    withSonarQubeEnv('server_sonar_stoh') {
                        sh "${scannerHome}/bin/sonar-scanner ${scannerParameters}"
                    }
                }
                
            }
        }

        stage("Quality Gate"){
            steps{
                waitForQualityGate abortPipeline: true
                //script{
                    //timeout(time: 1, unit: "HOURS") { 
                        //def qg = waitForQualityGate() 
                        //if (qg.status != "OK") {
                        //    error "Pipeline aborted due to quality gate failure: ${qg.status}"
                        //}
                    //}
                //}
            }
        }
        stage("Push to Docker Hub") {
            environment {
                DOCKERHUB_KEY = credentials("stoh_dockerhub")
        	}
            
			steps {
				sh "echo $DOCKERHUB_KEY_PSW | docker login -u $DOCKERHUB_KEY_USR --password-stdin"
				sh "docker build --network=comvertnet -t stospina/image-converter:${BUILD_NUMBER} ."
			    sh "docker push stospina/image-converter:${BUILD_NUMBER}"
			}

			post {
			    always {
			        sh 'docker logout'
			    }
			}
		}
    }
}