const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Product = require('./models/product.model');
const Form = require('./models/form.model');
const Field = require('./models/field.model');
const Option = require('./models/option.model');

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const productRouter = require('./routes/app.route')(Product);
const formRouter = require('./routes/app.route')(Form);
const fieldRouter = require('./routes/app.route')(Field);
const optionRouter = require('./routes/app.route')(Option);

app.use('/api/products', productRouter);
app.use('/api/forms', formRouter);
app.use('/api/fields', fieldRouter);
app.use('/api/options', optionRouter);

app.get('/', (req, res) => {
  res.send('Welcome to Pricify API');
});

mongoose.connect('mongodb://localhost/pricify', (err) => {
  if(err) {
    throw err;
  } else {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Gulp is running my app on PORT: ${port}`);
    });
  }
});
