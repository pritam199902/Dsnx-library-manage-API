const errorHandle = require("../config/errorHandle");
const db = require("../config/database");
const config = require("../config/info");
const jwt = require("jsonwebtoken");

// Add new payment POST
exports.AddNewPayment = async (req, res) => {
  // res.json(req.body);
  const { payAmount, record_id } = req.body;

  if (!payAmount || !record_id)
    return errorHandle(req, res, "Please provide PayAmount and Record!");

  const token = req.headers.authorization;
  const librarian = await jwt.decode(token);

  //check record_id
  const checkId = `SELECT * FROM records WHERE id = ${Number(record_id)} `;
  db.query(checkId, async (err, valid) => {
    if (err) return errorHandle(req, res, err.sqlMessage);
    if (valid.length < 1)
      return errorHandle(req, res, "Invalid record selected!");
    else {
      if (valid[0].isPaid) {
        errorHandle(req, res, "Payment is already done for this record!");
      } else {
        // save payment
        const savePayment = `INSERT INTO payment
                (payAmoun, record_id, payment_accepter, last_updated_by)
                VALUE(${Number(payAmount)}, ${Number(record_id)},${
          librarian.id
        }, ${librarian.id});
                `;
        db.query(savePayment, async (err, result) => {
          if (err) return errorHandle(req, res, err.sqlMessage);
          if (result) {
            const updateRecord = `UPDATE records SET isPaid = true WHERE id = ${Number(
              record_id
            )}`;
            db.query(updateRecord, async (err, updated) => {
              if (err) return errorHandle(req, res, err.sqlMessage);
              if (updated) {
                // fetch all ppayment details
                const getPayInfo = `SELECT * FROM payment WHERE id = ${result.insertId}`;
                db.query(getPayInfo, async (err, details) => {
                  if (err) return errorHandle(req, res, err.sqlMessage);
                  if (details.length < 1)
                    return errorHandle(req, res, "Invalid record selected!");
                  else {
                    const context = {
                      error: false,
                      message: "Payment accepted!",
                      data: details[0],
                    };
                    return res.json(context);
                  }
                });
              }
            });
          }
        });
      }
    }
  });
};

// get all payment GET
exports.GetAllPayment = (req, res) => {
  //   res.json("all Payment with specific parameter");
  const getPayInfo = `SELECT * FROM payment`;
  db.query(getPayInfo, async (err, details) => {
    if (err) return errorHandle(req, res, err.sqlMessage);
    if (details.length < 1)
      return errorHandle(req, res, "No result foound!");
    else {
      const context = {
        error: false,
        message: "Successful!",
        data: details[0],
      };
      return res.json(context);
    }
  });
};

// get payment by id GET
exports.GetPaymentById = (req, res) => {
  //   res.json(req.params);
  const { id } = req.params;
  const getPayInfo = `SELECT * FROM payment WHERE id = ${id}`;
  db.query(getPayInfo, async (err, details) => {
    if (err) return errorHandle(req, res, err.sqlMessage);
    if (details.length < 1)
      return errorHandle(req, res, "No result found!");
    else {
      const context = {
        error: false,
        message: "Successful!",
        data: details[0],
      };
      return res.json(context);
    }
  });
};

// update payment by id PUT
exports.UpdatePaymentById = (req, res) => {
  //   res.json({ body: req.body, params: req.params });
  const { id } = req.params;
  const { payAmount } = req.body;

  const getPayInfo = `SELECT * FROM payment WHERE id = ${id}`;
  db.query(getPayInfo, async (err, details) => {
    if (err) return errorHandle(req, res, err.sqlMessage);
    if (details.length < 1)
      return errorHandle(req, res, "Invalid payment record selected!");
    else {
      const updatePayInfo = `UPDATE payment SET payAmoun = ${Number(payAmount)} WHERE id = ${id}`;
      db.query(updatePayInfo, async (err, done) => {
        if (err) return errorHandle(req, res, err.sqlMessage);
        if (done) {
          const context = {
            error: false,
            message: "Updated!",
            data: details[0],
          };
          return res.json(context);
        }
      });
    }
  });
};

// delete payment by id DELETE
exports.DeletePaymentById = (req, res) => {
//   res.json(req.params);
const { id } = req.params;
  const { payAmount } = req.body;

  const getPayInfo = `SELECT * FROM payment WHERE id = ${id}`;
  db.query(getPayInfo, async (err, details) => {
    if (err) return errorHandle(req, res, err.sqlMessage);
    if (details.length < 1)
      return errorHandle(req, res, "Invalid payment record selected!");
    else {
      const deletePayInfo = `DELETE FROM payment WHERE id = ${id}`;
      db.query(deletePayInfo, async (err, done) => {
        if (err) return errorHandle(req, res, err.sqlMessage);
        if (done) {
          const context = {
            error: false,
            message: "Deleted!"
          };
          return res.json(context);
        }
      });
    }
  });
};
