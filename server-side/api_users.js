//
// app.get('/users', async (req, res) => {...});
//
// Return all the users from the database:
//
const dbConnection = require('./database.js')

exports.get_users = async (req, res) => {

  console.log("call to get /users...");

  try {

    
    throw new Error("TODO: /users");

    //
    // TODO: remember we did an example similar to this in class with
    // movielens database
    //
    // MySQL in JS:
    //   https://expressjs.com/en/guide/database-integration.html#mysql
    //   https://github.com/mysqljs/mysql
    //
    

  }//try
  catch (err) {
    console.log("**Error in call to get /users");
    console.log(err.message);
    
    res.status(400).json({
      "message": err.message,
      "data": []
    });
  }//catch

}//get
