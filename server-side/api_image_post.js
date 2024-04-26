//
// app.post('/image/:userid', async (req, res) => {...});
//
// Uploads an image to the bucket and updates the database,
// returning the asset id assigned to this image.
//
const dbConnection = require("./database.js");
const { PutObjectCommand } = require("@aws-sdk/client-s3");
const { s3, s3_bucket_name, s3_region_name } = require("./aws.js");

const uuid = require("uuid");

exports.post_image = async (req, res) => {
  console.log("call to post /image/:userid...");


  const userid = req.params.userid;

  try {
    var data = req.body; // data => JS object

    // create promise
    let users = new Promise((resolve, reject) =>{
      // sql query
      let sql = "SELECT * FROM users WHERE userid = ?";
      
      // query the database
      dbConnection.query(sql, [userid], (err, users) =>{
        if (err) {
          res.status(400).json({ message: err.message, data: [] });
          return;
        }
        resolve(users);
      });
    });

    // wait for the query
    let result = await users;

    // if the user does not exist, throw error
    if (result.length==0) {
      res.status(400).json({ message: "no such user...", assetid: -1 });
      return;
    }

    // if the user does exist
    else {
      const bucketkey = `${result[0].bucketfolder}/${uuid.v4()}.jpg`;

      // decode data
      let bytes = Buffer.from(data.data, "base64");

      // parameters
      const params = {
        Bucket: s3_bucket_name,
        Key: bucketkey,
        Body: bytes,
        ContentType: "image/jpeg",
        ACL: "public-read",
      };

      // upload image to s3
      await s3.send(new PutObjectCommand(params));

      // insert new asset into database
      sql =
        "INSERT INTO assets(userid, assetname, bucketkey) values(?, ?, ?)";
      dbConnection.query(sql, 
        [userid,
        data.assetname,
        bucketkey,],
        (err, result) => {
          if (err) {
            res.status(400).json({ message: err.message, userid: -1 });
            return;
          }
          res.status(200).json({
            message: "success",
            assetid: result.insertId,
          });

        });
    }
  } catch (err) {
    //try
    console.log("**Error in call to post /image");
    console.log(err.message);

    res.status(400).json({
      message: err.message,
      assetid: -1,
    });
  } //catch
}; //post
