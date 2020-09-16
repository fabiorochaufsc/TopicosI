
## MongoDB

É um banco de dados não relacional baseado em documentos. 

### Instalar o MongoDB

Você pode instalar diretamente na sua distribuição linux 
https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/

Ou ainda pode fazer download do instalador para sua arquitetura 
https://www.mongodb.com/ 




## Software
      |
|[Robo3T](https://robomongo.org/)       | Ferraments de gerenciamento de bancos de dados mongoDB    |


Instalação do MongoDB

>            sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6  
>            echo "deb [ arch=amd64,arm64 ] http://repo.mongodb.org/apt/ubuntu "$(lsb_release -sc)"/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-3.4.list  
>            sudo apt-get update  
>            sudo systemctl start mongod  
>            sudo systemctl enable mongod
