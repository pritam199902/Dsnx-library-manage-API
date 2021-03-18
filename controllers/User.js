const bcrypt = require('bcrypt')


// register POST
exports.RegisterUser = async (req, res)=>{
    // nullity checker function
    const checkNull = (str) => { 
       const result = str.length > 0 && str != " " ? true : false
       return result
    }

    // obj
    const context = {}

    // user input field destructuring
    const { name, username, category, password, confirmPassword } = req.body

    // check nullity on each field
    if (!checkNull(name) || !checkNull(username) || !checkNull(category) || !checkNull(password) || !checkNull(confirmPassword) ){
        context.error = true
        context.message = "Please fill all the required information and try again!"
        return res.json(context)
    }
    else{
        // check password matchs with conformPasswword
        if (password === confirmPassword){
            if ( password.length < 2 ) {
                context.error = true
                context.message = "Password is too small!"
                return res.json(context)
            }
            else{
            // generate hash of password
                await bcrypt.hash(password, 10, (err, hash) =>{
                    if(err){
                        context.error = true
                        context.message = "Something went wrong! Please try again!"
                        return res.json(context)
                    }
                    if(hash ) {
                        const userData = {
                            name: name,
                            username : username,
                            password : hash
                        }

                        // Save to database
                        // .......

                        context.error = false
                        context.message = "User registration successfull!"
                        context.user = userData
            
                        console.log(context);
                        return res.json(context)
                    }
                });
            }
        }
        else{
            context.error = true
            context.message = "Password and Confirm Password didn't match!"
            return res.json(context)
        }
    }

    
}

// get all user GET
exports.GetAllUser = (req, res)=>{
    res.json({body : req.body});
}

// get user by id GET
exports.GetUserById = (req, res)=>{

    

    return res.json(req.params);
}

// update user by id PUT
exports.UpdateUserById = (req, res)=>{
    res.json({body : req.body, params : req.params});
}

// delete user by id DELETE
exports.DeleteUserById = (req, res)=>{
    res.json(req.params);
}