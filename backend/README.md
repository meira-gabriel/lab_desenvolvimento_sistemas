# LDS5 - App Delivery (Backend)

## Preparação de ambiente Windows e Linux
### ⚠️ Requisitos 

#### Não precisa instalar dependências a parte(Python, DRF...), pois ele já está dentro do contêiner Docker.

### `Docker Desktop`   

🔍 [Link de instalação Windows](https://docs.docker.com/desktop/install/windows-install/)
- Para usar o docker no Windows é um pré-requisito ter o WSL instalado e habilitado.

- [Link Video de instalação WSL](https://www.youtube.com/watch?v=o1_E4PBl30s)

🔍 [Link de instalação Linux](https://docs.docker.com/engine/install/)

```bash
# Verificar a versão do Docker 
$ docker --version
```

### `Docker Compose`   

🔍 [Link de instalação Windows](https://docs.docker.com/desktop/install/windows-install/)

### `No Linux:`

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

Após abrir o projeto no VSCode, Pychamr ou outra IDE de sua preferência, 
é preciso rodar as migrations (dentro do container):

```bash
$ docker-compose run --rm app sh -c "python manage.py makemigrations"
```

E depois:

```bash
$ docker-compose run --rm app sh -c "python manage.py migrate"
```    

Caso você tenho algum erro de permissão, rode o comando abaixo:

```bash
$ docker-compose run --rm --user $(id -u):$(id -g) app sh -c "python manage.py migrate"
```

