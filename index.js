const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const port = process.env.PORT || 3000;
const dbName = 'CybercafeV2';
const collection1 = "user"
const collection2 = "visitor"
const collection3 = 'visitorpass';
const saltRounds = 10;
//const mongoURI = process.env.MONGODB_URI
app.use(express.json());

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
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


//connect to mongodb
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://shafawatih:Shafa.123@cluster0.eha480i.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


//eee

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    app.use(express.json());
    app.listen(port, () => {
      console.log('Server listening at http://localhost:${port}');
    });
    
    app.post('/admin/login', async (req, res) => {
      try {
        const result = await login(req.body.username, req.body.password);
        if (result.message === 'Correct password') {
          // Dump all hosts' data here
          const hostsData = await client.db(dbName).collection(collection1).find().toArray();
          res.send({ message: `Successful admin login! Welcome, ${req.body.username}!`, hostsData });
        } else {
          res.send('Admin login unsuccessful');
        }
      } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
      };
    });


//user login configuration
app.post('/login', async (req, res) => {
  try{
    const result =  await login(req.body.username, req.body.password)
    if (result.message == 'Correct password') {
      const user1 = await client.db(dbName).collection(collection1).findOne({username: req.body.username});
      const token = await generateToken({ username: req.body.username , role: user1.role});
      res.send({ message: `Successful login! Welcome to Cybercafe Visitor Management System, ${req.body.username}!`, token });
    } else {
      res.send('Login unsuccessful');
    }
  }catch(error){
        console.error(error);
        res.status(500).send("Internal Server Error");
    };
});


//register user configuration
app.post('/register/user', authenticateAdmin, async (req, res) => {
  let result = await registeruser(
  req.body.username,
  req.body.password,
  req.body.email
  ); 
  res.send(result);
});


    

//user create visitor
    app.post('/create/visitor/user', verifyToken, async (req, res) => {
        let result = createvisitor(
        req.body.visitorname,
        req.body.timespend,
        req.body.age,
        req.body.phonenumber
        ); 
        res.send(result);
    });



    //start sini

    //see created user
    app.get('/view/user/admin', authenticateAdmin, async (req, res) => {
      try {
      const result = await client
          .db('CybercafeV2')
          .collection('user')
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


    // API to issue visitor pass (new endpoint)
    app.post('/issue/visitorpass', verifyToken, async (req, res) => {
      try {
        const { visitorname, idproof, timespend, payment } = req.body;

        // Validate input data
        if (!visitorname || !idproof || !timespend || !payment) {
            return res.status(400).json({ error: 'Invalid input data' });
        }

        // Check if visitor exists
        const existingVisitor = await client.db(dbName).collection("visitor").findOne({ "visitorname": visitorname });

        if (existingVisitor) {
            // If visitor already exists, update the timespend and payment
            await client.db(dbName).collection("visitor").updateOne(
                { "visitorname": visitorname },
                { $set: { "timespend": timespend, "payment": payment } }
            );
            return res.status(200).json({ message: 'Visitor pass updated.' });
        } else {
            // If visitor doesn't exist, create a new record (visitor pass)
            const visitorPass = {
                "visitorname": visitorname,
                "idproof": idproof,
                "timespend": timespend,
                "payment": payment,
            };

            // Create a visitor record
            createvisitor(visitorname, timespend, req.body.age, req.body.phonenumber);

            // Insert the visitor pass record
            await client.db(dbName).collection("visitorpass").insertOne(visitorPass);

            return res.status(200).json({ message: 'Visitor pass recorded.' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

    
    //create visitor log
    app.post('/create/visitorpass/admin', verifyToken, async (req, res) => {
        let result = createvisitorpass(
        req.body.visitorname,
        req.body.idproof,
        req.body.timespend,
        req.body.payment
        ); 
        res.send(result);
    });
    

    //see created visitorpass
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




//function 放下面

async function login(requsername, reqpassword) {
  let matchUser = await client.db('CybercafeV2').collection('user').findOne({ username:requsername });

  if (!matchUser || matchUser.role !=='admin')
    return { message: "User not found!" };
  const isPasswordValid = await bcrypt.compare(reqpassword, matchUser.password);
  //console.log("run");
  if (isPasswordValid)
    return { message: "Correct password", user: matchUser };
  else
   return { message: "Invalid password" };
}

/*register user function
function registeruser(requsername, reqpassword, reqemail) {
  client.db('VMS').collection('User').insertOne({
      "username": requsername,
      "password": reqpassword,
      "email":reqemail
    });
    return "User is created.";
  }*/

  async function registeruser(requsername, reqpassword, reqemail) {
    try{
      const hash = await bcrypt.hash(reqpassword, 10);
      await client.db(dbName).collection(collection1).insertOne({
          "username": requsername,
          "password": hash,
          "email":reqemail,
          role: "host",
          visitors: []
        });
        return "User is created.";
    }catch(error){
      console.error(error);
      return "Error creating user. ";
    }
  
    }
  
  // Function to issue visitor pass (new function)
  async function issueVisitorPass(req, res) {
    try {
      // Validate the request body
      const { visitorname, idproof, timespend, payment } = req.body;
      if (!visitorname || !idproof || !timespend || !payment) {
        return res.status(400).json({ error: 'Invalid input data' });
      }
  
      // Get the user ID from the token
      const userId = getUserIdFromToken(req);
      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
  
      // Verify that the user has admin privileges (modify this condition based on your user roles)
      const isAdmin = checkAdminPrivileges(userId);
      if (!isAdmin) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
  
      // Now you can use idproof, timespend, and payment
      const existingVisitor = await client.db(dbName).collection("visitor").findOne({ "visitorname": visitorname });
  
      if (existingVisitor) {
        // If visitor already exists, update the timespend and payment or perform other actions as needed
        await client.db(dbName).collection("visitor").updateOne(
          { "visitorname": visitorname },
          { $set: { "timespend": timespend, "payment": payment } }
        );
        return res.status(200).json({ message: 'Visitor pass updated.' });
      } else {
        // If visitor doesn't exist, create a new record (visitor pass)
        const visitorPass = {
          "visitorname": visitorname,
          "idproof": idproof,
          "timespend": timespend,
          "payment": payment,
        };
  
        await client.db(dbName).collection("visitorpass").insertOne(visitorPass);
        return res.status(200).json({ message: 'Visitor pass recorded.' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }


//user create visitor function
function createvisitor(reqvisitorname, reqtimespend = "0", reqage, reqphonenumber = "0") {
    client.db('CybercafeV2').collection('visitor').insertOne({
        "visitorname": reqvisitorname,
        "timespend":reqtimespend,
        "age":reqage,
        "phonenumber":reqphonenumber
      });
      return "Visitor is added.";
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

//create visitorlog function
function createvisitorpass(reqvisitorname, reqidproof, reqtimespend = 0, reqpayment = 0) {
    client.db('CybercafeV2').collection('visitorpass').insertOne({
        "visitorname": reqvisitorname,
        "idproof": reqidproof,
        "timespend": reqtimespend,
        "payment": reqpayment,
      });
      return "Visitorpass is recorded";
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


//new add
function authenticateAdmin(req, res, next) {
  let header = req.headers.authorization;
  if (!header) {
    res.status(401).send('Unauthorized, missing token');
    return;
  }

  let token = header.split(' ')[1];

  jwt.verify(token, 'password', function (err, decoded) {
    if (err) {
      res.status(403).send('Invalid token');
      return;
    }else{
      if(decoded.role !== 'admin'){
        res.status(403).send("Forbidden: Insufficient permissions")
      }
      //add this in case your response is in another route, therefore you can retrieve the token at the terminal
      console.log('Decoded token:',decoded);
      return next();
    }
  });
}