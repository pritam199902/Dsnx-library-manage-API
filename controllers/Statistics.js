const errorHandle = require("../config/errorHandle");
const db = require("../config/database");
// const config = require("../config/info");
// const jwt = require("jsonwebtoken");

// statistic page GET
exports.Statistics = async (req, res) => {
  const totalUser_dtl_q = `SELECT COUNT(*) AS total_user, c.category FROM user u JOIN category c ON u.category = c.id GROUP BY u.category`;
  const totalBook_dtl_q = `select count(b.name) as total_books, s.subject from book b join subject s on b.subject = s.id group by b.subject`;
  const totalLentBook_dtl_q = `select id, name, total_lent from book;`;

  const totalUsers_q = `select count(*) total_user from user;`;
  const totalBooks_q = `select count(*) as total_book from book;`;
  const totalLentBook_q = `select sum(total_lent) total_lent_book from book;`;
  const highestLentBook_q = `select id, name as book_name, max(total_lent) as total_lent from book where total_lent = ( select max(total_lent) from book) ;`;
  const oldestBook_q = `select id, name as book_name, registration_date from book order by registration_date limit 1;`;
  const newestBook_q = `select id, name as book_name, registration_date from book order by registration_date desc limit 1;`;
  const mostAvailable_q = `select id, name as book_name, copies_available from book where copies_available > 0 order by copies_available desc;`;
  const mostActiveUser_q = `select u.id, u.name, count(user) as total_records from records r join user u on u.id = r.user group by user order by count(user) desc;`;

  const context = {};

  // total user
  db.query(totalUsers_q, (err, totalUsers) => {
    if (err) return errorHandle(req, res, err.sqlMessage);
    if (totalUsers) {
      context.totalUsers = totalUsers;
      // total book
      db.query(totalBooks_q, (err, totalBooks) => {
        if (err) return errorHandle(req, res, err.sqlMessage);
        if (totalBooks) {
          context.totalBooks = totalBooks;
          // total lent book
          db.query(totalLentBook_q, (err, totalLentBook) => {
            if (err) return errorHandle(req, res, err.sqlMessage);
            if (totalLentBook) {
              context.totalLentBook = totalLentBook;
              // highestLentBook
              db.query(highestLentBook_q, (err, highestLentBook) => {
                if (err) return errorHandle(req, res, err.sqlMessage);
                if (highestLentBook) {
                  context.highestLentBook = highestLentBook;

                  // oldestBook
                  db.query(oldestBook_q, (err, oldestBook) => {
                    if (err) return errorHandle(req, res, err.sqlMessage);
                    if (oldestBook) {
                      context.oldestBook = oldestBook;
                      // newestBook
                      db.query(newestBook_q, (err, newestBook) => {
                        if (err) return errorHandle(req, res, err.sqlMessage);
                        if (newestBook) {
                          context.newestBook = newestBook;
                          // mostAvailable_q
                          db.query(mostAvailable_q, (err, mostAvailable) => {
                            if (err)
                              return errorHandle(req, res, err.sqlMessage);
                            if (mostAvailable) {
                              context.mostAvailable = mostAvailable;
                              // most active user

                              db.query(
                                mostActiveUser_q,
                                (err, mostActiveUser) => {
                                  if (err)
                                    return errorHandle(
                                      req,
                                      res,
                                      err.sqlMessage
                                    );
                                  if (mostActiveUser) {
                                    context.mostActiveUser = mostActiveUser;
                                    // total user details

                                    db.query(
                                      totalUser_dtl_q,
                                      (err, totalUser_dtl) => {
                                        if (err)
                                          return errorHandle(
                                            req,
                                            res,
                                            err.sqlMessage
                                          );
                                        if (totalUser_dtl) {
                                          context.totalUser_dtl = totalUser_dtl;
                                          // total book details

                                          db.query(
                                            totalBook_dtl_q,
                                            (err, totalBook_dtl) => {
                                              if (err)
                                                return errorHandle(
                                                  req,
                                                  res,
                                                  err.sqlMessage
                                                );
                                              if (totalBook_dtl) {
                                                context.totalBook_dtl = totalBook_dtl;
                                                // total lent book details

                                                db.query(
                                                  totalLentBook_dtl_q,
                                                  (err, totalLentBook_dtl) => {
                                                    if (err)
                                                      return errorHandle(
                                                        req,
                                                        res,
                                                        err.sqlMessage
                                                      );
                                                    if (totalLentBook_dtl) {
                                                      context.totalLentBook_dtl = totalLentBook_dtl;
                                                      // total book details

                                                      // // return respons
                                                      context.message =
                                                        "Successfull!";
                                                      return res.json(context);
                                                    }
                                                  }
                                                );
                                              }
                                            }
                                          );
                                        }
                                      }
                                    );
                                  }
                                }
                              );
                            }
                          });
                        }
                      });
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
  });

  // return res.json("Statistics page")
};
