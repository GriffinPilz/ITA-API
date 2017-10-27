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

module.exports.issuesHistoryget = {

  handler: function (request, reply) {

    var sql = "SELECT `Issue_Number`,`ID`,`Notes`,DATE_FORMAT(Date_Added, '%Y-%m-%e  %T') as 'Date_Added',`WorkerID`,`Valid` FROM ITD.issue_history where Valid = 1 and Issue_Number = ?;";

    connection.query(sql, [request.payload.Issue_Number], function(err, rows, fields) {

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

module.exports.issuesList = {

  handler: function (request, reply) {

    var sql = "SELECT `Issue_Number`,`User_ID`,`School_or_Company`,`Issue_Description`,DATE_FORMAT(Issue_Date, '%Y-%m-%e  %T') as 'Issue_Date', DATE_FORMAT(DATE_ADD(Issue_Date, INTERVAL Urgency DAY), '%Y-%m-%e  %T') as 'Issue_Due_Date',`Urgency`,`Status`,`Current_Assignment` FROM ITD.issues;";

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

    var sql = "SELECT * FROM ITD.customer where Valid = 1;";

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


module.exports.employees = {

  handler: function (request, reply) {

    var sql = "select * from Employees where Valid = 1;";

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

    let sql = `select * from ITD.customer where email = ? and  Password = md5(concat('1!@2test', ?)) and Valid = 1;`;


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
      values (?,?,?,?,?,md5(concat('1!@2test', ?)),?,?);`;

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
            Valid = ?
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
      sql = `insert into ITD.issues (Issue_Date, User_ID, School_or_Company, Issue_Due_Date, Issue_Description, Urgency, Status, Current_Assignment) 
        values (?,?,?,?,?,?,?,?)`;

      paramArray = [
        request.payload.Issue_Date,
        request.payload.User_ID,
        request.payload.School_or_Company, 
        request.payload.Issue_Due_Date, 
        request.payload.Issue_Description, 
        request.payload.Urgency, 
        request.payload.Status, 
        request.payload.Current_Assignment
      ];
    }
    else
    {
      sql = `update ITD.issues
            set User_ID = ?,
            School_or_Company = ?,
            Issue_Date = ?,
            Issue_Due_Date = ?,
            Issue_Description = ?,
            Urgency = ?,
            Status = ?,
            Current_Assignment = ?
        where Issue_Number = ?`;

      paramArray = [ 
        request.payload.User_ID,
        request.payload.School_or_Company,
        request.payload.Issue_Date, 
        request.payload.Issue_Due_Date, 
        request.payload.Issue_Description, 
        request.payload.Urgency, 
        request.payload.Status, 
        request.payload.Current_Assignment,  
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



module.exports.customerModalUpdate = {
  
  handler: function (request, reply) {
    console.log("customer update");
    console.log(request.payload);
    let sql = "";
    let paramArray = [];

    if(request.payload.UserID == 0 )
    {
      sql = `insert into ITD.customer (First_Name, Last_Name, email, School_or_Company, Phone_Number, Valid) 
        values (?,?,?,?,?,?)`;

      paramArray = [
        request.payload.First_Name, 
        request.payload.Last_Name, 
        request.payload.email, 
        request.payload.School_or_Company, 
        request.payload.Phone_Number, 
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
            Valid = ?
        where UserID = ?`;

      paramArray = [ 
        request.payload.First_Name, 
        request.payload.Last_Name, 
        request.payload.email, 
        request.payload.School_or_Company, 
        request.payload.Phone_Number,  
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

module.exports.employeeModalUpdate = {
  
  handler: function (request, reply) {
    console.log("worker update");
    console.log(request.payload);
    let sql = "";
    let paramArray = [];

    if(request.payload.WorkerID == 0 )
    {
      sql = `insert into ITD.Employees (Name, Email,Phone, Valid) 
        values (?,?,?,?)`;

      paramArray = [
        request.payload.Name, 
        request.payload.email, 
        request.payload.Phone_Number, 
        request.payload.Valid
      ];
    }
    else
    {
      sql = `update ITD.Employees
        set Name = ?,
            Email = ?,
            Phone = ?,
            Valid = ?
        where WorkerID = ?`;

      paramArray = [ 
        request.payload.Name, 
        request.payload.Email, 
        request.payload.Phone,  
        request.payload.Valid,
        request.payload.WorkerID
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

module.exports.issueModalUpdate = {
  
  handler: function (request, reply) {

    let sql = "";
    let paramArray = [];

    if(request.payload.Issue_Number == 0 )
    {
      sql = `insert into ITD.issues (User_ID, School_or_Company,Issue_Description, Issue_Date, Issue_Due_Date, Urgency, Status, Current_Assignment) 
        values (?,?,?,?,?,?,?,?)`;

      paramArray = [
        request.payload.User_ID, 
        request.payload.School_or_Company, 
        request.payload.Issue_Description, 
        request.payload.Issue_Date,
        request.payload.Issue_Due_Date,
        request.payload.Urgency,
        request.payload.Status,
        request.payload.Current_Assignment
      ];
    }
    else
    {
      sql = `update ITD.issues
        set User_ID = ?,
            School_or_Company = ?,
            Issue_Description = ?,
            Issue_Date = ?,
            Issue_Due_Date = ?,
            Urgency = ?,
            Status = ?,
            Current_Assignment = ?
        where Issue_Number = ?`;

      paramArray = [ 
        request.payload.User_ID, 
        request.payload.School_or_Company, 
        request.payload.Issue_Description,  
        request.payload.Issue_Date,
        request.payload.Issue_Due_Date,
        request.payload.Urgency,
        request.payload.Status,
        request.payload.Current_Assignment,
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

module.exports.issueHistoryModalUpdate = {
  
  handler: function (request, reply) {
    console.log("issueHistory update");
    console.log(request.payload);
    let sql = "";
    let paramArray = [];

    if(request.payload.ID == 0 )
    {
      sql = `insert into ITD.issue_history (Issue_Number, Notes, Valid, WorkerID, Date_Added) 
        values (?,?,?,?)`;

      paramArray = [
        request.payload.Issue_Number,
        request.payload.Notes, 
        request.payload.Valid, 
        request.payload.WorkerID,
        request.payload.Date_Added
      ];
    }
    else
    {
      sql = `update ITD.issue_history
        set Issue_Number = ?
            Notes = ?,
            Valid = ?,
            WorkerID = ?,
            Date_Added = ?
        where ID = ?`;

      paramArray = [ 
        request.payload.Issue_Number,
        request.payload.Notes, 
        request.payload.Valid,
        request.payload.WorkerID,
        request.payload.Date_Added,
        request.payload.ID
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

module.exports.dayIssues = {

  handler: function (request, reply) {

    let sql = `SELECT * FROM ITD.issues where Date_Format (Issue_Due_Date,  '%Y-%m-%d')  = Date_Format (CURDATE() + ?,  '%Y-%m-%d')`;


    connection.query(sql, [request.payload.day], function(err, rows, fields) {

      //Error Response
      if (err) throw err;

      //Invalid Response
      if(rows.length == 0)
      {
        console.log(rows);
        return reply(rows);
      }

      //Valid Login
      return reply(rows);

    });
  }
};