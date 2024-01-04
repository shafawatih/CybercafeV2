const express = require('express');
const https = require('https');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const path = require('path');

app.use(express.json());

// Set up middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Set the views directory

//swagger
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Cybercafe Visitor Management System GROUP 23',
      description: 'API for managing visitors in a cybercafe using Swagger and Node.js',
      version: '1.0.0',
    },
  },
  apis: ['./Cybercafe.js'], //files containing annotations as above
};

const swaggerSpec = swaggerJsdoc(options);
app.use('/group23', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Dummy user data (replace with a proper authentication system)
const user = [
  { username: 'user1', password: 'password1' },
  ];
  

//connect to mongodb 
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://shafawatih:vJgbDC0jui7JAnAk@cluster0.eha480i.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    app.use(express.json());
    app.listen(port, () => {
      console.log('Server listening at https://localhost:${port}');
    });
    

    //admin login configuration
app.post('/login/admin', async (req, res) => {
  try {
    const result = await login(req.body.username, req.body.password);
    if (result.message === 'Correct password') {
      const token = generateToken({ username: req.body.username });
      res.send({ message: `Successful login! Welcome to Cybercafe Visitor Management System, ${req.body.username}!`, token });
    } else {
      res.send('Login unsuccessful! Invalid username or password.');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});


// admin login configuration
app.post('/login/admin', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!isStrongPassword(password)) {
      return res.status(400).send('Weak password. Please use a stronger password.');
    }

    const result = await login(username, password);

    if (result.message === 'Correct password') {
      const token = generateToken({ username });
      res.send({ message: `Successful login! Welcome to Cybercafe Visitor Management System, ${username}!`, token });
    } else {
      res.send('Login unsuccessful! Invalid username or password.');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

  // admin login configuration 
    app.get('/login/admin', (req, res) => {
      res.render('login'); // Render the login page using EJS
    }); 

  // Add a function to check password strength
    function isStrongPassword(password) {
    // Implement your own password strength rules
    return (
      password.length >= 8 &&
      /[a-z]/.test(password) &&
      /[A-Z]/.test(password) &&
      /\d/.test(password) &&
      /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password)
    );
  }

  //create user
    app.post('/create/user', async (req, res) => {
      const { username, idproof, password } = req.body;
    
      // Check if the password meets the strength criteria
      if (!isStrongPassword(password)) {
        return res.status(400).send('Weak password. Please use a stronger password.');
      }
    
      try {
        // Create the user if password is strong
        let result = createuser(username, idproof, password);
        //res.send(result);
        res.status(200).send('Success. New user created');
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    });

    //see created user
    app.get('/view/user/admin', verifyToken, async (req, res) => {
      try {
      const result = await client
          .db('CybercafeV2')
          .collection('admin')
          .find()
          .toArray();
    
      res.send(result);
      } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
      }
  });

    
    //create visitor
    app.post('/create/visitor', async (req, res) => {
      try {
        let result = await createvisitor(
          req.body.visitorname,
          req.body.idproof,
          req.body.entrytime
          ); 
          res.send(result);
      }
      catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
        }
    });

    //create visitor (test)
    app.post('/create/test/visitor', async (req, res) => {
      try {
        let result = await createtestvisitor(
          req.body.visitorname,
          req.body.idproof,
          req.body.entrytime,
          req.body.approval
          ); 
          res.send(result);
      }
      catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
        }
    });

     //see created visitor (test)
     app.get('/view/test/visitor/admin', verifyToken, async (req, res) => {
      try {
      const result = await client
          .db('CybercafeV2')
          .collection('test')
          .find()
          .toArray();
  
      res.send(result);
      } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
      }
  });
    
    //see created visitor
    app.get('/view/visitor/admin', verifyToken, async (req, res) => {
        try {
        const result = await client
            .db('CybercafeV2')
            .collection('visitor')
            .find()
            .toArray();
    
        res.send(result);
        } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
        }
    });
    

    //delete visitor
    app.delete('/delete/visitor/:idproof', verifyToken, async (req, res) => {
      const idproof = req.params.idproof;
    
      try {
        const deletevisitorResult = await client
          .db('CybercafeV2')
          .collection('visitor')
          .deleteOne({ idproof: idproof});
    
        if (deletevisitorResult.deletedCount === 0) {
          return res.status(404).send('Visitor not found or unauthorized');
        }
    
        res.send('Visitor deleted successfully');
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    });

    
    //create visitor pass
    app.post('/create/visitorpass/admin', verifyToken, async (req, res) => {
        let result = createvisitorpass(
        req.body.visitorname,
        req.body.idproof,
        req.body.timespend,
        req.body.payment
        ); 
        res.send(result);
    });
    

    //see created visitor log
    app.get('/view/visitorpass/admin', verifyToken, async (req, res) => {
        try {
        const result = await client
            .db('CybercafeV2')
            .collection('visitorpass')
            .find()
            .toArray();
    
        res.send(result);
        } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
        }
    });

    //create computer
    app.post('/create/computer', async (req, res) => {
      let result = createcomputer(
        req.body.idproof,
        req.body.lanportno,
        req.body.available
        ); 
        res.send(result);
      });
      

    //see created computer  
    app.get('/view/computer/admin', verifyToken, async (req, res) => {
      try {
        const result = await client
        .db('CybercafeV2').collection('computer').find().toArray();
        
        res.send(result);
      } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
      }
    });
    
        
  }catch (e) {
    console.error(e);

  }  
  finally {
    // Ensures that the client will close when you finish/error
    
  }
}

run().catch(console.dir);

//function

async function login(requsername, reqpassword) {
    let matchUser = await client.db('CybercafeV2').collection('admin').findOne({ username: { $eq: requsername } });
  
    if (!matchUser)
      return { message: "User not found!" };
  
    if (matchUser.password === reqpassword)
      return { message: "Correct password", user: matchUser };
    else
     return { message: "Invalid password" };
  }

// Add a function to check password strength
function isStrongPassword(password) {
  // Implement your own password strength rules
  return (
    password.length >= 8 &&
    /[a-z]/.test(password) &&
    /[A-Z]/.test(password) &&
    /\d/.test(password) &&
    /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password)
  );
}

//create user function
function createuser(requsername, reqidproof, reqpassword) {
  // Check the password strength again before inserting into the database
  if (!isStrongPassword(reqpassword)) {
    return 'Weak password. Please use a stronger password (Minimum of 8 characters, at least one lowercase letter (a-z), at least one uppercase letter (A-Z), at least one digit (0-9), at least one special character)';
  }

  // Rest of your user creation logic...
  client.db('CybercafeV2').collection('admin').insertOne({
    "username": requsername,
    "idproof": reqidproof,
    "password": reqpassword, // Store the hashed password, not the plain text
  });

  return "User is added";
}

  
//create visitor function
function createvisitor(reqvisitorname, reqidproof, reqentrytime = 0) {
    client.db('CybercafeV2').collection('visitor').insertOne({
        "visitorname": reqvisitorname,
        "idproof": reqidproof,
        "entrytime":reqentrytime
      });
      return "Visitor is added";
    }

//create visitor function (test)
function createtestvisitor(reqvisitorname, reqidproof, reqentrytime = "0", reqapproval) {
  client.db('CybercafeV2').collection('test').insertOne({
      "visitorname": reqvisitorname,
      "idproof": reqidproof,
      "entrytime":reqentrytime,
      "approval":reqapproval
    });
    return "Visitor is added";
  }

//create visitorpass function
function createvisitorpass(reqvisitorname, reqidproof, reqtimespend = 0, reqpayment = 0) {
    client.db('CybercafeV2').collection('visitorpass').insertOne({
        "visitorname": reqvisitorname,
        "idproof": reqidproof,
        "timespend": reqtimespend,
        "payment": reqpayment,
      });
      return "Visitor pass is recorded";
    }

//create computer function
function createcomputer(reqidproof, reqLanportno, reqAvailable) {
  client.db('CybercafeV2').collection('computer').insertOne({

      "idproof": reqidproof,
      "lanportno": reqLanportno,
      "available": reqAvailable
    });
    return "Computer is added";
  }

  //token function
const jwt = require('jsonwebtoken');

function generateToken(userData) {
  const token = jwt.sign(
    userData,
    'password',
    {expiresIn: 600}
  );

  console.log(token);
  return token;
}

function verifyToken(req, res, next) {
  let header = req.headers.authorization;
  if (!header) {
    res.status(401).send('Unauthorized');
    return;
  }

  let token = header.split(' ')[1];

  jwt.verify(token, 'password', function (err, decoded) {
    if (err) {
      res.status(401).send('Unauthorized');
      return;
    }
    req.admin = decoded;
    next();
  });
} 