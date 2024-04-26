//
// app.put('/user', async (req, res) => {...});
//
// Inserts a new user into the database, or if the
// user already exists (based on email) then the
// user's data is updated (name and bucket folder).
// Returns the user's userid in the database.
//
const dbConnection = require("./database.js");

exports.put_user = async (req, res) => {
  console.log("call to put /user...");

  try {
    var data = req.body; // data => JS object

    let sql = "SELECT * FROM users WHERE email = ?";

    // query the database
    dbConnection.query(sql, [data.email], (err, users) => {
      if (err) {
        res.status(400).json({ message: err.message, data: [] });
        return;
      }

      // if the user exists, just update
      if (users.length > 0) {
        sql =
          "UPDATE users SET firstname = ?, lastname = ?, bucketfolder = ? WHERE email = ?";
        dbConnection.query(sql, [
          data.firstname,
          data.lastname,
          data.bucketfolder,
          data.email,
        ]);
        res.status(200).json({
          message: "updated",
          userid: users[0].userid,
        });
      }

      // if the user does not exist, insert
      else {
        sql =
          "INSERT INTO users(email, firstname, lastname, bucketfolder) values(?, ?, ?, ?)";
        dbConnection.query(sql,
          [data.email,
            data.firstname,
            data.lastname,
            data.bucketfolder],
          (err, result) => {
            if (err) {
              res.status(400).json({ message: err.message, userid: -1 });
              return;
            }
            // success
            res.status(200).json({
              message: "inserted",
              userid: result.insertId,
            });
          }
        );
      }
    });
  } catch (err) {
    //try
    console.log("**Error in call to put /user");
    console.log(err.message);

    res.status(400).json({
      message: err.message,
      userid: -1,
    });
  } //catch
}; //put
