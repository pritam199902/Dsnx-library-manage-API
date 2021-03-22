const errorHandle = require("../config/errorHandle");
const db = require("../config/database");

// Add new book POST
exports.AddNewBook = async (req, res) => {
  // user input field destructuring
  const { name, isbn, copies_available, author, publisher, subject } = req.body;
  // check undefined field
  if (!name || !isbn || !copies_available || !author || !publisher || !subject)
    return errorHandle(
      req,
      res,
      "Please provide name, isbn, copies_available, author, publisher, subject"
    );

  // console.log(req.body);
  // nullity checker function
  const checkNull = (str) => {
    const result = str.length > 0 && str != " " ? true : false;
    return result;
  };

  // obj
  const context = {};

  // check nullity on each field
  if (
    !checkNull(name) ||
    isbn.length != 13 ||
    !checkNull(author) ||
    !checkNull(publisher)
  ) {
    context.error = true;
    context.message = "Please fill all the required information and try again!";
    return res.json(context);
  } else {
    // const bookData = {}
    // bookData.name = name
    // bookData.isbn = isbn
    // bookData.copies_available = copies_available
    // bookData.author = author
    // bookData.publisher = publisher
    // context.book = bookData

    // check subject validation

    const getSubject = `SELECT subject FROM subject WHERE id = ${Number(
      subject
    )} ;`;
    await db.query(getSubject, async (err, sub) => {
      if (err) {
        return errorHandle(req, res, err.sqlMessage);
      } else if (sub.length < 1) {
        const msg = "Invalid subject selected! Please select a valid select.";
        return errorHandle(req, res, msg);
      } else {
        // now save book to database
        const newBook = `INSERT INTO book (name, isbn, author, publisher, subject, copies_available)
                value("${name}",${Number(
          isbn
        )},"${author}","${publisher}",${Number(subject)},"${copies_available}") 
                ;`;

        await db.query(newBook, async (err, saved) => {
          if (err) {
            return errorHandle(req, res, err.sqlMessage);
          } else {
            // get newly nserted book
            const newBook = `SELECT * FROM book WHERE id = ${saved.insertId}`;
            await db.query(newBook, async (err, result) => {
              if (err) {
                return errorHandle(req, res, err.sqlMessage);
              }
              if (result.length > 0) {
                context.error = true;
                context.message = "New book added!";
                context.book = result[0];
                context.book.subject = sub[0].subject;
                return res.json(context);
              } else {
                return errorHandle(req, res, "Something went wrong!");
              }
            });
            // return res.json(context)
          }
        });
      }
    });
    // save to database
    // return res.json(context)
  }
};

// get all book GET
exports.GetAllBook = async (req, res) => {
  // res.json({body : req.body});
  //  {
  //     search: {name: ‘test string’},
  //     filter: {subject: ‘chemistry’},
  //     sort: {name: ‘asc’, copies_available: ‘desc’}
  //   }

  const { search, filter, sort } = req.body;

  if (!search || !filter || !sort)
    return errorHandle(
      req,
      res,
      "Please provide 'Search', 'Filter' and 'Sort'"
    );

  const context = {};

  const getBook = `SELECT * FROM book
    WHERE
    name like "%${search.name}%" AND subject = ${Number(filter.subject)}
    ORDER BY name ${sort.name}, copies_available ${sort.copies_available}
    `;

  await db.query(getBook, (err, result) => {
    if (err) {
      return errorHandle(req, res, err.sqlMessage);
    } else if (result.length < 1) {
      const msg = "No result found!";
      return errorHandle(req, res, msg);
    } else {
      context.error = false;
      context.message = "Searching complete";
      context.data = result;

      // console.log(context);
      return res.json(context);
    }
  });
};

// get book by id GET
exports.GetBookById = async (req, res) => {
  //   res.json(req.params);
  const { id } = req.params;
  const context = {};

  const getBook = `SELECT * FROM book WHERE id = ${id} ;`;
  await db.query(getBook, (err, result) => {
    if (err) {
      return errorHandle(req, res, err.sqlMessage);
    } else if (result.length < 1) {
      const msg = "No result found!";
      return errorHandle(req, res, msg);
    } else {
      context.error = false;
      context.message = "Successfull";
      context.data = result;

      // console.log(context);
      return res.json(context);
    }
  });
};

// update book by id PUT
exports.UpdateBookById = (req, res) => {
  //   res.json({ body: req.body, params: req.params });
  const { name, copies_available, author, publisher, subject } = req.body;
  const { id } = req.params;

  if (!name || !copies_available || !author || !publisher || !subject)
    return errorHandle(
      req,
      res,
      "Please provide 'Name', 'Copies_available', 'Subject', 'Publisher' and 'Author'"
    );

  const context = {};

  const find = `SELECT * FROM book WHERE id = ${id} ;`;
  db.query(deleteRecord, async (err, rec) => {
    if (err) return errorHandle(req, res, err.sqlMessage);
    if (rec.length < 1) return errorHandle(req, res, "No result found!");
    else {
      const getBook = `UPDATE book 
        SET name = "${name}", copies_available = ${Number(copies_available)}, 
        subject = ${Number(subject)}, 
        author = "${author}", publisher = "${publisher}"  
        WHERE id = ${id} ;`;
      db.query(getBook, (err, result) => {
        // console.log("UPDATE BOOK : ",result);
        if (err) {
          return errorHandle(req, res, err.sqlMessage);
        } else if (result.length < 1) {
          const msg = "No result found!";
          return errorHandle(req, res, msg);
        } else {
          context.error = false;
          context.message = "Book updated!";
          // console.log(result);
          return res.json(context);
        }
      });
    }
  });
};

// delete book by id DELETE
exports.DeleteBookById = async (req, res) => {
  //   res.json(req.params);
  const { id } = req.params;
  const context = {};

  const find = `SELECT * FROM book WHERE id = ${id} ;`;
  db.query(deleteRecord, async (err, rec) => {
    if (err) return errorHandle(req, res, err.sqlMessage);
    if (rec.length < 1) return errorHandle(req, res, "No result found!");
    else {
      const delUser = `DELETE FROM book WHERE id = ${id} ;`;
      await db.query(delUser, (err, result) => {
        if (err) {
          return errorHandle(req, res, err.sqlMessage);
        } else {
          context.error = false;
          context.message = "Book deleted!";
          // console.log(result);
          return res.json(context);
        }
      });
    }
  });
};
