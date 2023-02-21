const fs = require('fs');
const bodyParser = require('body-parser');
const jsonServer = require('json-server');
const jwt = require('jsonwebtoken');

const server = jsonServer.create()
const router = jsonServer.router('./database.json')

server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json())
server.use(jsonServer.defaults());

const SECRET_KEY = '123456789'
const expiresIn = '1h'

// Create a token from a payload
function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, {expiresIn})
}

// Verify the token
function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY, (err, decode) => decode !== undefined ? decode : err)
}

// Check if the user exists in database
function findUser({email, password}) {
  let database = JSON.parse(fs.readFileSync('./database.json', 'UTF-8'));
  return database.users.find(user => user.email === email && user.password === password);
}

// Register New User
server.post('/auth/register', (req, res) => {
  if (!!findUser({
    email: req.body.email,
    password: req.body.password,
  })) {
    const status = 401;
    const message = 'Email and Password already exist';
    res.status(status).json({status, message});
    return
  }

  const newUser = {
    ...req.body,
  }

  fs.readFile("./database.json", (err, data) => {
    if (err) {
      const status = 401
      const message = err
      res.status(status).json({status, message})
      return
    }

    // Get current users data
    const newData = JSON.parse(data.toString());

    //Add new user
    newUser.id = newData.users.length + 1;
    newData.users.push(newUser);

    fs.writeFile("./database.json", JSON.stringify(newData), (err) => {
      if (err) {
        const status = 401
        const message = err
        res.status(status).json({status, message})
      }
    });
  });

// Create token for new user
  const access_token = createToken({email: req.body.email, password: req.body.password})
  res.status(200).json({
    accessToken: access_token,
    user: newUser,
  })
})

// Login to one of the users
server.post('/auth/login', (req, res) => {
  const {email, password} = req.body;
  const user = findUser({email, password});
  if (!user) {
    const status = 401
    const message = 'Incorrect email or password'
    res.status(status).json({status, message})
    return
  }
  const access_token = createToken({email, password})
  res.status(200).json({
    accessToken: access_token,
    user: user,
  })
});

server.use(/^(?!\/auth).*$/, (req, res, next) => {
  if (!req.headers.authorization) {
    const status = 401
    const message = 'Error in authorization format'
    res.status(status).json({status, message})
    return
  }

  try {
    let verifyTokenResult;
    verifyTokenResult = verifyToken(req.headers.authorization.split(' ')[1]);

    if (verifyTokenResult instanceof Error) {
      const status = 401
      const message = 'Access token not provided'
      res.status(status).json({status, message})
      return
    }
    next()
  } catch (err) {
    const status = 401
    const message = 'Error access_token is revoked'
    res.status(status).json({status, message})
  }
});

server.use(router)
server.listen(8000);
