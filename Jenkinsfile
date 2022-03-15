pipeline {
    agent any
    
    tools {
        nodejs "16.14.0"
    }
    
    environment {
        IMAGE_NAME      = "dilanof/converter-service:${BUILD_NUMBER}"
        SERVER_DEV      = "calebespinoza@20.25.119.241"
        CONATAINER_NAME = "converter"
        FOLDER_NAME     = "converter"
    }

    

    stages {

        // Continuous Integration
        
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
        
        stage("Unit Tests") {
            steps {
                sh "npm test"
            }
            
            post {
                always{
                    script{
                        sh "rm -rf ${WORKSPACE}/__test__/files"
                        sh "rm -f ${WORKSPACE}/__test__/test_files.zip"
                    }
                }
            }
        }
        
        stage ("Sonarqube analysis") {
            steps{
                script{
                    def scannerHome = tool "gtc_sonar_daof"
                    def scannerParameters = 
                        "-Dsonar.projectName=sonar_test " +
                        "-Dsonar.projectKey=sonar_test " +
                        "-Dsonar.sources=. " +
                        "-Dsonar.javascript.lcov.reportPaths=${WORKSPACE}/coverage/lcov.info"
                    withSonarQubeEnv('server_sonar_admin') {
                        sh "${scannerHome}/bin/sonar-scanner ${scannerParameters}"
                    }
                }
            }
        }
        
        stage("Quality Gate") {
            steps {
                waitForQualityGate abortPipeline: true
            }
        }
        
        stage("Publish to Docker Hub") {
            environment {
                DOCKERHUB_KEY = credentials("daof_dockerhub")
        	}
            
			steps {
				sh "echo $DOCKERHUB_KEY_PSW | docker login -u $DOCKERHUB_KEY_USR --password-stdin"
				sh "docker build -t dilanof/converter-service:${BUILD_NUMBER} ."
			    sh "docker push dilanof/converter-service:${BUILD_NUMBER}"
			}

			post {
			    always {
			        sh 'docker logout'
			    }
			}
		}
		
		// Continuous Delivery
		
		stage ("Deploy to the Environment") {
            steps {
                sshagent(["azure_vm_key"]) {
                    sh "ssh -o 'StrictHostKeyChecking no' $SERVER_DEV mkdir -p /home/calebespinoza/$FOLDER_NAME" 
                    sh "scp ${WORKSPACE}/validate-container.sh $SERVER_DEV:/home/calebespinoza/$FOLDER_NAME"
                    sh "ssh -o 'StrictHostKeyChecking no' $SERVER_DEV bash /home/calebespinoza/$FOLDER_NAME/validate-container.sh converter ${BUILD_NUMBER}"
                }
                
            }
        }
        
		stage('Acceptance Test') {
            steps {
                sleep(time: 8, unit: "SECONDS")
                sh 'curl -i -X POST -H "Content-Type: multipart/form-data" -F file=@${HOME}/Downloads/converter/ocean.jpg -F Width=480 -F Height="null" -F format="png" -F rotate=0 -F isActiveGrayScale="true" -F isActiveMirrorEffect="false" -F isActiveNegative="false" http://20.25.119.241:9094/api/v1/convert-image'
            }
        }
        
        stage ("Publish a Production Image") {
            environment {
                DOCKERHUB_KEY = credentials("daof_dockerhub")
            }
            
            steps {
                sshagent(["azure_vm_key"]) {
                    sh "ssh -o 'StrictHostKeyChecking no' $SERVER_DEV echo $DOCKERHUB_KEY_PSW | docker login -u $DOCKERHUB_KEY_USR --password-stdin"
			        sh "docker tag dilanof/converter-service:${BUILD_NUMBER} dilanof/converter-service:prod_${BUILD_NUMBER}"
			        sh "docker push dilanof/converter-service:prod_${BUILD_NUMBER}"
                }
            }
            
            post {
			    always {
			        sshagent(["azure_vm_key"]) {
                        sh "ssh -o 'StrictHostKeyChecking no' $SERVER_DEV docker logout"
                    }
			    }
			}
        }
        
    }
}