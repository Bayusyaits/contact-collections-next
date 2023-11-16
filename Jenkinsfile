#!/usr/bin/env groovy

pipeline {
  agent any
  environment {
    tag_ver = sh (
      script: "git describe --tags",
      returnStdout: true
      ).trim()
  }
  stages {
    stage('load env') {
        steps {
            echo " =========== ^^^^^^^^^^^^ Reading config from pipeline script "
            }
        }
    }
    stage('build') {
        steps {
            echo " =========== ^^^^^^^^^^^^ Build "
        }
    }
    stage('cluster prepare') {
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