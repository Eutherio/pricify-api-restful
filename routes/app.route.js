const express = require('express');


const routes = function(Model){
  const router = express.Router();
  const appController = require('../controllers/app.controller')(Model);

  router.route('/')
    .get(appController.displayAll)
    .post(appController.create);

  router.use('/:id', appController.findItemById);

  router.route('/:id')
    .get(appController.display)
    .put(appController.updateAll)
    .patch(appController.update)
    .delete(appController.remove);

  return router;
};

module.exports = routes;
