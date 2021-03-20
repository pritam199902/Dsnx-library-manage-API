const db = require("../config/database");
const config = require("../config/info");
const jwt = require("jsonwebtoken");
const errorHandle = require("../config/errorHandle");

exports.isLibrarian = async (req, res, next) => {
  const userToken = req.headers.authorization;
  const secret = config.jwtSecret;
  // console.log(userToken);
  // varifing user token
  jwt.verify(userToken, secret, async (err, data) => {
    if (err) return errorHandle(req, res, err.message);
    if (data) {
      // console.log("verify :::", data);
      // check user is librarian or not
      /*
                (category)  - (id)
                Librarian -   1
                Student   -   2
                Faculty   -   3
            */
      const libId = 1;
      const findUser = `SELECT * FROM user WHERE id = ${Number(
        data.id
      )} and category = ${libId} ;`;
      db.query(findUser, (err, user) => {
        if (err) return errorHandle(req, res, err.sqlMessage);
        if (user.length < 1)
          return errorHandle(
            req,
            res,
            "Sorry, you doesn't have the authorization!"
          );
        else {
          return next();
        }
      });
      //    return res.json(data)
    }
  });
};

exports.isNotLibrarian = (req, res, next) => {
  const userToken = req.headers.authorization;
  const secret = config.jwtSecret;
  // console.log(userToken);
  // varifing user token
  jwt.verify(userToken, secret, async (err, data) => {
    if (err) return errorHandle(req, res, err.message);
    if (data) {
      // console.log("verify :::", data);
      // check user is librarian or not
      /*
                (category)  - (id)
                Librarian -   1
                Student   -   2
                Faculty   -   3
            */
      const libId = 1;
      const findUser = `SELECT * FROM user WHERE id = ${Number(
        data.id
      )} and category != ${libId} ;`;
      db.query(findUser, (err, user) => {
        if (err) return errorHandle(req, res, err.sqlMessage);
        if (user.length < 1)
          return errorHandle(
            req,
            res,
            "Sorry, you doesn't have the authorization!"
          );
        else {
          return next();
        }
      });
      //    return res.json(data)
    }
  });
};

exports.isLoggedIn = async (req, res, next) => {
  const userToken = req.headers.authorization;
  const secret = config.jwtSecret;
  // console.log(userToken);
  // varifing user token
  jwt.verify(userToken, secret, async (err, data) => {
    if (err) return errorHandle(req, res, err.message);
    if (data) {
      // console.log("verify :::", data);
      // check user is librarian or not
      /*
                (category)  - (id)
                Librarian -   1
                Student   -   2
                Faculty   -   3
            */
      const libId = 1;
      const findUser = `SELECT * FROM user WHERE id = ${Number(
        data.id
      )} and category = ${libId} ;`;
      db.query(findUser, (err, user) => {
        if (err) {
            var msg=""
            if (err.message == "jwt expired") msg ="You are not Logged In!";
            else msg = "Invalid user token"
            
            return errorHandle(req, res, msg);
        }
        if (user.length < 1){
          return errorHandle(
            req,
            res,
            "Authorization fail!"
          );}
        else {
          return next();
        }
      });
    }
  });
};

exports.isNotLoggedIn = async (req, res, next) => {
  const userToken = req.headers.authorization;
  const secret = config.jwtSecret;
  // console.log(userToken);
  // varifing user token
  jwt.verify(userToken, secret, (err, data) => {
    if (err) {
        console.log("not log in");
         return next();
    } 
    if (data) {
        return errorHandle(req, res, "You are already Logged In!");
    }
  });
};

// exports.refreshTokenValidity = async (req, res, next) => {
//     const userToken = req.headers.authorization;
//     const secret = config.jwtSecret;
//     // console.log(userToken);
//     // varifing user token
//     jwt.verify(userToken, secret, async (err, data) => {
//       if (err) {
//           if (err.message == "jwt expired") return next();
//           else {
//               return errorHandle(req, res, "You are already Logged In!");
//           }
//       } 
//       if (data) {
//           return errorHandle(req, res, "You are already Logged In!");
//       }
//     });
// };
