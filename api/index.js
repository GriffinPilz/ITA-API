const Home = require('./handlers/home');
const atlantic = require('./handlers/atlantic');

exports.register = (plugin, options, next) => {

  plugin.route([
    { method: 'GET', path: '/', config: Home.hello },
    { method: 'GET', path: '/restricted', config: Home.restricted },
    { method: 'GET', path: '/{path*}', config: Home.notFound },
    { method: 'GET', path: '/atlantic', config: atlantic.dbHello },
    { method: 'GET', path: '/atlantic/issues', config: atlantic.issuesList }
  ]);

  next();
};

exports.register.attributes = {
  name: 'api'
};

