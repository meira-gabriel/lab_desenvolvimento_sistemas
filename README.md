# *SISTEMA DE CONTROLE DE DELIVERY*
#### O projeto proposto visa o desenvolvimento de um Sistema de Controle de Delivery, destinado a otimizar e facilitar o gerenciamento de operações relacionadas a serviços de entrega. Este sistema será uma solução abrangente para restaurantes, estabelecimentos alimentícios e empresas que oferecem serviços de entrega, proporcionando uma gestão eficiente de pedidos, entregas e estoque.
### As principais tarefas para o desenvolvimento do sistema: 

- Pagamento com Cartão de Crédito: Desenvolver e integrar um sistema seguro e eficiente para transações com cartões de crédito.
- Configuração de Cartão de Crédito Virtual para Testes: Estabelecer ambiente de teste para simular transações com cartões virtuais, sem expor dados reais.
- Rastreamento do Entregador: Criar funcionalidade de rastreamento em tempo real para que clientes acompanhem a localização do entregador.
- Página Específica para Cada Tipo de Usuário: Desenvolver páginas personalizadas para diferentes usuários (clientes, vendedores, motoristas) para experiências adaptadas.
- Validação para Conexão Perdida durante Entrega: Garantir que o sistema lide com perda de conexão durante entrega, mantendo a robustez e informando os usuários.
- Roteamento do GPS para o Entregador: Integrar roteamento GPS para orientar entregadores na melhor  rota, otimizando o tempo de entrega.
- Controle de Estoque para Vendedores: Desenvolver sistema específico de controle de estoque para vendedores, evitando pedidos de produtos fora de estoque.
- Avaliação de Entrega para Clientes: Criar sistema de avaliação para que clientes avaliem a qualidade da entrega, fornecendo feedback.
- Avaliação para Motoristas: Implementar funcionalidade de avaliação para que clientes avaliem o desempenho dos motoristas.
- Avaliação de Produtos e Lojas pelos Clientes: Desenvolver sistema para que clientes avaliem produtos e lojas, fornecendo informações úteis para outros usuários.

## Tecnologias Utilizadas:  
### Lista das tecnologias usadas no Frontend.
- React para o desenvolvimento. 
- Prisma para conexão com o banco de dados.

### Lista das tecnologias usadas no Backend (se aplicável).
- Python com o framework DRF (Django Rest Framework) e ambiente de desenvolvimento com o uso do Docker. 
- PostgreSQL

### Versões de cada ferramenta/framework utilizado.
#### Backend: 
- Docker Compose verso : 3.9
- PostgreSQL versão: 13-alpine 
- Django versão: 3.2.20
- Django Rest Framework versão: 3.12.4
- Driver de banco de dados PostgreSQL para Python versão: 2.9 
- Biblioteca “googlemaps” versão: 4.10.0. 

#### Frontend: 
- React versão: 18

### Instruções de Instalação:

#### Para começar é necessário uma preparação de ambiente com as ferramentas escolhidas para o desenvolvimento,, para Windows e Linux: 

## Configurando o Ambiente para o Projeto "lab_desenvolvimento_sistemas" (Backend)

### Passo 1: Pré-requisitos

- **Docker Desktop:** O projeto utiliza contêineres Docker para isolar o ambiente. Instale o Docker Desktop no [Windows](https://docs.docker.com/desktop/install/windows-install/) ou no [Linux](https://docs.docker.com/engine/install/).

- **Docker Compose:** Essencial para definir e executar aplicativos Docker multi-contêiner. Siga os passos para instalação no [Windows](https://docs.docker.com/desktop/install/windows-install/) ou no Linux, utilize o comando fornecido no tutorial.

### Passo 2: Instalação no Linux

- No Linux, utilize o `curl` para baixar o Docker Compose e conceda permissões de execução. Verifique a versão após a instalação.

### Passo 3: Após a Instalação

1. **Clonar o Repositório:**
   - Use o comando `git clone` para obter o código-fonte do projeto.

2. **Entrar na Pasta do Projeto:**
   - Navegue até o diretório recém-clonado usando `cd`.

3. **Construir a Imagem do Contêiner Docker:**
   - Execute `docker-compose build` para criar a imagem necessária.

4. **Subir o Contêiner:**
   - Use `docker-compose up -d` para iniciar o contêiner em segundo plano.
   - No Windows, verifique se o terminal do Linux (WSL) está aberto em caso de erros.

5. **Abrir o Projeto na IDE:**
   - Abra o projeto na sua IDE preferida, como VSCode ou PyCharm.

6. **Rodar as Migrações (Dentro do Contêiner):**
   - Execute `docker-compose run --rm app sh -c "python manage.py makemigrations"` para criar as migrações.

7. **Executar as Migrações:**
   - Em seguida, execute `docker-compose run --rm app sh -c "python manage.py migrate"` para aplicar as migrações.
   - Se houver problemas de permissão, utilize o comando:   
     ```
     docker-compose run --rm --user $(id -u):$(id -g) app sh -c "python manage.py migrate"
     ```
Este tutorial simplifica a configuração do ambiente, garantindo que todas as dependências necessárias estejam encapsuladas no contêiner Docker. Certifique-se de ter o Git, Docker Desktop, Docker Compose e uma IDE instalados antes de prosseguir.

#### Colaboradores:

- Carolina Dos Anjos Figueiredo - GU3015475 - Dev
- Cesar Torres - GU3022234 - Dev
- Davi Lima Da Silva - GU3020371 - Banco de Dados
- Gabriel Meira Lima - GU3020428 - Scrum Master
- Gabriel Pinheiro De Oliveira - GU3023745 - Product Owner
- Luiza Maria Barros De Oliveira - GU3022315 - Dev
- Vinicius Barbosa De Souza - GU3012069 - Front

### Aplicativo Mobile:
Frontend mobile e Backend web.