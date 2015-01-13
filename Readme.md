serenity storage
---

Common npm module for serenity applications.

This module provides file storage funcitonality.

It exports two methods

- getDownloadUrl

  Returns a URI to upload the file to
  
- getUploadUrl
  
  Returns a URI to file to download
  

Each of the methods takes two arguments, a) file model and b) callback function to call after processing. The callback function should have following two arguments

```
function callback(error, result) {
    if(error) {
        // do something return error to client
    }
    // process the result
}
```

serenity storage currently supports following storage providers

- local (store files on local filesystem)
- s3 (store files in amazon s3 storage)

File model should define a string property by the name 'storageLocation' which should equal one of the supported storage providers.

NOTE: The name of the provider may or may not be case sensitive depending on the file system. But it is very strongly recommended to use the name as if they are case sensitive. Node.js internal module loading is case sensitive

The providers is initialized based on the configuration object passed during initilization by the application.

To use s3 storage provider following configuration should be defined

```
aws: {
   accessKeyId:       <REQUIRED> <STRING> 'aws s3 access id',
   secretAccessKey:   <REQUIRED> <STRING> 'aws s3 secret key',
   bucket:            <REQUIRED> <STRING> 'aws s3 bucket name',
   region:            <REQUIRED> <STRING> 'aws s3 bucket region'
}
 ```
 
 How to install?

 Install via npm and git

 ```
 npm install git+https://github.com/riteshsangwan/serenity-storage.git
 ```

 How to use ?
 
 Include the serenity-storage in your file using ```require```
 ```
 var storageLib = require('serenity-storage')(config);
 // to get download uri
 storageLib.getDownloadUrl(file, function(error, result) {
    if(error) {
        // send error to client
        res.status(500).send(error);
    }
    // process the result and send to client
    res.status(200).send(result);
 }):
 ```