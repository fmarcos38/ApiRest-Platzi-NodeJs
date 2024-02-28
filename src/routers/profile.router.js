const express = require('express');
const passport = require('passport');
const OrderService = require('../services/order.service');

const router = express.Router();
const orderService = new OrderService();

//endpoint para obt las ordenes de un cliente SIN pasar el ID por url, lo obtiene del token
router.get('/my-orders',
  passport.authenticate('jwt', { session: false }),
  async(req, res) => {
    try {
      //obtngo el id del usuario del token --> req.user.sub
      const orders = await orderService.findOrderByUser(req.user.sub);
      res.json(orders);
    } catch (error) {

    }
});

module.exports = router;
