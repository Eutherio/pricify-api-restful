const appController = function(Model){

  const modelName = Model.collection.name;
  const modelFields = Model.schema.paths;
  const modelFieldNames = Object.keys(modelFields);

  const findItemById = (req, res, next) => {
    Model.findById(req.params.id, (err, item) => {
      if(err){
        res.status(500).send(err);
      } else if (item) {
        req.item = item;
        next();
      } else {
        res.status(404).send(`Error: No ${modelName.slice(0, -1)} found`);
      }
    });
  };

  const displayAll = (req, res) => {
    let query = {};
    let proceed = true;
    if (Object.keys(req.query).length > 0) {
      for (let p in req.query) {
        if (modelFieldNames.indexOf(p) >= 0) {
          query[p] = req.query[p];
        } else {
          proceed = false;
          res.status(400).send(`Error: [${p}] field not present in [${modelName}] table`);
          break;
        }
      }
    }
    if(proceed){
      Model.find(query, (err, result) => {
        if(err){
          res.status(500).send(err);
        } else {
          if(result.length > 0) {
            let returnItem = [];
            result.forEach(elem => {
              let newItem = elem.toJSON();
              newItem.links = {};
              newItem.links.self = `http://${req.headers.host}/api/${modelName}/${newItem._id}`;
              returnItem.push(newItem);
            });
            res.json(returnItem);
          } else {
            res.status('404').send(`Error: No ${modelName} found`);
          }
        }
      });
    }
  };

  const create = (req, res) => {
    let item = new Model(req.body);

    item.save();
    res.status(201).send(item);
  };

  const display = (req, res) => {
    let returnItem = req.item.toJSON();
    let filter;

    returnItem.links = {};

    for (let index in modelFields ) {
      if (modelFields[index].instance === 'ObjectID' && index !== '_id' && returnItem[index]) {
        filter = `FilterByThis${index[0].toUpperCase()}${index.slice(1)}`;
        returnItem.links[filter] = `http://${req.headers.host}/api/${modelName}/?${index}=${returnItem[index]}`;
      }
    }
    res.json(returnItem);
  };

  const updateAll = (req, res) => {
    if(req.body._id){
      delete req.body._id;
    }
    const bodyLength = Object.keys(req.body).length;
    if (bodyLength < (modelFieldNames.length - 2)) {
      res.status(400).send('Error: Missing fields!');
    } else if (bodyLength > (modelFieldNames.length - 2)) {
      res.status(400).send('Error: Too many fields!');
    } else {
      for (let p in req.body) {
        req.item[p] = req.body[p];
      }
      req.item.save(err => {
        if(err){
          res.status(200).send(err);
        } else {
          res.json(req.item);
        }
      });
    }
  };

  const update = (req, res) => {
    if(req.body._id){
      delete req.body._id;
    }
    for (let p in req.body) {
      req.item[p] = req.body[p];
    }
    req.item.save(err => {
      if(err){
        res.status(500).send(err);
      } else {
        res.json(req.item);
      }
    });
  };

  const remove = (req, res) => {
    req.item.remove(err => {
      if(err){
        res.status(500).send(err);
      } else {
        res.status(204).end();
      }
    });
  };

  return {
    findItemById,
    create,
    remove,
    updateAll,
    update,
    displayAll,
    display
  };
};

module.exports = appController;
