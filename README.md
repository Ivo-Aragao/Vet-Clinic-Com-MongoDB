# Projeto VetClinic

Este projeto é uma API para gerenciar tutores e pets com banco de dados.

Tecnologias utilizadas
-Node.js
-Express
-Mongoose
-swagger
-Middlewares

## Instalação

1. Certifique-se de ter o Node.js e o MongoDB instalados em sua máquina.
2. Faça o clone deste repositório.
3. No diretório raiz do projeto, execute o comando `npm install` para instalar as dependências.

## Configuração

1. Crie um arquivo `.env` no diretório raiz do projeto.
2. Defina as seguintes variáveis de ambiente no arquivo `.env`:
   - `DB_URL`: URL de conexão com o MongoDB.
   -  ACCESS_TOKEN_SECRET: segredo para usar tokens JWT.
   - `JWT_SECRET`: Segredo usado para assinar os tokens JWT.

## Uso

1. No diretório raiz do projeto, execute o comando `npm start` para iniciar o servidor.
2. Acesse `http://localhost:3000/api-docs` em seu navegador para visualizar a documentação da API gerada com Swagger.

## Endpoints

### Tutor

- `GET /tutors`: Obtém todos os tutores cadastrados.
- `POST /tutor`: Cria um novo tutor.
- `PUT /tutor/:id`: Atualiza os dados de um tutor.
- `DELETE /tutor/:id`: Exclui um tutor.

### Pet

- `POST /pet/:tutorId`: Adiciona um novo pet ao tutor especificado.
- `PUT /pet/:petId/tutor/:tutorId`: Atualiza os dados de um pet.
- `DELETE /pet/:petId/tutor/:tutorId`: Exclui um pet.

### User

- `POST /user/register`: Registra um novo usuário.
- `POST /user/login`: Realiza o login do usuário.

## Estrutura do Projeto

- `app.js`: Arquivo principal contendo a configuração do servidor e os endpoints da API.
- `services/userService.js`: Contém as funções relacionadas ao registro e autenticação de usuários.
- `services/tutorService.js`: Contém as funções relacionadas à manipulação de tutores.
- `services/petService.js`: Contém as funções relacionadas à manipulação de pets.
- `repositories/userRepository.js`: Define o esquema do modelo de usuário e fornece as operações de banco de dados relacionadas a usuários.
- `repositories/tutorRepository.js`: Define o esquema do modelo de tutor e fornece as operações de banco de dados relacionadas a tutores.
- `repositories/petRepository.js`: Define o esquema do modelo de pet e fornece as operações de banco de dados relacionadas a pets.
- `models/Tutor.js`: Define o esquema do modelo de tutor.
- `models/pet.js`: Define o esquema do modelo de pet.
- `controllers/userController.js`: Contém os controladores relacionados a usuários.
- `controllers/tutorController.js`: Contém os controladores relacionados a tutores.
- `controllers/petController.js`: Contém os controladores relacionados a pets.
