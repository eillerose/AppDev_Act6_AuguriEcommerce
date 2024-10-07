// Static admin credentials
const ADMIN_EMAIL = 'admin@auguri.com';
const ADMIN_PASSWORD = 'auguri123';

exports.login = (req, res) => {
  const { email, password } = req.body;
  
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    req.session.isAuthenticated = true;
    res.redirect('/admin/dashboard');
  } else {
    res.render('index', { title: 'Home', error: 'Invalid credentials' });
  }
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
    }
    res.redirect('/');
  });
};