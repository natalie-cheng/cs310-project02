//
// app.get('/assets', async (req, res) => {...});
//
// Return all the assets from the database:
//
const dbConnection = require('./database.js')

exports.get_assets = async (req, res) => {

  console.log("call to get /assets...");

  try {

    
    throw new Error("TODO: /assets");

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
    console.log("**Error in call to get /assets");
    console.log(err.message);
    
    res.status(400).json({
      "message": err.message,
      "data": []
    });
  }//catch

}//get
