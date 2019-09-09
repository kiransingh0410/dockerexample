//var http = require('http');
var express = require('express')
var fs = require('fs')
var request = require('request')
var multer  = require('multer')
var upload = multer()

// var upload = multer({ dest: 'uploads/' })
const NodeClam = require('clamscan');
// Create Express app
const app = express()
var bodyParser = require('body-parser')
//var cors = require('cors');
//var multipart = require('connect-multiparty')
app.use(bodyParser.urlencoded({ extended: false }))

// A sample route
// app.get('/', GetMultipart() , (req, res) => {res.send('Hello World!');})
app.post('/GetMultipart', GetMultipart , function(req, res) {res.send('Hello World!');})
app.post('/scan', upload.array('file', 12), scan , function(req, res) {res.send('scanned');})
//app.post('/GetMultipart', (req, res) => GetMultipart()


// Start the Express server
app.listen(3001, () => console.log('Server running on port 3001!'))
// var server = http.createServer(function(req, res) {
//     res.writeHead(200, { "Content-type": "text/plain" });
//     res.end("Hello world\n");
// });

// server.listen(3001, function() {
//     console.log('Server is running at 3001')
// });

// router.get("/GetMultipart",GetMultipart())

function GetMultipart(req, res)
{
  console.log(req)
    console.log("i m called");
    const params = {
        "developmentAddress": "10199 River Drive, Richmond",
        "projectName": "Project Name",
        "developmentCompany": "Development Company Name",
        "city": "Richmond",
        "province": "AB",
        "familySize": "Multi-Family",
        "numberOfBuildings": "4",
        "numberOfFloors": "6",
        "units": "10",
        "numberOfLines": "9",
        "approximateSqFootage": "1134",
        "alarmLineTestingRequired": "Yes",
        "requestToBeFed": "Aerial",
        "terminalRoom": "Tel",
        "siteConstructionState": "Old Structure in Place",
        "isMultiBuildingProject":"Yes",
        "isThirdPartyROWRequest": "Yes",
        "relocationRequired": "Yes",
        "scopeOfRelocation": "To be discussed",
        "detailedProjectDescription": "project description",
        "developmentType": [
          "Assisted Living Facility"
        ],
        "shallowUtilityStartDate": "05-23-2019",
        "serviceRequiredByDate": "05-23-2019",
        "occupancyDate": "05-24-2019",
        "deepsCompletion": "05-24-2019",
        "drawingsRequestEstimatedTime": "05-26-2019",
        "roadCrossingsDate": "05-28-2019",
        "permitsApplicableEstimate": "06-20-2019",
        "fireElevatorAlarmLinesTesting": "06-24-2019",
        "plannedPoleRelocationDate": "06-28-2019",
        "contact": [
          {
            "CompanyName": "Company Name",
            "ContactName": "abc",
            "Phone": "9876543211",
            "Address": "Sec:6, B block",
            "Email": "abc@gmail.com",
            "Type": "Development"
          },
          {
            "CompanyName": "Company Name",
            "ContactName": "abc",
            "Phone": "9876543211",
            "Address": "Sec:6, B block",
            "Email": "abc@gmail.com",
            "Type": "Engineering"
          },
          {
           "CompanyName": "Company Name",
            "ContactName": "abc",
            "Phone": "9876543211",
            "Address": "Sec:6, B block",
            "Email": "abc@gmail.com",
            "Type": "Electrical"
          },
          {
            "CompanyName": "Company Name",
            "ContactName": "abc",
            "Phone": "9876543211",
            "Address": "Sec:6, B block",
            "Email": "abc@gmail.com",
            "Type": "Power"
          },
          {
            "CompanyName": "Company Name",
            "ContactName": "abc",
            "Phone": "9876543211",
            "Address": "Sec:6, B block",
            "Email": "abc@gmail.com",
            "Type": "Construction"
          },
      
          {
           "CompanyName": "Company Name",
            "ContactName": "abc",
            "Phone": "9876543211",
            "Address": "Sec:6, B block",
            "Email": "abc@gmail.com",
            "Type": "ROW"
          },
          {
            "CompanyName": "Company Name",
            "ContactName": "abc",
            "Phone": "9876543211",
            "Address": "Sec:6, B block",
            "Email": "abc@gmail.com",
            "Type": "Relocation"
          },
          {
            "CompanyName": "Company Name",
            "ContactName": "abc",
            "Phone": " 9876543211",
            "Address": "Sec:6, B block",
            "Email": "abc@gmail.com",
            "Type": "LowVoltage"
          }
        ],
        "furtherDetails": "Further Details Data",
        "developerRemarks": " Developer Remarks Data",
        "fileTypesAttached":[
               "Electronic File",
               "Site Plans",
               "Electrical Plans"
            ]
      }

      let fileToUpload = req.file;

      let formData = {
        "formjson": JSON.stringify(params),
        "file" : {
          value: fs.createReadStream(Buffer.from(req.file.buffer)),
          options: {
            filename: fileToUpload.originalname,
            contentType: fileToUpload.mimeType
          }
        }
      };
      // let options = {
      //   url: url,
      //   method: 'POST',
      //   formData: formData
      // }
      // request(options, function (err, resp, body) {
      //   if (err)
      //     cb(err);
      
      //   if (!err && resp.statusCode == 200) {
      //     cb(null, body);
      //   }
      // });



       //const stream = require("stream");
      // bufferStream.pipe(res);
      // let readStream = new stream.PassThrough();
      // readStream.end(new Buffer('Test data.'));
      
      // // You now have the stream in readStream
      // readStream.once("open", () => {
      //     // etc
      // });

      // readStream.once("close")
      // const stream = require("stream");

      // let readStream = new stream.PassThrough();
      // readStream.end(Buffer.from(req.file.buffer));

      //const bufferStream = new stream.PassThrough();
      //bufferStream.pipe(req.file);


    const options = {
         method: "POST",
        url: "https://ngmportal2-proxy-stage.ca-c1.cloudhub.io/api/v2/intake",       
        headers: {            
            "Client_ID":"e38740a9f1744ae698157042486fb8d4",
            "Client_Secret":"fA063c13d86344d1A9d1040f476ec1c8",
            "Content-Type": "application/json"
        },
        formData : formData
    };
    console.log("i m called1", options);
    request(options, function (err, res, body) {
        console.log("called------------", res);
        //if(err) console.log('====',err);
        //console.log(body);
       // console.log(res);
        //res.send(JSON.stringify(err));
    });





  }


function scan(req,res)
{
  console.log(req.files[0].toString());
  // const Clamscan = new NodeClam().init({
  //   clamscan: {
  //         path: '/usr/local/etc/clamav/',
  //         db: null, // Path to a custom virus definition database
  //         scan_archives: true, // If true, scan archives (ex. zip, rar, tar, dmg, iso, etc...)
  //         active: true },
  //         preference: 'clamscan'});

  const options = {
      clamscan: {
            path: '/usr/local/Cellar/clamav/0.101.4_1/bin/clamscan',
            db: null, // Path to a custom virus definition database
            scan_archives: true, // If true, scan archives (ex. zip, rar, tar, dmg, iso, etc...)
            active: true },
            preference: 'clamscan'}


          async function some_function() {
            try {
                // Get instance by resolving ClamScan promise object
                const clamscan = await new NodeClam().init(options);
                //const {is_infected, file, viruses} = 
                await clamscan.is_infected('/Users/kiransingh/Downloads/a.txt',(err, file, is_infected, viruses) => {
                  if (err) return console.error(err);
               
                  if (is_infected) {
                      console.log(`${file} is infected with ${viruses.join(', ')}.`);
                  }
                  else {res.send("Scanning Done")}
              });
        // if (is_infected) console.log(`${file} is infected with ${viruses}!`);
        // else {res.send("Scanning Done")}
            }
            catch (err) {
              console.log(1,err)
                // Handle any errors raised by the code in the try block
            }
        }
         
        some_function();

// try {
//   ClamScan.then(async clamscan => {
//     try {
//         // You can re-use the `clamscan` object as many times as you want
//         const version = await clamscan.get_version();
//         console.log(`ClamAV Version: ${version}`);
 
//         const {is_infected, file, viruses} = await clamscan.is_infected('/Downloads/ABC_Xavient.doc');
//         if (is_infected) console.log(`${file} is infected with ${viruses}!`);
//     } catch (err) {
//        console.log(1,err)
//     }
// }).catch(err => {
//   console.log(2,err)
//     // Handle errors that may have occurred during initialization
// });
// }
// catch (err) {
//   console.error(err);
//   process.exit(1);
// }

// const ClamScan = new NodeClam().init({
//   remove_infected: false, // If true, removes infected files
//   quarantine_infected: false, // False: Don't quarantine, Path: Moves files to this place.
//   scan_log: null, // Path to a writeable log file to write scan results into
//   debug_mode: false, // Whether or not to log info/debug/error msgs to the console
//   file_list: null, // path to file containing list of files to scan (for scan_files method)
//   scan_recursively: true, // If true, deep scan folders recursively
//   clamscan: {
//       path: '/usr/local/etc/clamav/', // Path to clamscan binary on your server
//       db: null, // Path to a custom virus definition database
//       scan_archives: true, // If true, scan archives (ex. zip, rar, tar, dmg, iso, etc...)
//       active: true // If true, this module will consider using the clamscan binary
//   },
//   clamdscan: {
//       socket: false, // Socket file for connecting via TCP
//       host: false, // IP of host to connect to TCP interface
//       port: false, // Port of host to use when connecting via TCP interface
//       timeout: 60000, // Timeout for scanning files
//       local_fallback: false, // Do no fail over to binary-method of scanning
//       path: '/usr/bin/clamdscan', // Path to the clamdscan binary on your server
//       config_file: null, // Specify config file if it's in an unusual place
//       multiscan: true, // Scan using all available cores! Yay!
//       reload_db: false, // If true, will re-load the DB on every call (slow)
//       active: true, // If true, this module will consider using the clamdscan binary
//       bypass_test: false, // Check to see if socket is available when applicable
//   },
//   preference: 'clamdscan' // If clamdscan is found and active, it will be used by default
// });
// console.log(ClamScan);
// ClamScan.then(async clamscan => {
//   try {
//       // You can re-use the `clamscan` object as many times as you want
//       const version = await clamscan.get_version();
//       console.log(`ClamAV Version: ${version}`);

//       const {is_infected, file, viruses} = await clamscan.is_infected(req.file);
//       if (is_infected) console.log(`${file} is infected with ${viruses}!`);
//   } catch (err) {
//     console.log(1,err);
//   }
// }).catch(err => {
//   console.log(2,err);
// });
}