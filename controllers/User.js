const bcrypt = require("bcrypt");
const errorHandle = require("../config/errorHandle");
const db = require("../config/database");

// register POST
exports.RegisterUser = async (req, res) => {
  // nullity checker function
  const checkNull = (str) => {
    const result = str.length > 0 && str != " " ? true : false;
    return result;
  };

  // obj
  const context = {};

  // user input field destructuring
  const { name, username, category, password, confirmPassword } = req.body;

  // check nullity on each field
  if (
    !checkNull(name) ||
    !checkNull(username) ||
    !checkNull(category) ||
    !checkNull(password) ||
    !checkNull(confirmPassword)
  ) {
    context.error = true;
    context.message = "Please fill all the required information and try again!";
    return res.json(context);
  } else {
    // check password matchs with conformPasswword
    if (password === confirmPassword) {
      // check password lenght
      if (password.length < 2) {
        context.error = true;
        context.message = "Password is too small!";
        return res.json(context);
      }
      // if password length is ok
      else {
        // then check category inputed by user
        // const checkCategory = `select * from category;`;
        const checkCategory = `SELECT category from category WHERE id = ${Number(
          category
        )}`;

        await db.query(checkCategory, async (err, cat) => {
          if (err) {
            return errorHandle(req, res, err.message);
          } else if (cat.length > 0) {
            // if category is ok
            // console.log(cat);

            // generate hash of password
            await bcrypt.hash(password, 10, async (err, hash) => {
              if (err) {
                context.error = true;
                context.message = "Something went wrong! Please try again!";
                return res.json(context);
              }
              if (hash) {
                // new user data obj
                const userData = {
                  name: name,
                  username: username,
                  password: hash,
                  category: category,
                };

                // Save new user data to database
                const addNewUser = `INSERT INTO user(name, username, password, category) 
                value( "${userData.name}", "${userData.username}", "${userData.password}", "${userData.category}"  )`;

                await db.query(addNewUser,async (err, result) => {
                  if (err) {
                    errorHandle(req, res, err.message);
                  } else if (result.length < 1) {
                    const msg = "No result found!";
                    return errorHandle(req, res, msg);
                  } else {


                    const getUser = `SELECT id, name, username, category, registration_date, isActive FROM user WHERE id = ${result.insertId} ;`;
                    await db.query(getUser, (err, result) => {
                        if (err) {
                           return errorHandle(req, res, err.message);
                        } else if (result.length < 1) {
                            const msg = "No result found!";
                            return errorHandle(req, res, msg);
                        } else {
                            context.error = false;
                            context.message = "Successfull";
                            context.user = result[0];
                            context.user.category = cat[0].category;
                
                            console.log(context);
                            return res.json(context);
                        }
                    });

                    // context.error = false;
                    // context.message = "User registration successfull!";
                    // userData.category = cat[0].category;
                    // context.user = userData;

                    // // console.log(result);
                    // return res.json(context);
                  }
                });
              }
            });
          } else {
            const msg = "No result found!";
            return errorHandle(req, res, msg);
          }
        });
      }
    } else {
      context.error = true;
      context.message = "Password and Confirm Password didn't match!";
      return res.json(context);
    }
  }
};

// get all user GET
exports.GetAllUser = async (req, res) => {
//   res.json({ body: req.body });

//   {
//     search: {name: ‘test string’},
//     filter: {category: ‘student’},
//     sort: {name: ‘asc’, registration_date: ‘desc’}
//   }

    const {search, filter, sort} = req.body
    
    if(!search || !filter || !sort) return errorHandle(req, res, "Please provide 'Search', 'Filter' and 'Sort'");
    
    const context={}


    const getUser = `SELECT * FROM user
    WHERE
    name like "%${search.name}%" AND category like ${Number(filter.category)}
    ORDER BY name ${sort.name}, registration_date ${sort.registration_date}
    `;

    await db.query(getUser, (err, result) => {
        if (err) {
           return errorHandle(req, res, err.message);
        } else if (result.length < 1) {
            const msg = "No result found!";
            return errorHandle(req, res, msg);
        } else {
            context.error = false;
            context.message = "Searching complete";
            context.user = result;

            console.log(context);
            return res.json(context);
        }
    });
};

// get user by id GET
exports.GetUserById = async(req, res) => {
//   return res.json(req.params);

    const {id} = req.params
    const context={}


    const getUser = `SELECT id, name, username, category, registration_date, isActive FROM user WHERE id = ${id} ;`;
    await db.query(getUser, (err, result) => {
        if (err) {
           return errorHandle(req, res, err.message);
        } else if (result.length < 1) {
            const msg = "No result found!";
            return errorHandle(req, res, msg);
        } else {
            context.error = false;
            context.message = "Successfull";
            context.user = result;

            console.log(context);
            return res.json(context);
        }
    });
};

// update user by id PUT
exports.UpdateUserById =async (req, res) => {
  // res.json({ body: req.body, params: req.params });
  const {name, category, username} = req.body;
  const {id} = req.params

  if(!name || !username || !category) return errorHandle(req, res, "Please provide 'Name', 'Username' and 'Category'");

  const context = {}

  const delUser = `UPDATE user SET name = "${name}", username = "${username}", category = ${Number(category)} WHERE id = ${id} ;`;
  db.query(delUser, (err, result) => {
        if (err) {
           return errorHandle(req, res, err.sqlMessage);
        } else if (result.length < 1) {
            const msg = "No result found!";
            return errorHandle(req, res, msg);
        } else {
            context.error = false;
            context.message = "User updated!";
            console.log(result);
            return res.json(context);
        }
    });

};

// delete user by id DELETE
exports.DeleteUserById =async (req, res) => {
//   res.json(req.params);
    const {id} = req.params
    const context={}

    const delUser = `DELETE FROM user WHERE id = ${id} ;`;
    await db.query(delUser, (err, result) => {
        if (err) {
           return errorHandle(req, res, err.message);
        } else if (result.length < 1) {
            const msg = "No result found!";
            return errorHandle(req, res, msg);
        } else {
            context.error = false;
            context.message = "User deleted!";
            console.log(result);
            return res.json(context);
        }
    });

};

///////////////////////////////////////
