// Add new record POST
exports.AddNewRecord = (req, res)=>{
    // res.json(req.body);
    

}

// get all record GET
exports.GetAllRecord = (req, res)=>{
    res.json("all books with specific parameter");
}

// get record by id GET
exports.GetRecordById = (req, res)=>{
    res.json(req.params);
}

// update record by id PUT
exports.UpdateRecordById = (req, res)=>{
    res.json({body : req.body, params : req.params});
}

// delete record by id DELETE
exports.DeleteRecordById = (req, res)=>{
    res.json(req.params);
}