# LDS5 - App Delivery (Backend)
Criação Crud básico

## Preparação de ambiente Windows e Linux
### ⚠️ Requisitos 

#### Não precisa instalar o Python, pois ele já está dentro do contêiner Docker.

### `Docker Desktop`   

🔍 [Link de instalação Windows](https://docs.docker.com/desktop/install/windows-install/)
🔍 [Link de instalação Linux](https://docs.docker.com/engine/install/)

```bash
# Verificar a versão do Docker 
$ docker --version
```

### `Docker Compose`   

🔍 [Link de instalação Windows](https://docs.docker.com/desktop/install/windows-install/)

### No Linux:

Baixar o Docker Compose:

```bash
$ sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

Dar permissão de execução:

```bash
$ sudo chmod +x /usr/local/bin/docker-compose
```

Verificar a versão do Docker Compose

```bash
$ docker-compose --version
```

## Após realizar as instações:

Clonar o repositório:

```bash 
$ git clone git@github.com:meira-gabriel/lab_desenvolvimento_sistemas.git
```

Entrar na pasta do projeto:

```bash 
$ cd lab_desenvolvimento_sistemas/backend
```

O projeto está rodando em um container Docker, é preciso construir a imagem dele:

```bash
$ docker-compose build 
```

E depois subir o container:

```bash
$ docker-compose up -d
```





