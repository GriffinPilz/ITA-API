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
    { method: 'GET', path: '/atlantic/employees', config: atlantic.employees },
    { method: 'POST', path: '/atlantic/issuesHistoryget', config: atlantic.issuesHistoryget },

    //POST
    { method: 'POST', path: '/atlantic/auth', config: atlantic.customerAuthCheck },
    { method: 'POST', path: '/atlantic/customerUpdate', config: atlantic.customerUpdate },
    { method: 'POST', path: '/atlantic/ticketInsert', config: atlantic.ticketInsert },
    { method: 'POST', path: '/atlantic/customerModalUpdate', config: atlantic.customerModalUpdate },
    { method: 'POST', path: '/atlantic/employeeModalUpdate', config: atlantic.employeeModalUpdate },
    { method: 'POST', path: '/atlantic/issueModalUpdate', config: atlantic.issueModalUpdate },
    { method: 'POST', path: '/atlantic/issueHistoryModalUpdate', config: atlantic.issueHistoryModalUpdate },
    { method: 'POST', path: '/atlantic/dayIssues', config: atlantic.dayIssues }
  ]);
  
  next();
};

exports.register.attributes = {
  name: 'api'
};

