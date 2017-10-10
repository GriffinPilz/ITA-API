var mysql  = require('mysql');

var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : 'thereisnone',
  database : 'ITD',
  port     : '3306'
});

module.exports.dbHello = {
  handler: function (request, reply) {

    return reply({ result: 'DB Hello hapi!' });
  }
};

module.exports.issuesList = {

  handler: function (request, reply) {

    var sql = "SELECT * FROM ITD.final_itd;";

    connection.query(sql, [], function(err, rows, fields) {

      //Error Response
      if (err) throw err;

      //Invalid Response
      if(rows.length == 0)
      {
        return reply({"status":"Invalid"});
      }

      //Valid Login
      return reply(rows);

    });
  }

  
};

module.exports.customerAuthCheck = {

  handler: function (request, reply) {

    let sql = `select * from ITD.customer where email = ? and  Password = ? and Valid = 1;`;


    connection.query(sql, [request.payload.email, request.payload.Password], function(err, rows, fields) {

      //Error Response
      if (err) throw err;

      //Invalid Response
      if(rows.length == 0)
      {
        return reply({"status":"Invalid"});
      }

      //Valid Login
      return reply(rows);

    });
  }
};

module.exports.customerUpdate = {
  
  handler: function (request, reply) {
  
    let sql = "";
    let paramArray = [];

    if(request.payload.RowID == 0 )
    {
      sql = `insert into idp_custom_cart (Customer, CustomerURLParam, Image, WebURL, Active, password, BillToAddress,StdShipping, ExpShipping, M2MID, POTracking, creditCard, allowPO) 
        values (?,?,?,?,?,?,?,?,?,?,?,?,?)`;

      paramArray = [
        request.payload.Customer, 
        request.payload.CustomerURLParam, 
        request.payload.Image, 
        request.payload.WebURL, 
        request.payload.Active, 
        request.payload.password, 
        request.payload.BillToAddress, 
        request.payload.StdShipping, 
        request.payload.ExpShipping, 
        request.payload.M2MID, 
        request.payload.POTracking, 
        request.payload.creditCard, 
        request.payload.allowPO 
      ];
    }
    else
    {
      sql = `update idp_custom_cart
        set Customer = ?,
            CustomerURLParam = ?,
            Image = ?,
            WebURL = ?,
            Active = ?,
            password = ?,
            BillToAddress = ?,
            StdShipping = ?,
            ExpShipping = ?,
            M2MID = ?,
            POTracking = ?,
            creditCard = ?,
            allowPO = ?
        where RowID = ?`;

      paramArray = [
        request.payload.Customer, 
        request.payload.CustomerURLParam, 
        request.payload.Image, 
        request.payload.WebURL, 
        request.payload.Active, 
        request.payload.password, 
        request.payload.BillToAddress, 
        request.payload.StdShipping, 
        request.payload.ExpShipping, 
        request.payload.M2MID, 
        request.payload.POTracking, 
        request.payload.creditCard, 
        request.payload.allowPO,
        request.payload.RowID
      ];

    }
      
    connection.query(sql, paramArray, function(err, rows, fields) {
  
      //Error Response
      if (err) throw err;
  
      //Invalid Response
      if(rows.length == 0)
      {
        return reply({"status":"Invalid"});
      }
  
      //Valid 
      return reply({"status":"valid"});
  
    });
  }
};
