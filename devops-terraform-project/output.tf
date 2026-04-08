output "jenkins_ip" {
  value = aws_instance.jenkins_server.public_ip
}

output "ecr_repo_url" {
  value = aws_ecr_repository.snake_repo.repository_url
}