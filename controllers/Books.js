// Add new book POST
exports.AddNewBook = (req, res)=>{
    const {name,isbn,copies_available,author,publisher,subject} = req.body
    res.json(req.body);
}

// get all book GET
exports.GetAllBook = (req, res)=>{
    res.json({body : req.body});
}

// get book by id GET
exports.GetBookById = (req, res)=>{
    res.json(req.params);
}

// update book by id PUT
exports.UpdateBookById = (req, res)=>{
    res.json({body : req.body, params : req.params});
}

// delete book by id DELETE
exports.DeleteBookById = (req, res)=>{
    res.json(req.params);
}