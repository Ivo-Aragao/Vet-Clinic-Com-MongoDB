import express from 'express';
import tutorRoutes from './routes/tutorRoutes';
import petRoutes from './routes/petRoutes';
import userRoutes from './routes/userRoutes';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const app = express();
const swaggerDocument = YAML.load('./swagger.yaml');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Bem-vindo VetClinic API!');
});

app.use('/', tutorRoutes);
app.use('/', petRoutes);
app.use('/', userRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;
