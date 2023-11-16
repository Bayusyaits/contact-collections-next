pipeline {
    agent {
        node {
            label 'master'
        }
    }
    stages {
        stage('load env') {
            steps {
                echo " =========== ^^^^^^^^^^^^ Load ENV "
            }
        }
        stage('build') {
            steps {
                script {
                    sh "docker-compose up -d"
                }
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
