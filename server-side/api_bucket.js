//
// app.get('/bucket?startafter=bucketkey', async (req, res) => {...});
//
// Retrieves the contents of the S3 bucket and returns the 
// information about each asset to the client. Note that it
// returns 12 at a time, use startafter query parameter to pass
// the last bucketkey and get the next set of 12, and so on.
//
const { ListObjectsV2Command } = require('@aws-sdk/client-s3');
const { s3, s3_bucket_name, s3_region_name } = require('./aws.js');

exports.get_bucket = async (req, res) => {

  console.log("call to get /bucket...");

  try {

    // startafter query parameter
    const startAfter = req.query.startafter;

    // parameters for ListObjectsV2 command
    const params = {
      Bucket: s3_bucket_name,
      MaxKeys: 12, 
      StartAfter: startAfter // startafter key
    };

    // create and execute listobjectsv2command
    const command = new ListObjectsV2Command(params);
    const response = await s3.send(command);

    // get contents
    const assets = response.Contents;

    // get keys from assets
    const keys = assets.map(asset => ({
      Key: asset.Key,
      LastModified: asset.LastModified,
      ETag: asset.ETag,
      Size: asset.Size,
      Storagetype: asset.StorageClass
    }));

    // print results
    res.status(200).json({ message: 'success', data: keys });
    

  }//try
  catch (err) {
    console.log("**Error in call to get /bucket");
    console.log(err.message);
    
    res.status(400).json({
      "message": err.message,
      "data": []
    });
  }//catch

}//get
