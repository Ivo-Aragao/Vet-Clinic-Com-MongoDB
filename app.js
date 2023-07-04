const express = require('express');
const tutorController = require('./controllers/tutorController');
const petController = require('./controllers/petController');
const userController = require('./controllers/userController');
require('dotenv').config();
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const app = express();
const port = 3000;
const swaggerDocument = YAML.load('./swagger.yaml');

app.use(express.json());

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Conectado ao MongoDB');

<<<<<<< HEAD
<<<<<<< HEAD
    app.get('/', (req, res) => {
      res.send('Bem-vindo VetClinic API!');
    });
=======
>>>>>>> 7dcf465d79c9d21d48de9665f334d03d79419da6
=======
>>>>>>> 7dcf465d79c9d21d48de9665f334d03d79419da6

    app.get('/tutors', tutorController.getAllTutors);
    app.post('/tutor', tutorController.createTutor);
    app.put('/tutor/:id', tutorController.updateTutor);
    app.delete('/tutor/:id', tutorController.deleteTutor);

    app.post('/pet/:tutorId', petController.addPetToTutor);
    app.put('/pet/:petId/tutor/:tutorId', petController.updatePet);
    app.delete('/pet/:petId/tutor/:tutorId', petController.deletePet);

<<<<<<< HEAD
<<<<<<< HEAD
    app.post("/register", userController.registerUser);
    app.post("/auth", userController.loginUser);
=======
    app.use('/user', userController);
>>>>>>> 7dcf465d79c9d21d48de9665f334d03d79419da6
=======
    app.use('/user', userController);
>>>>>>> 7dcf465d79c9d21d48de9665f334d03d79419da6

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    app.listen(port, () => {
      console.log(`Servidor rodando na porta: http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Erro ao conectar ao MongoDB:', error);
  });
