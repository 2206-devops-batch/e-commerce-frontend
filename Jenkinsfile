pipeline {
  agent {
    kubernetes {
      yaml '''
      apiVersion: v1
      kind: Pod
      spec:
        containers:
        - name: node
          image: node:18-bullseye-slim
          command:
          - cat
          tty: true
        - name: kubectl
          image: gcr.io/cloud-builders/kubectl
          command:
          - cat
          tty: true
        - name: docker
          image: docker:latest
          command:
          - cat
          tty: true
          volumeMounts:
            - mountPath: /var/run/docker.sock
              name: docker-sock
        volumes:
        - name: docker-sock
          hostPath:
            path: /var/run/docker.sock
      '''
    }
  }
  stages {
    stage('Download') {
      steps {
        git 'https://github.com/2206-devops-batch/e-commerce-frontend.git'
        container('docker') {
          sh 'docker system prune -af'
          sh 'docker version'
        }
      }
    }
    stage('Build') {
      steps {
        container('node') {
          sh 'npm install'
        // sh 'npm run build'
        // sh 'ls -al'
        }
      }
    }
    // stage('SonarCloud analysis') {
    //   steps {
    //     script {
    //       nodejs(nodeJSInstallationName: 'nodejs'){
    //         def scannerHome = tool 'sonar scanner';
    //         withSonarQubeEnv('SonarCloud') {
    //           sh "${scannerHome}/bin/sonar-scanner"
    //         }
    //       }
    //     }
    //   }
    // }
    // stage('Quality gate') {
    //   steps {
    //     script {
    //       timeout(time: 5, unit: 'MINUTES') {
    //         waitForQualityGate abortPipeline: true
    //       }
    //     }
    //   }
    // }
    stage('Docker Build & Push') {
      steps {
        container('docker') {
          withCredentials([usernamePassword(credentialsId: 'dockerhub', passwordVariable: 'password', usernameVariable: 'username')]) {
            sh 'docker login -u ${username} -p ${password}'

            // Version -- Frontend Docker Images -- Blue -- Based on latest pipeline build
            sh 'docker build -t othom/e-commerce-frontend-blue:$BUILD_NUMBER .'
            sh 'docker build -t othom/e-commerce-frontend-blue:latest .'

            // Version -- Frontend Docker Images -- Green -- Latest Build
            // sh 'docker build -t othom/e-commerce-frontend-green:$BUILD_NUMBER .'
            // sh 'docker build -t othom/e-commerce-frontend-green:latest .'

            // Push Blue Recent Build
            sh 'docker push othom/e-commerce-frontend-blue:$BUILD_NUMBER'
            sh 'docker push othom/e-commerce-frontend-blue:latest'

            // Push Green Recent Build
            // sh 'docker push othom/e-commerce-frontend-green:$BUILD_NUMBER'
            // sh 'docker push othom/e-commerce-frontend-green:latest'

            // Note these should really be broken up into separete branches pipelines but for demo sake we are running both off latest changes
            // Use Blue  as Stable  / Production Env. e.g. $BUILD_NUMBER 15 works but frontend cors issue with backend
            // Use Green as Staging / Dev Environment e.g. $BUILD_NUMBER 55 fixes frontend cors issue with backend but has XYZ error
          }
        }
      }
    }
    stage('Deploy Image To AWS EKS Cluster') {
      steps {
        container('kubectl') {

          // Start Service To Host Both Blue & Green Builds
          sh 'kubectl apply -f frontend-service.yaml'

          // Deploy Blue (Stable) Build & Green (Dev) Build
          sh 'kubectl apply -f frontend-deployment-blue.yaml'
          // sh 'kubectl apply -f frontend-deployment-green.yaml'

          sh 'kubectl get svc,deployments,pods --all-namespaces'
          // Update Running Pod With Build
          // sh 'kubectl set image deployment/frontend-blue frontend-blue="othom/e-commerce-frontend-blue:$BUILD_NUMBER"'
          // sh 'kubectl set image deployment/flask-deployment flaskapp="bryonsmith/flaskapp-demo:$VERSION"'
        }
      }
    }
  }
  post {
    always {
      container('docker') {
        sh 'docker logout'
      }
    }
  }
}
