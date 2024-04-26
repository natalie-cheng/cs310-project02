//
// app.get('/users', async (req, res) => {...});
//
// Return all the users from the database:
//
const dbConnection = require("./database.js");

exports.get_users = async (req, res) => {
  console.log("call to get /users...");

  try {
    // sql query
    let sql = "SELECT * FROM users ORDER BY userid ASC";
    let params = [];

    // query the database
    dbConnection.query(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({ message: err.message, data: [] });
        return;
      }

      // print results
      res.status(200).json({ message: "success", data: rows });
    });
  } catch (err) {
    //try
    console.log("**Error in call to get /users");
    console.log(err.message);

    res.status(400).json({
      message: err.message,
      data: [],
    });
  } //catch
}; //get
