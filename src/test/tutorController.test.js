const tutorController = require('../src/controllers/tutorController');
const tutorService = require('../src/services/tutorService');

describe('Tutor Controller', () => {

  describe('createTutor', () => {

    test('should create a new tutor', async () => {

      const req = {
        body: {
          name: 'John Doe',
          password: 'password123',
          phone: '123456789',
          email: 'john@example.com',
          date_of_birth: '1990-01-01',
          zip_code: '12345'
        }
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      const existingTutorMock = jest.spyOn(tutorService, 'getTutorByEmail');
      existingTutorMock.mockResolvedValue(null); // Simula que não existe tutor com o email fornecido

      const createTutorMock = jest.spyOn(tutorService, 'createTutor');
      createTutorMock.mockResolvedValue({
        name: 'John Doe',
        email: 'john@example.com'
      }); 

      await tutorController.createTutor(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        msg: 'Tutor criado com sucesso',
        tutor: {
          name: 'John Doe',
          email: 'john@example.com'
        }
      });

      expect(existingTutorMock).toHaveBeenCalledWith('john@example.com');

      expect(createTutorMock).toHaveBeenCalledWith({
        name: 'John Doe',
        password: 'password123',
        phone: '123456789',
        email: 'john@example.com',
        date_of_birth: '1990-01-01',
        zip_code: '12345'
      });

      existingTutorMock.mockRestore();
      createTutorMock.mockRestore();
    });

    test('should return an error when required fields are missing', async () => {
      const req = {
        body: {
            
                 name: 'John Doe',
                 password: 'password123',
                 phone: '123456789',
                 email: 'john@example.com',
                 date_of_birth: '1990-01-01',
                 zip_code: '12345'      
              }
         };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await tutorController.createTutor(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        msg: 'Todos os campos são obrigatórios'
      });
    });
  });
});

