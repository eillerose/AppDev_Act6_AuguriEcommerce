const teaController = {
    index: (req, res) => {
        res.render('index', { title: 'teaController' });
    },
    about: (req, res) => {
        res.render('about', { title: 'About Us' });
    },
    product: (req, res) => {
        res.render('product', { title: 'Products' });
    },
    service: (req, res) => {
        res.render('service', { title: 'Services' });
    },
    gallery: (req, res) => {
        res.render('gallery', { title: 'Gallery' });
    },
    contact: (req, res) => {
        res.render('contact', { title: 'Contact Us' });
    }
  };
  
  module.exports = teaController;
  