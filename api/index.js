const Home = require('./handlers/home');
const atlantic = require('./handlers/atlantic');

exports.register = (plugin, options, next) => {

  plugin.route([
    //GET
    { method: 'GET', path: '/', config: Home.hello },
    { method: 'GET', path: '/restricted', config: Home.restricted },
    { method: 'GET', path: '/{path*}', config: Home.notFound },
    { method: 'GET', path: '/atlantic', config: atlantic.dbHello },
    { method: 'GET', path: '/atlantic/issues', config: atlantic.issuesList },
    { method: 'GET', path: '/atlantic/customers', config: atlantic.customers },
    { method: 'GET', path: '/atlantic/atlanticEmployees', config: atlantic.atlanticEmployees },

    //POST
    { method: 'POST', path: '/atlantic/auth', config: atlantic.customerAuthCheck },
    { method: 'POST', path: '/atlantic/customerUpdate', config: atlantic.customerUpdate },
    { method: 'POST', path: '/atlantic/ticketInsert', config: atlantic.ticketInsert }
  ]);

  next();
};

exports.register.attributes = {
  name: 'api'
};

