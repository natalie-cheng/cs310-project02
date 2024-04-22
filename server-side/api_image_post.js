//
// app.post('/image/:userid', async (req, res) => {...});
//
// Uploads an image to the bucket and updates the database,
// returning the asset id assigned to this image.
//
const dbConnection = require('./database.js')
const { PutObjectCommand } = require('@aws-sdk/client-s3');
const { s3, s3_bucket_name, s3_region_name } = require('./aws.js');

const uuid = require('uuid');

exports.post_image = async (req, res) => {

  console.log("call to post /image/:userid...");

  try {

    var data = req.body;  // data => JS object

    throw new Error("TODO: /image");
    
	
	
	
  }//try
  catch (err) {
    console.log("**Error in call to post /image");
    console.log(err.message);
    
    res.status(400).json({
      "message": err.message,
      "assetid": -1
    });
  }//catch

}//post
