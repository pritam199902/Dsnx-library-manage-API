// Add new book POST
exports.AddNewBook = (req, res)=>{
    // user input field destructuring
    const {name,isbn,copies_available,author,publisher,subject} = req.body
    

    // nullity checker function
     const checkNull = (str) => { 
        const result = str.length > 0 && str != " " ? true : false
        return result
     }
 
     // obj
     const context = {}
 
     // check nullity on each field
     if (!checkNull(name) || isbn.length!=13 || typeof copies_available != "number" || !checkNull(author) || !checkNull(publisher) || !checkNull(subject) ){
         context.error = true
         context.message = "Please fill all the required information and try again!"
         return res.json(context)
     }
     else {
        const bookData = {}

        bookData.name = name
        bookData.isbn = isbn
        bookData.copies_available = copies_available
        bookData.author = author
        bookData.publisher = publisher

        context.book = bookData

        // check subject validation
        if(1==1){
            bookData.subject = subject
            context.book = bookData

        }else{
            context.error = true
            context.message = "Invalid subject selected! Please select a valid select."
            return res.json(context)
        }

        // save to database
        return res.json(context)

     }

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