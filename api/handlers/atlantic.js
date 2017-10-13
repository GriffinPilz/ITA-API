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

    var sql = "SELECT * FROM ITD.issues;";

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

module.exports.customers = {

  handler: function (request, reply) {

    var sql = "SELECT `First_Name`, `Last_Name`, `email`, `School_or_Company`, `Phone_Number`, `Valid` FROM `ITD`.`customer`;";

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


module.exports.atlanticEmployees = {

  handler: function (request, reply) {

    var sql = "SELECT * FROM ITD.Atlantic_Employees;";

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
    console.log("customer update");
    console.log(request.payload);
    let sql = "";
    let paramArray = [];

    if(request.payload.UserID == 0 )
    {
      sql = `insert into ITD.customer (First_Name, Last_Name, email, School_or_Company, Phone_Number, Password, Admin, Valid) 
        values (?,?,?,?,?,?,?,?)`;

      paramArray = [
        request.payload.First_Name, 
        request.payload.Last_Name, 
        request.payload.email, 
        request.payload.School_or_Company, 
        request.payload.Phone_Number, 
        request.payload.Password, 
        request.payload.Admin,
        request.payload.Valid
      ];
    }
    else
    {
      sql = `update ITD.customer
        set First_Name = ?,
            Last_Name = ?,
            email = ?,
            School_or_Company = ?,
            Phone_Number = ?,
            Password = ?,
            Admin = ?,
            Valid = ?,
        where UserID = ?`;

      paramArray = [ 
        request.payload.First_Name, 
        request.payload.Last_Name, 
        request.payload.email, 
        request.payload.School_or_Company, 
        request.payload.Phone_Number, 
        request.payload.Password, 
        request.payload.Admin, 
        request.payload.Valid,
        request.payload.UserID
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


module.exports.ticketInsert = {
  
  handler: function (request, reply) {
    console.log("ticket insert");
    console.log(request.payload);
    let sql = "";
    let paramArray = [];

    if(request.payload.Issue_Number == 0 )
    {
      sql = `insert into ITD.issues (Issue_Date, Issue_Due_Date, Issue_Description, Urgency, Status, Current_Assignment, Valid) 
        values (?,?,?,?,?,?,?)`;

      paramArray = [
        request.payload.Issue_Date, 
        request.payload.Issue_Due_Date, 
        request.payload.Issue_Description, 
        request.payload.Urgency, 
        request.payload.Status, 
        request.payload.Current_Assignment, 
        request.payload.Valid
      ];
    }
    else
    {
      sql = `update ITD.issues
            set Issue_Date = ?,
            Issue_Due_Date = ?,
            Issue_Description = ?,
            Urgency = ?,
            Status = ?,
            Current_Assignment = ?,
            Valid = ?,
        where Issue_Number = ?`;

      paramArray = [ 
        request.payload.Issue_Date, 
        request.payload.Issue_Due_Date, 
        request.payload.Issue_Description, 
        request.payload.Urgency, 
        request.payload.Status, 
        request.payload.Current_Assignment,  
        request.payload.Valid,
        request.payload.Issue_Number
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