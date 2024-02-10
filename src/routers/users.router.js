const express = require('express');
const userServices = require('../services/user.service');

const router = express.Router();
const serviceUser = new userServices(); //creo una instancia de UsersService(por ser una clase)

//muestra usuarios falsos
router.get('/', async (req, res) => {
  try {
    const users = await serviceUser.getUsers();
    res.json(users);
  } catch (error) {
    res.status(404).json({
      message: error.message
    });
  }
});

module.exports = router;
