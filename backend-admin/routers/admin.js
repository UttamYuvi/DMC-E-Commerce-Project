const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../utils/config");
const result = require("../utils/result");
const pool = require("../utils/db");

router.post("/signup", (req, res) => {
  const { firstName, lastName, email, phone, password } = req.body;
  const sql =
    "Insert into administration(firstName, lastName, email, phone, password) values (?,?,?,?,?)";
  bcrypt.hash(password, config.SALT_ROUND, (err, hasdedPassword) => {
    if (hasdedPassword) {
      pool.query(
        sql,
        [firstName, lastName, email, phone, hasdedPassword],
        (err, data) => {
          res.send(result.createResult(err, data));
        }
      );
    } else {
      res.send(result.createResult(err));
    }
  });
});

router.post("/signin", (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  const sql = `SELECT * FROM administration WHERE email = ?`;
  pool.query(sql, [email], (err, data) => {
    if (err) res.send(result.createResult(err));
    else if (data.length == 0) res.send(result.createResult("Invalid Email"));
    else {
      // in this else block the data is present i.e
      // the user is kept at 0th index in the data array
      // check for the pasword
      bcrypt.compare(password, data[0].password, (err, passwordStatus) => {
        if (passwordStatus) {
          const payload = {
            adminId: data[0].adminId,
          };
          console.log("payload", payload);
          const token = jwt.sign(payload, config.SECRET);
          const user = {
            token,
            firstName: data[0].firstName,
            lastName: data[0].lastName,
            email: data[0].email,
            phone: data[0].phone,
          };
          res.send(result.createResult(null, user));
        } else res.send(result.createResult("Invalid Password"));
      });
    }
  });
});
router.get("/income", (req, res) => {
  const sql = `
    SELECT 
    orderId,
    (totalAmount * 0.05) AS totalProfit
FROM orders
WHERE paymentStatus = 'paid'
  AND orderStatus = 'delivered';

  `;

  pool.query(sql, (err, data) => {
    res.send(result.createResult(err, data));
  });
});



module.exports = router;
