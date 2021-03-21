const errorHandle = require("../config/errorHandle");
const db = require("../config/database");
const config = require("../config/info");
const jwt = require("jsonwebtoken");

// Add new record POST
exports.AddNewRecord = async (req, res) => {
  const { user, books } = req.body;
  const token = req.headers.authorization;
  //   const secret = config.jwtSecret;

  const librarian = await jwt.decode(token);
  // console.log(librarian);

  if (!user || !books)
    return errorHandle(req, res, "Please provide User and Books!");
  if (books.length < 1)
    return errorHandle(req, res, "Please select some books!");

  const chechUser = `SELECT id, name FROM user WHERE id = ${user} ;`;
  await db.query(chechUser, async (err, validUser) => {
    if (err) return errorHandle(req, res, err.sqlMessage);
    if (validUser.length < 1)
      return errorHandle(req, res, "Invalid user selected!");
    else {
      // check book validity

      // value integrate str
      var ids = "";
      books.map((d, i) => {
        ids = ids + d + ",";
      });
      ids = ids.slice(0, ids.length - 1);

      //   console.log(ids);

      const findBook = `SELECT * FROM book;`;
      db.query(findBook, async (err, result) => {
        if (err) return errorHandle(req, res, err.sqlMessage);
        if (result.length < 1) return errorHandle(req, res, "No book found!");
        else {
          // console.log(result);
          var check = 0;
          books.forEach((id) => {
            // console.log(result.filter(data => data.id == id).length);
            check += result.filter((data) => data.id == id).length;
          });

          // console.log(check);
          if (check != books.length)
            return errorHandle(req, res, "Invalid book selected!");
          // save books and user wth lbraran in the record
          const newRecord = `INSERT INTO records (user, librarian, last_updated_by) value(${validUser[0].id}, ${librarian.id}, ${librarian.id})`;
          await db.query(newRecord, async (err, saved) => {
            if (err) return errorHandle(req, res, err.sqlMessage);
            if (saved) {
              var booksValue = "";
              books.map((b, i) => {
                // console.log(b+" --> "+i);
                booksValue += `(${saved.insertId}, ${Number(b)}),`;
              });
              booksValue = booksValue.slice(0, booksValue.length - 1);
              // save lent_details
              const lent =
                `INSERT INTO lent_details (record_id, book_id) values ` +
                booksValue +
                ";";
              await db.query(lent, async (err, result) => {
                if (err) return errorHandle(req, res, err.sqlMessage);
                if (result) {
                  //   console.log(">> " + result);
                  // get inserted record
                  const getRecord = `SELECT 
                        r.id, r.lent_date, r.due_date, r.isDueOver, r.isReturned, r.isPaid,
                        u2.id as user_id, u2.name as user,u1.id as librarian_id, u1.name as librarian
                        FROM records r 
                        JOIN user u1
                        ON u1.id = r.librarian
                        JOIN user u2
                        ON u2.id = r.user
                        WHERE r.id = ${saved.insertId} ;`;
                  const getRecordDetails = `SELECT b.id , b.name as book, l.record_id 
                        FROM lent_details l
                        JOIN book b
                        ON b.id = l.book_id
                        WHERE l.record_id = ${saved.insertId} ;`;

                  const context = {};

                  await db.query(getRecord, async (err, rec) => {
                    if (err) return errorHandle(req, res, err.sqlMessage);
                    if (rec.length < 1)
                      return errorHandle(req, res, "No result found!");
                    else {
                      await db.query(getRecordDetails, async (err, details) => {
                        if (err) return errorHandle(req, res, err.sqlMessage);
                        if (details.length < 1)
                          return errorHandle(req, res, "No result found!");
                        else {
                          context.error = false;
                          context.message = "Record successfully saved!";
                          context.data = {
                            record: rec[0],
                            details,
                          };
                          return res.json(context);
                        }
                      });
                      //   console.log(details);
                    }
                  });
                }
              });
            }
          });

          // ///////////////
        }
      });
    }
  });

  // return res.json(req.body);
};

// get all record GET
exports.GetAllRecord = (req, res) => {
  res.json("all books with specific parameter");
};

// get record by id GET
exports.GetRecordById = async (req, res) => {
  const { id } = req.params;

  const getRecord = `SELECT 
        r.id, r.lent_date, r.due_date, r.isDueOver, r.isReturned, r.isPaid, r.last_updated_by, r.last_updated_on,
        u2.id as user_id, u2.name as user,u1.id as librarian_id, u1.name as librarian
        FROM records r 
        JOIN user u1
        ON u1.id = r.librarian
        JOIN user u2
        ON u2.id = r.user
        WHERE r.id = ${id} ;`;
  const getRecordDetails = `SELECT b.id , b.name as book, l.record_id 
        FROM lent_details l
        JOIN book b
        ON b.id = l.book_id
        WHERE l.record_id = ${id} ;`;

  const context = {};

  await db.query(getRecord, async (err, rec) => {
    if (err) return errorHandle(req, res, err.sqlMessage);
    if (rec.length < 1) return errorHandle(req, res, "No result found!");
    else {
      await db.query(getRecordDetails, async (err, details) => {
        if (err) return errorHandle(req, res, err.sqlMessage);
        if (details.length < 1)
          return errorHandle(req, res, "No result found!");
        else {
          context.error = false;
          context.message = "Record successfully saved!";
          context.data = {
            record: rec[0],
            details,
          };
          return res.json(context);
        }
      });
      //   console.log(details);
    }
  });
};

// update record by id PUT
exports.UpdateRecordById = async (req, res) => {
  //   res.json({ body: req.body, params: req.params });
  const { id } = req.params;
  const { isDueOver, isPaid, isReturned } = req.body;

  // check all the reqiured field
  if (
    typeof isDueOver == "undefined" ||
    typeof isReturned == "undefined" ||
    typeof isPaid == "undefined"
  ) {
    console.log(isDueOver, isPaid, isReturned);
    return errorHandle(
      req,
      res,
      "Please provide isRetuned, isPaid and isDueOver!"
    );
  }
  const token = req.headers.authorization;
  //   const secret = config.jwtSecret;
  const updater = await jwt.decode(token);
  const update_date = new Date().toISOString().replace("T", " ").slice(0, 19)

  // check record id validity
  const recValidity = `SELECT * FROM records WHERE id = ${id}`;
  await db.query(recValidity, async (err, rec) => {
    if (err) return errorHandle(req, res, err.sqlMessage);
    if (rec.length < 1) return errorHandle(req, res, "Invalid record!");
    else {
      const getRecord = `UPDATE records
    SET 
    isDueOver = ${isDueOver}, isReturned = ${isReturned}, isPaid = ${isPaid}, 
    last_updated_by = ${updater.id}, last_updated_on = "${update_date}"
    WHERE 
    id = ${id} ;`;
      const context = {};
      //   console.log();

      await db.query(getRecord, async (err, rec) => {
        if (err) return errorHandle(req, res, err.sqlMessage);
        if (rec.length < 1) return errorHandle(req, res, "No result found!");
        else {
          context.error = false;
          context.message = `Record updated by ${updater.name}!`;
          return res.json(context);
          //   console.log(details);
        }
      });
      //
    }
  });
};

// delete record by id DELETE
exports.DeleteRecordById = async (req, res) => {
  //   res.json(req.params);
  const { id } = req.params;
  const deleteRecord = `DELETE FROM records
    WHERE id = ${id} ;`;

  const context = {};
  //   console.log();
  
  const token = req.headers.authorization;
  //   const secret = config.jwtSecret;
  const updater = await jwt.decode(token);

  await db.query(deleteRecord, async (err, rec) => {
    if (err) return errorHandle(req, res, err.sqlMessage);
    if (rec.length < 1) return errorHandle(req, res, "No result found!");
    else {
      context.error = false;
      context.message = `Record updated by ${updater.name}!`;
      return res.json(context);
      //   console.log(details);
    }
  });
};
