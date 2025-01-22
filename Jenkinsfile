pipeline {
    agent any
    
    stages {
        stage('pressa.edu frontend update') {
            steps {
                sh 'ansible-playbook /var/lib/jenkins/ansible/pressa_edu.yml -l server-9_24'
            }
        }
    }
}
