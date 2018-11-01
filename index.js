var SERVER_NAME = 'patient-api'
var PORT = process.env.PORT || 8000;
var HOST = '127.0.0.1';
var getRequestCounter = 0;
var postRequestCounter = 0;
var putRequestCounter = 0;
var deleteRequestCounter = 0;
var patientArray = [];

var restify = require('restify')

  // Get a persistence engine for the patients
  , patientsSave = require('save')('patients')

  // Create the restify server
  , server = restify.createServer({ first_name: SERVER_NAME})

  server.listen(PORT, function () {
  console.log('Server %s listening at %s', server.first_name, server.url)
  console.log('Resources:')
  console.log(' /patients')
  console.log(' /patients/:id')  
})

//test the git repository, if this comment occurs with the git commit. Then git repository is successfully set.
server
  // Allow the use of POST
  .use(restify.fullResponse())

  // Maps req.body to req.params so there is no switching between them
  .use(restify.bodyParser())

// Get all patients in the system
server.get('/patients', function (req, res, next) {
  getRequestCounter++;
  console.log('received GET request.');
  console.log("Processed Request Counter --> GET: " +  getRequestCounter + ", POST: " + postRequestCounter + ", PUT: " + putRequestCounter +", DELETE: " +deleteRequestCounter);

  // Find every entity within the given collection
  patientsSave.find({}, function (error, patients) {

    // Return all of the patients in the system
    res.send(patients)
    console.log('Sending response to GET request.');
  })
})

// Get a single patient by its patient id
server.get('/patients/:id', function (req, res, next) {
  getRequestCounter++;
  console.log('received GET request.');
  console.log("Processed Request Counter --> GET: " +  getRequestCounter + ", POST: " + postRequestCounter + ", PUT: " + putRequestCounter +", DELETE: " +deleteRequestCounter);
  // Find a single patient by their id within save
  patientsSave.findOne({ _id: req.params.id }, function (error, patient) {

    // If there are any errors, pass them to next in the correct format
    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))

    if (patients) {
      // Send the patient if no issues
      res.send(patient)
      console.log('Sending response to GET request.');
    } else {
      // Send 404 header if the patient doesn't exist
      res.send(404)
      console.log("Error occurred in sending Response.");
    }
  })
})

// Create a new patient
server.post('/patients', function (req, res, next) {
  postRequestCounter++;
  console.log('received POST request.');
  console.log("Processed Request Counter --> GET: " +  getRequestCounter + ", POST: " + postRequestCounter + ", PUT: " + putRequestCounter +", DELETE: " +deleteRequestCounter);
  
  // Make sure first_name is defined
  if (req.params.first_name === undefined ) {
    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError('first_name must be supplied'))
  }
  if (req.params.last_name === undefined ) {
    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError('last_name must be supplied'))
  }
  if (req.params.blood_group === undefined ) {
    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError('blood_group must be supplied'))
  }
  if (req.params.address === undefined ) {
    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError('address must be supplied'))
  }
  if (req.params.date_of_birth === undefined ) {
    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError('date_of_birth must be supplied'))
  }
  if (req.params.date_admitted === undefined ) {
    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError('date_admitted must be supplied'))
  }
  if (req.params.department === undefined ) {
    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError('department must be supplied'))
  }
  if (req.params.doctor === undefined ) {
    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError('doctor must be supplied'))
  }
  if (req.params.ailment === undefined ) {
    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError('ailment must be supplied'))
  }
  var newpatient = {
		first_name: req.params.first_name, 
    last_name: req.params.last_name,
    blood_gorup: req.params.blood_gorup,
    address: req.params.address,
    date_of_birth: req.params.date_of_birth,
    date_admitted: req.params.date_admitted,
    department: req.params.department,
    doctor: req.params.doctor,
    ailment:req.params.ailment
	}
  
  // Create the patient using the persistence engine
  patientsSave.create( newpatient, function (error, patient) {
    
    // If there are any errors, pass them to next in the correct format
    if (error) {
      console.log('Error on creating patient.');
      return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)));
    }
    
    // Send the patient if no issues
    res.send(201, patient)
    patientArray.push(patient);
    console.log('patient Array: ' + patientArray);
    
  })
  console.log('Sending response to POST request.');
})

// Update a patient by their id
server.put('/patients/:id', function (req, res, next) {
  putRequestCounter++;
  console.log('received PUT request.');
  console.log("Processed Request Counter --> GET: " +  getRequestCounter + ", POST: " + postRequestCounter + ", PUT: " + putRequestCounter +", DELETE: " +deleteRequestCounter);
  
  // Make sure first_name is defined
  if (req.params.first_name === undefined ) {
    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError('first_name must be supplied'))
  }
  if (req.params.last_name === undefined ) {
    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError('last_name must be supplied'))
  }
  if (req.params.blood_group === undefined ) {
    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError('blood_group must be supplied'))
  }
  if (req.params.address === undefined ) {
    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError('address must be supplied'))
  }
  if (req.params.date_of_birth === undefined ) {
    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError('date_of_birth must be supplied'))
  }
  if (req.params.date_admitted === undefined ) {
    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError('date_admitted must be supplied'))
  }
  if (req.params.department === undefined ) {
    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError('department must be supplied'))
  }
  if (req.params.doctor === undefined ) {
    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError('doctor must be supplied'))
  }
  if (req.params.ailment === undefined ) {
    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError('ailment must be supplied'))
  }
  
  var newpatient = {
		first_name: req.params.first_name, 
    last_name: req.params.last_name,
    blood_gorup: req.params.blood_gorup,
    address: req.params.address,
    date_of_birth: req.params.date_of_birth,
    date_admitted: req.params.date_admitted,
    department: req.params.department,
    doctor: req.params.doctor,
    ailment:req.params.ailment
	}
  
  // Update the patient with the persistence engine
  patientsSave.update(newpatient, function (error, patient) {
    // If there are any errors, pass them to next in the correct format
    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))

    console.log('Sending response to PUT request.');
    // Send a 200 OK response
    res.send(200)
  })
})

// Delete patient with the given id
server.del('/patients/:id', function (req, res, next) {
  
  deleteRequestCounter++;
  console.log('received DELETE request.');
  console.log("Processed Request Counter --> GET: " +  getRequestCounter + ", POST: " + postRequestCounter + ", PUT: " + putRequestCounter +", DELETE: " +deleteRequestCounter);
  
  // Delete the patient with the persistence engine
  patientsSave.delete(req.params.id, function (error, patient) {

    // If there are any errors, pass them to next in the correct format
    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))

    // Send a 200 OK response
    res.send()
    console.log('Sending response to DELETE request.');
  })
})

// Delete all patients in the system
server.del('/patients', function (req, res) {
  
  deleteRequestCounter++;
  console.log('received DELETE request.');
  console.log("Processed Request Counter --> GET: " +  getRequestCounter + ", POST: " + postRequestCounter + ", PUT: " + putRequestCounter +", DELETE: " +deleteRequestCounter);
  
  // Find every entity within the given collection
  patientsSave.deleteMany({}, function (error) {

    // Return all of the patients in the system
    res.send()
    console.log('Sending response to DELETE request.');
  })
})
