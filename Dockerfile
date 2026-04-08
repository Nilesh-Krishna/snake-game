FROM nginix:latest
WORKDIR /usr/share/nginix/html
Copy . .
Expose 80