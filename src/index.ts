import app from './app';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const port = 3000;

// Configurando a conexão com o MongoDB
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log('Conectado ao MongoDB');

    // Iniciando o servidor após a conexão com o banco de dados
    app.listen(port, () => {
      console.log(`Servidor rodando na porta: http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Erro ao conectar ao MongoDB:', error);
  });
