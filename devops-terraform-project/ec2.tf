resource "aws_instance" "jenkins_server" {

  ami           = "ami-0c02fb55956c7d316"
  instance_type = var.instance_type

  subnet_id = module.vpc.public_subnets[0]

  tags = {
    Name = "jenkins-server"
  }

}