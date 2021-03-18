// get token - login POST
exports.GetToken = (req,res) =>{
    res.json({body : res.body, token: "new token"})
}

// get fresh token - POST
exports.RefreshToken = (req,res) =>{
    res.json({expiredToken : res.body, refreshToken : "refresh token "})
}