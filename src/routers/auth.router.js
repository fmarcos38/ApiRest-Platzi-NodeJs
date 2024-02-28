const express = require('express');
const passport = require('passport');
const { user } = require('pg/lib/defaults');
const jwt = require('jsonwebtoken');
const { config } = require('./../config/config'); //esto es para traer el secret del archivo .env


const router = express.Router();


router.post('/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
  try {
    const users = req.user; //esto es lo que devuelve la estrategia local
    //creo un token con la info del usuario osea el payload
    const payload = {
      sub: users.id,
      role: users.role
    };
    //creo el token con el payload y el secret
    const token = jwt.sign(payload, config.jwtSecret);

    res.status(201).json({
      user,
      token,
      message: 'user logeado'
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
