
<img align="center" src="https://github.com/fabiorochaufsc/fabiorochaufsc.github.io/blob/master/web/mobile.jpg" alt="Logo">




-------

## Unidade 3 - Aplicações móveis [16 horas-aula]

* Aplicações híbridas 
* Framework Cordova, plugins, criação de projeto 
* Exemplos de aplicações cordova 
* Desenvolvimento de uma aplicação cordova para acessar um servidor usando AJAX e websockets #3



---
<p align="center">
    <a href="#JAVA">Instale o JAVA</a> &bull;
    <a href="#vídeos">Vídeos</a> &bull;
    <a href="#software">Software</a> &bull;
    <a href="#configurações">Configurações</a>&bull;
    <a href="#bibliografia">Bibliografia</a>&bull;
    <a href="#links">Links</a>
</p>

## JAVA
### Instalação do JAVA

Instale o ** Java Development Kit ** acessando o [site](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html?ssSourceSiteId=otnpt). Escolha o arquivo  (*.tar.gz) para a sua arquitetura e salve o download em alguma pasta (ex: ~/Downloads). 


```code

$cd /usr/local
$sudo mkdir java && cd java
$sudo tar xzvf ~/Downloads/jdk-*****_***.tar.gz
```

Configure o seu PATH para apontar para o diretório do Java. Use qualquer editor de texto (no exemplo o ***nano***)

```code
$ cd ~
$ nano .bashrc
```

Insira as seguintes linhas

```code
export JAVA_HOME="/usr/local/java/jdk1.8.0_***"
PATH=$PATH:$JAVA_HOME/bin
```
Recarregue o ***.bashrc*** e teste se o javac está instalado corretamente

```code
$ source .bashrc
$ javac -version      
```

## JAVA
## Instalação do ANDROID

Instale o android studio do [site](https://developer.android.com/studio/)


```code
$ cd /usr/local
$ sudo unzip ~/Downloads/android-studio-ide-***.zip
$ cd android-studio/bin
$ ./studio.sh
```

Atualize  o seu **.bashrc**

```code
$ cd ~
$ nano .bashrc
```

```code
export ANDROID_HOME="$HOME/Android/Sdk"
PATH=$PATH:$ANDROID_HOME/tools
PATH=$PATH:$ANDROID_HOME/platform-tools
```

## Instale o GRADLE

Use o ***apt-get***

```code
$ sudo apt install gradle
```

## Instale o CORDOVA

Use:

```code
$ npm install -g cordova
```


---
## Dicas
/usr/bin/google-chrome-stable  --ignore-certificate-errors  --args --disable-web-security --user-data-dir 


