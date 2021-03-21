const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const errorHandle = require("../config/errorHandle");
const db = require("../config/database");
const config = require("../config/info");

const EXPTIME = "5h"

// get token - login POST
exports.GetToken = async (req, res) => {
  // res.json({body : res.body, token: "new token"})

  const { username, password } = req.body;
  const context = {};

  if (!username || !password)
    return errorHandle(
      req,
      res,
      "Please provide Username and Password to login!"
    );

  // const findUser = `SELECT u.id, u.name, u.username, u.password, c.category
  // FROM user u JOIN category c
  // ON u.category = c.id
  // WHERE u.username = "${username}";`

  const findUser = `SELECT u.id, u.name, u.username, u.password, u.category 
    FROM user u 
    WHERE u.username = "${username}";`;

  db.query(findUser, async (err, user) => {
    if (err) return errorHandle(req, res, err.sqlMessage);
    if (user.length < 1) return errorHandle(req, res, "No user found");
    else {
      // console.log(user);
      userPassword = user[0].password;
      await bcrypt.compare(password, userPassword, async (err, isMatch) => {
        if (err) return errorHandle(req, res, err.sqlMessage);
        if (isMatch) {
          // console.log(isMatch);
          const secret = config.jwtSecret;
          const userData = {
            id: user[0].id,
            name: user[0].name,
            username: user[0].username,
            category: user[0].category,
          };

          // encoding token
          const token = await jwt.sign(userData, secret, {
            expiresIn: EXPTIME,
          });

          // console.log(token);

          context.error = false;
          context.message = "Login successful";
          context.data = userData;
          context.token = token;
          return res.json(context);
        }
      });
    }
  });

};

// get fresh token - POST
exports.RefreshToken = async (req, res) => {
  const { token } = req.body;
  if (!token) return errorHandle(req, res, "Please provide the expired token!")
  const context = {}
  const decode = jwt.decode(token)
//   console.log(decode.id);
  // console.log(token);
  const findUser = `SELECT u.id, u.name, u.username, u.category 
    FROM user u 
    WHERE u.id = "${decode.id}";`;

  db.query(findUser, async (err, user) => {
    if (err) return errorHandle(req, res, err.sqlMessage);
    if (user.length < 1) return errorHandle(req, res, "Invalid user found");
    else {
        const userData = {
            id: user[0].id,
            name: user[0].name,
            username: user[0].username,
            category: user[0].category,
          };
        const secret = config.jwtSecret;
        const newToken = await jwt.sign(userData, secret, { expiresIn: EXPTIME });

        context.error = false;
        context.message = `Welcome back ${userData.name}`;
        context.token = newToken;
        return res.json(context);
    }
  });


//   return res.json({ expiredToken: res.body, refreshToken: "refresh token " });
};

/*
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTYsIm5hbWUiOiJwcml0YW0gbGlicmFyaWFuIiwidXNlcm5hbWUiOiJwbS1saWIiLCJjYXRlZ29yeSI6MSwiaWF0IjoxNjE2MjIyMTAwLCJleHAiOjE2MTYyMjIxNjB9.kblggr0crBVj3tKiLbSjoTu1K6Bvae919Tp1LEnXgh4
*/
