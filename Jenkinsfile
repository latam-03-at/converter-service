pipeline {
    agent any
    
    tools {
        nodejs "16.14.0"
    }
    
    stages {
        stage("Clone Repo") {
            steps {
                git branch: "main", url: "https://github.com/latam-03-at/converter-service"
            }
        }
        stage("Build") {
            steps {
                sh "cd ${WORKSPACE}"
                sh "npm install"
            }
        }
        stage("Tests") {
            steps {
                sh "cd ${WORKSPACE}"
                sh "npm test"
            }
        }
    }
}