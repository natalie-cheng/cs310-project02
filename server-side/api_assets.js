//
// app.get('/assets', async (req, res) => {...});
//
// Return all the assets from the database:
//
const dbConnection = require("./database.js");

exports.get_assets = async (req, res) => {
  console.log("call to get /assets...");

  try {
    // sql query
    let sql = "SELECT * FROM assets ORDER BY assetid ASC";
    let params = [];

    // query the database
    dbConnection.query(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({ message: err.message, data: [] });
        return;
      }

      // print the results
      res.status(200).json({ message: "success", data: rows });
    });
  } catch (err) {
    //try
    console.log("**Error in call to get /assets");
    console.log(err.message);

    res.status(400).json({
      message: err.message,
      data: [],
    });
  } //catch
}; //get
