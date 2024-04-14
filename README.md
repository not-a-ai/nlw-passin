# Backend com TS para criação de eventos e controle de check-ins

Este é um projeto backend em TypeScript que implementa uma API com SwaggerUI de um backend que realiza a criação de evento e o check-in de participantes desenvolvido no evento NLW da Rocketseat.

## Pré-requisitos

Certifique-se de ter o seguinte instalado em sua máquina:

- Node.js
- npm (gerenciador de pacotes do Node.js) ou Yarn
- TypeScript
- SQLite
- Prisma
- fastify
- zod

## Instalação

1. Clone este repositório em sua máquina local:

2. Navegue até o diretório do projeto:

3. Instale as dependências do projeto com npm ou yarn:

## Prisma Studio
O Prisma é uma ferramenta de desenvolvimento de aplicativos que fornece uma camada de abstração para o acesso ao banco de dados em aplicativos Node.js e TypeScript.
![image](https://github.com/not-a-ai/nlw-passin/assets/123133377/0b5a0c0d-d795-4a8b-8e62-c05231f97fd8)
Para fazer a migrations:
```Com npm:
  npx prisma migrate dev
```
Para abrir a vizualização no navegador:
```Com npm:
  npx prisma studio
```


## Rotas

POST /events : Criar evento.
POST /events/:eventid/attendees : Faz check-in de um participante a um evento.
GET /events/:eventid : Obter informações de um evento
GET /attendees/:attendeesid/check-in : Fazer o Check-in de um participante
GET /events/:eventid/attendees(?query=...) : Obter participantes de um evento com a possibilidade de filtrar.

## Teste de rotas

Foi utilizado:

- **api.http** Uma extensão que permite você envie solicitações HTTP diretamente do seu arquivo de código e visualize as respostas dentro do próprio VS Code. 

## SwaggerUI
![image](https://github.com/not-a-ai/nlw-passin/assets/123133377/fd8d528c-0458-4bc3-9a3b-8a32151129a8)
É uma interface de usuário interativa que facilita a visualização e interação com APIs RESTful que foram documentadas usando a especificação OpenAPI.
