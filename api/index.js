const Home = require('./handlers/home');
const company = require('./handlers/company');

exports.register = (plugin, options, next) => {

  plugin.route([
    //GET
    { method: 'GET', path: '/', config: Home.hello },
    { method: 'GET', path: '/restricted', config: Home.restricted },
    { method: 'GET', path: '/{path*}', config: Home.notFound },
    { method: 'GET', path: '/company', config: company.dbHello },
    { method: 'GET', path: '/company/issues', config: company.issuesList },
    { method: 'GET', path: '/company/customers', config: company.customers },
    { method: 'GET', path: '/company/employees', config: company.employees },
    { method: 'POST', path: '/company/issuesHistoryget', config: company.issuesHistoryget },

    //POST
    { method: 'POST', path: '/company/auth', config: company.customerAuthCheck },
    { method: 'POST', path: '/company/customerUpdate', config: company.customerUpdate },
    { method: 'POST', path: '/company/ticketInsert', config: company.ticketInsert },
    { method: 'POST', path: '/company/customerModalUpdate', config: company.customerModalUpdate },
    { method: 'POST', path: '/company/employeeModalUpdate', config: company.employeeModalUpdate },
    { method: 'POST', path: '/company/issueModalUpdate', config: company.issueModalUpdate },
    { method: 'POST', path: '/company/issueHistoryModalUpdate', config: company.issueHistoryModalUpdate },
    { method: 'POST', path: '/company/dayIssues', config: company.dayIssues }
  ]);
  
  next();
};

exports.register.attributes = {
  name: 'api'
};

