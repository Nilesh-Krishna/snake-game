resource "aws_instance" "jenkins_server" {

  ami           = "ami-0fc5d935ebf8bc3bc"
  instance_type = "t2.micro"

  subnet_id = module.vpc.public_subnets[0]

  tags = {
    Name = "jenkins-server"
  }

}