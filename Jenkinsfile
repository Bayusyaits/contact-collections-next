pipeline {
    agent {
        node {
            label 'master'
        }
    }
    stages {
        stage('verify plugin') {
            steps {
              sh '''
                docker version
                docker info
                docker compose version
                curl --version
                jq --version
              '''
            }
        }
        stage('load env') {
            steps {
                echo " =========== ^^^^^^^^^^^^ Load ENV "
            }
        }
        stage('build') {
            steps {
                echo " =========== ^^^^^^^^^^^^ Build "
            }
        }
        stage('prepare') {
            steps {
                echo " =========== ^^^^^^^^^^^^ Prepare "
            }
        }
        stage('push') {
            steps {
                echo " =========== ^^^^^^^^^^^^ Push "
            }
        }
        stage('deploy') {
            steps {
                echo " =========== ^^^^^^^^^^^^ Deploy "
            }
        }
    }
    post {
        success {
            echo 'Yay, success'
        }
        failure {
            echo 'Error, failure'
        }
        cleanup {
            echo 'Dont care success or failure'
        }
    }
}
