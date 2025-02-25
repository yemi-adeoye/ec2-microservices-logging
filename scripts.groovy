/* groovylint-disable CompileStatic, FactoryMethodName, MethodReturnTypeRequired, NoDef */

def installPackages() {
    echo 'Installing Packages'
    sh  '''npm install --force '''
    sh '''npm run build '''
}

def copyFiles() {
    echo 'Copying files to EC2'
    sh 'scp -i ${keyfile} -o StrictHostKeyChecking=no -r ./dist ${USER}@${HOST}:~/${LOGGING_MS_DIR}/'
}

def runService() {
    echo 'Running api-gateway microservice'
    sh '''nohup ssh -i ${keyfile} -o StrictHostKeyChecking=no ${USER}@${HOST} "cd ~/${LOGGING_MS_DIR}/dist && node main" &'''
}

return this
