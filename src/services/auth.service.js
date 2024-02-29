const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const { config } = require('./../config/config');
const UserService = require('./user.service');
const service = new UserService();

class AuthService {

  //busco el usuario por email y comparo la contraseña
  async getUser(email, password) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw boom.unauthorized();;
    }
    delete user.dataValues.password;
    return user;
  }

  //creo el token con la info del usuario
  signToken(user) {
    const payload = { //payload es la info q va a viajar en el token
      sub: user.id,
      role: user.role
    }
    const token = jwt.sign(payload, config.jwtSecret); //creo el token con el payload y la clave secreta
    return {
      user,
      token
    };
  }

  //envío un mail con el link para recuperar la contraseña
  //voy a tener q generar una nueva migracion para Agregar el campo recoveryToken a la tabla de usuarios
  //para guardar el token de recuperación
  async sendRecovery(email) {
    //otra posible opción para obtener el dominio desde donde se está haciendo la petición para hacer el link.
    /*
        const url = `${req.protocol}://${req.get('host')}`
        const link = `${url}/recovery?token=${token}`
    */
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const payload = { sub: user.id }; //genero payload con el id del usuario
    const token = jwt.sign(payload, config.jwtSecret, {expiresIn: '15min'}); //genero el token(podría guardarlo en la DB y compararlo) con el payload y la clave secreta
    const link = `http://myfrontend.com/recovery?token=${token}`; //genero el link con el token
    await service.update(user.id, {recoveryToken: token});//actualizo el campo recoveryToken del usuario, mediante el método update de la clase UserService
    //configuro el mail
    const mail = {
      from: config.smtpEmail,
      to: `${user.email}`,
      subject: "Email para recuperar contraseña",
      html: `<b>Ingresa a este link => ${link}</b>`,
    }
    const rta = await this.sendMail(mail);//utilizo el método sendMail de esta clase
    return rta;
  }

  //cambio la contraseña del usuario - podría agregar un schema para validar la info q recibo
  async changePassword(token, newPassword) {
    try {
      const payload = jwt.verify(token, config.jwtSecret);//verifico el token
      const user = await service.findOne(payload.sub);//busco el usuario por el id q viene en el payload
      if (user.recoveryToken !== token) {
        throw boom.unauthorized();
      }
      const hash = await bcrypt.hash(newPassword, 10);//hasheo la nueva contraseña
      await service.update(user.id, {recoveryToken: null, password: hash});//actualizo el campo recoveryToken y la contraseña del usuario
      return { message: 'password changed' };
    } catch (error) {
      throw boom.unauthorized();
    }
  }
  //envío el mail
  async sendMail(infoMail) {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      secure: true,
      port: 465,
      auth: {
        user: config.smtpEmail,
        pass: config.smtpPassword
      }
    });
    await transporter.sendMail(infoMail);
    return { message: 'mail sent' };
  }
}


module.exports = AuthService;
