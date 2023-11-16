pipeline {
    agent {
        label 'master'
    }
    stages {
        stage('load env') {
            steps {
                echo " =========== ^^^^^^^^^^^^ Load ENV "
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
}
