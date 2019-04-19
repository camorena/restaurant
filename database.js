var mysql = require("mysql");

var db = mysql.createConnection({
  host: "localhost",
  port: 8889,
  user: "root",
  password: "Datelica2019",
  database: "restaurant"
});
db.connect(err => {
  if (err) throw err;
  console.log("connected to database");
});

function getData(category, back) {
  var query;
  switch (category) {
    case "all":
      query = "SELECT * FROM reservations";
      break;
    case "tables":
      query = "SELECT * FROM reservations WHERE table_number IS NOT NULL";
      break;
    case "waitlist":
      query = "SELECT * FROM reservations WHERE table_number IS NULL";
      break;
  }

  db.query(query, (err, data) => {
    if (err) throw err;
    back(data);
  });
}

function addReservation(data, back) {
  var fields = {
    id: data.id,
    name: data.name,
    phone: data.phone,
    email: data.email
  };

  db.query("SELECT * FROM reservations", fields.id, (err, data) => {
    if (err) throw err;

    if (data.find(row => row.id === fields.id)) {
      back({ error: "ID already used" });
      return;
    }

    for (var i = 1; i < 6; i++) {
      console.log(i);
      if (!data.find(row => row.table_number == i)) {
        fields.table_number = i;
        break;
      }
    }

    db.query("INSERT INTO reservations SET ?", fields, err => {
      back(fields);
    });
  });
}

module.exports = {
  getTables: function(back) {
    getData("tables", back);
  },
  getWaitlist: function(back) {
    getData("waitlist", back);
  },
  addReservation: addReservation,
  end: function() {
    db.end();
  }
};

/*

TO USE:

var database = require('./database.js');

database.getTables(function(data) {
	res.json(data);
});

database.addReservation(req.body, function(data) {
	res.json(data);
});

*/
