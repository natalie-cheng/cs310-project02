//
// app.get('/image/:assetid', async (req, res) => {...});
//
// downloads an asset from S3 bucket and sends it back to the
// client as a base64-encoded string.
//
const dbConnection = require("./database.js");
const { GetObjectCommand } = require("@aws-sdk/client-s3");
const { s3, s3_bucket_name, s3_region_name } = require("./aws.js");

exports.get_image = async (req, res) => {
  console.log("call to get /image/:assetid...");

  const asset_id = parseInt(req.params.assetid);

  try {
    // create promise
    let rows = new Promise((resolve, reject) => {
      // sql query
      let sql =
        "SELECT userid, assetname, bucketkey FROM assets WHERE assetid = ?";
      let params = [asset_id];

      // query the database
      dbConnection.query(sql, params, (err, rows, _) => {
        if (err) {
          res.status(400).json({ message: err.message, data: [] });
          return;
        }
        resolve(rows);
      });
    });

    // wait for the query
    let result = await rows;

    // check if asset exists
    if (result.length == 0) {
      return res.status(400).json({
        message: "no such asset...",
        userid: -1,
        asset_name: "?",
        bucket_key: "?",
        data: [],
      });
    }

    // get the bucket key
    const bucketKey = result[0].bucketkey;

    // set bucket and key for getObject
    const paramsS3 = {
      Bucket: s3_bucket_name,
      Key: bucketKey,
    };

    // get image from s3
    var image = await s3.send(new GetObjectCommand(paramsS3));

    // encode as base64
    var imageData = await image.Body.transformToString("base64");

    // print the results
    res.status(200).json({ message: "success", user_id: result[0].userid, asset_name: result[0].assetname, bucket_key: result[0].bucketkey, data: imageData});
  } catch (err) {
    //try
    console.log("**Error in call to get /image");
    console.log(err.message);

    res.status(400).json({
      message: err.message,
      user_id: -1,
      asset_name: "?",
      bucket_key: "?",
      data: [],
    });
  } //catch
}; //get
