/* groovylint-disable CompileStatic, NestedBlockDepth */
pipeline {
    agent any

    tools {
        nodejs 'nodejs-18'
    }

    stages {
        stage('init') {
            steps {
                script {
                    gv = load 'scripts.groovy'
                }
            }
        }

        stage('Installing Packages') {
            steps {
                script {
                    withCredentials([sshUserPrivateKey(credentialsId: 'ec2-kp', keyFileVariable: 'keyfile')]) {
                        gv.installPackages()
                    }
                }
            }
        }

        stage('Copying Files') {
            steps {
                script {
                    withCredentials([sshUserPrivateKey(credentialsId: 'ec2-kp', keyFileVariable: 'keyfile')]) {
                        gv.copyFiles()
                    }
                }
            }
        }

        stage('Running Service') {
            steps {
                script {
                    withCredentials([sshUserPrivateKey(credentialsId: 'ec2-kp', keyFileVariable: 'keyfile')]) {
                        gv.runService()
                    }
                }
            }
        }
    }
}
