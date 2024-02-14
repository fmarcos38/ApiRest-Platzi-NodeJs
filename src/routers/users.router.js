const express = require('express');
const userServices = require('../services/user.service');
const validatorHandler = require('../middlewares/validator.handler');
const { getUserSchema, createUserSchema } = require('../schemas/user.schema');

const router = express.Router();
const serviceUser = new userServices(); //creo una instancia de UsersService(por ser una clase)

//muestra usuarios
router.get('/', async (req, res) => {
  try {
    //const users = await serviceUser.getUsers();
    const users = await serviceUser.find();
    res.json(users);
  } catch (error) {
    res.status(404).json({
      message: error.message
    });
  }
});

//muestra un usuario por id
//en el middleware le paso el esquema q quiero validar y el lugar donde se encuentra el id
router.get('/:id', validatorHandler(getUserSchema, 'params'), async(req, res) => {
  try {
    const { id } = req.params;
    const user = await serviceUser.getUser(id);
    res.json(user);
  } catch (error) {
    res.status(404).json({message: error.message});
  }
});

//crea usuario
router.post('/', validatorHandler(createUserSchema, 'body'), async(req, res) => {
  try {
    const newUser = await serviceUser.createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(404).json({message: error.message});
  }
});

//actualizo usuario
router.put('/:id', async(req, res) => {
  try {
    const user = await serviceUser.updateUser(req.params.id, req.body);
    res.json(user);
  } catch (error) {
    res.status(404).json({message: error.message});
  }
});
module.exports = router;
