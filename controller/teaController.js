const teaController = {
    index: (req, res) => {
        res.render('index', {title: 'teaController'});
    },
    about: (req, res) => {
        res.render('about', {title: 'teaController'});
    },
    product: (req, res) => {
        res.render('product', {title: 'teaController'});
    },
    service: (req, res) => {
        res.render('service', {title: 'teaController'});
    },
    gallery: (req, res) => {
        res.render('gallery', {title: 'teaController'});
    },
    contact: (req, res) => {
        res.render('contact', {title: 'teaController'});
    },
    cart: (req, res) => {
      res.render('cart', {title: 'teaController'});
    },
    faqs: (req, res) => {
        res.render('faqs', {title: 'teaController'});
    },
    help: (req, res) => {
        res.render('help', {title: 'teaController'});
    },
    };
  
  module.exports = teaController;