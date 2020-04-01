#FROM node:9
# Ubuntu
FROM ubuntu:18.04

# bcrypt module (specifically node-gyp only works with stable/released versions of node. The list node version 12
# as latest stable, so installing node v12
# https://github.com/kelektiv/node.bcrypt.js#nodebcryptjs
RUN apt-get update && apt-get install -y vim net-tools curl gnupg wget telnetd
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
RUN apt-get install -y nodejs lsof
RUN npm install nodemon -g

RUN echo "set number" > /root/.vimrc
RUN echo "alias ll='ls -ltr'" >> /root/.bashrc