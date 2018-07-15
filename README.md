
<img align="center" src="https://github.com/fabiorochaufsc/fabiorochaufsc.github.io/blob/master/web/mobile-app.png" alt="Logo">

-------
<p align="center">
    <a href="#git">Uso do Git</a> &bull;
    <a href="#vídeos">Vídeos</a> &bull;
    <a href="#software">Software</a> &bull;
    <a href="#configurações">Configurações</a>&bull;
    <a href="#bibliografia">Bibliografia</a>&bull;
    <a href="#links">Links</a>
</p>





-------

## Git

### Instalar o git
> <span style="color:blue">sudo apt-get install git</span>
 

### Clonar o repositorio no seu computador

>  mkdir Codigos-TopicosI<br/>
>  cd Codigos-TopicosI<br/>
>  git clone https://github.com/fabiorochaufsc/TopicosI<br/>
>  cd TopicosI

### Baixar as novas atualizações do repositorio para o seu PC
>  git pull

---
![video](https://github.com/fabiorochaufsc/fabiorochaufsc.github.io/blob/master/web/videoaula.jpg)
## Vídeos



| Material                                                                                             | Descrição                                                 |
|------------------------------------------------------------------------------------------------------|-----------------------------------------------------------|
|[Instalação node](https://www.youtube.com/watch?v=AHWbz012kxI)                                        | Mostra como instalar o node no **Ubuntu**                 |
|[P1](https://www.youtube.com/watch?v=qZUDuBcbJ9A) [P2](https://www.youtube.com/watch?v=07qqDZrZ--8)   | Comunicação tempo real via socket.io                      |

---

![Software](https://github.com/fabiorochaufsc/fabiorochaufsc.github.io/blob/master/web/software2.png)

## Software
### Softwares utilizados na disciplina
  


| Software                              | Descrição                                                 |
|---------------------------------------|-----------------------------------------------------------|
|[NodeJS](https://nodejs.org/en/)       | Interpretador NodeJS                                      |
|[MongoDB](https://www.mongodb.com)     | Para usar banco de dados em NodeJS                        |
|[Cordova](https://cordova.apache.org/) | Para criar aplicações híbridas nos smartfones             |
|[Robo3T](https://robomongo.org/)       | Ferraments de gerenciamento de bancos de dados mongoDB    |
|[Babel](https://babeljs.io/)           | Conversor de código JS da versão 6 para a versão 5        |

Instalação do MongoDB

>            sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6  
>            echo "deb [ arch=amd64,arm64 ] http://repo.mongodb.org/apt/ubuntu "$(lsb_release -sc)"/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-3.4.list  
>            sudo apt-get update  
>            sudo systemctl start mongod  
>            sudo systemctl enable mongod
---
### Bibliotecas

| Biblioteca                                       | Descrição                                                                   |
|--------------------------------------------------|-----------------------------------------------------------------------------|
|[PubSubJS](https://github.com/mroderick/PubSubJS) | Biblioteca publish-subscribe                                                |
|[Phonon](http://phonon.quarkdev.com/)             | Biblioteca para **User Interface** muito bonita, pequena e  fácil de usar   |                        |
|[Enchant.js](http://enchantjs.com/)               | Biblioteca para criar jogos                                                 | 
|[jsQR](https://github.com/cozmo/jsQR)             | Biblioteca para reconhecer QR code                                          | 


### Parsers  
browserify         ex: browserify index.js > bundle.js   
uglify-js             ex: uglifyjs --compress --mangle -- input.js  
clean-css-cli      npm install clean-css-cli -g  
cleancss -o estilo.min.css estilo.css

---
![configuracao](https://github.com/fabiorochaufsc/fabiorochaufsc.github.io/blob/master/web/config-sys.jpg)
## Configurações
### configurações de variáveis de ambiente do .bashrc
> ANDROID_HOME="/home/USUARIO/Desenvolvimento/android/sdk/tools"<br/>
> ANDROID_PLATFORM_TOOLS="/home/USUARIO/Desenvolvimento/android/sdk/platform-tools"<br/>
> PATH="$PATH:$ANDROID_HOME:$ANDROID_PLATFORM_TOOLS"

---
![Referencias](https://github.com/fabiorochaufsc/fabiorochaufsc.github.io/blob/master/web/livros.png)
## Bibliografia




|                                       Bibliografia Básica                                                                              |
|----------------------------------------------------------------------------------------------------------------------------------------|
|Construindo aplicações com NodeJS, Willian Bruno Moraes, 2015, novatec                                                                  |
|Aprendendo a Desenvolver Aplicações Web, Semmy Purewal, 2014, novatec                                                                   |
|The Node Craftsman Book, Manuel Kiessling, 2017, Packt                                                                                  |


|                                               Bibliografia Complementar                                                                 |
|-----------------------------------------------------------------------------------------------------------------------------------------|
|Node.js Web Development, David Herron, 2016, Packt                                                                                       |
|https://www.tutorialspoint.com/nodejs/                                                                                                   |
|Learning Node: Moving to the Server-Side, Shelley Powers, 2016, O'Reilly                                                                 | 
|Mobile App Development with Ionic, Revised Edition: Cross-Platform Apps with Ionic, Angular, and Cordova, ChrisGriffith, 2017, O'Reilly  |
|Apache Cordova 4 Programming (Mobile Programming), Johm M. Wargo, 2015, Addison-Wesley                                                   |

---
![Links](https://github.com/fabiorochaufsc/fabiorochaufsc.github.io/blob/master/web/referencias.png)
## Links

[Javascript - The World's Most Misunderstood Programing Language ](https://player.vimeo.com/video/101993282) 
