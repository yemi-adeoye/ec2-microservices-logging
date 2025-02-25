/* groovylint-disable CompileStatic, FactoryMethodName, MethodReturnTypeRequired, NoDef */
def copyFiles() {
    echo 'Copying files to EC2'
    sh 'scp -i ${keyfile} -o StrictHostKeyChecking=no -r ./src ${USER}@${HOST}:~/${LOGGING_MS_DIR}/'
    sh 'scp -i ${keyfile} -o StrictHostKeyChecking=no  ./package.json ${USER}@${HOST}:~/${LOGGING_MS_DIR}/'
}

def installPackages() {
    echo 'Installing Packages'
    sh '''ssh -i ${keyfile} -o StrictHostKeyChecking=no ${USER}@${HOST} "cd ${LOGGING_MS_DIR} && npm install --force" '''
    sh '''ssh -i ${keyfile} -o StrictHostKeyChecking=no ${USER}@${HOST} "cd ${LOGGING_MS_DIR} && npm run build" '''
}

def runService() {
    echo 'Running api-gateway microservice'
    sh '''nohup ssh -i ${keyfile} -o StrictHostKeyChecking=no ${USER}@${HOST} "cd ~/${LOGGING_MS_DIR} && npm start:prod" &'''
}

return this
