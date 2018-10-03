def project = "how2die"
def app = "message-server"
def imageTag = "$project/$app"
def deploymentName = "message-server"
def deploymentConfig = "deployment.yaml"

pipeline {
  agent any
  stages {
    stage('Build Docker image') {
      steps {
        sh("docker build . -t $imageTag")
      }
    }
    stage('Push Docker image') {
      steps {
        withCredentials([[$class: 'UsernamePasswordMultiBinding', 
            credentialsId: 'docker-hub',
            usernameVariable: 'DOCKER_HUB_USER_ID', 
            passwordVariable: 'DOCKER_HUB_PASSWORD']]) {
          sh("docker tag $imageTag $DOCKER_HUB_USER_ID/$app")
          sh("echo $DOCKER_HUB_PASSWORD | docker login --username $DOCKER_HUB_USER_ID --password-stdin")
          sh("docker push $DOCKER_HUB_USER_ID/$app")
        }
      }
    } 	
    stage('Deploy to production') {
      when { branch 'master' }
      steps {
        sh("kubectl apply -f $deploymentConfig")
        // Modify Deployment config to force image repull
        sh("""
            kubectl patch deployment $deploymentName -p \
            "{\\"spec\\":{\\"template\\":{\\"metadata\\":{\\"labels\\":{\\"date\\":\\"`date +'%s'`\\"}}}}}"
          """)
      }
    } 
  }
}
