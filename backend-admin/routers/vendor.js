const express = require("express");
const verifyAdminAuth = require("../utils/verifyAdminAuth");
const router = express.Router();
const pool = require("../utils/db");
const result = require("../utils/result");

router.get("/getInactiveVendors", verifyAdminAuth, (req, res) => {
  const sql = "select * from vendors where status='inactive'";
  pool.query(sql, (err, data) => {
    console.log(data);
    if (data) return res.send(result.createResult(null, data));
    else return res.send(result.createResult(err));
  });
});

router.get("/getActiveVendors", verifyAdminAuth, (req, res) => {
  const sql = "select * from vendors where status='active'";
  pool.query(sql, (err, data) => {
    if (data) return res.send(result.createResult(null, data));
    else return res.send(result.createResult(err));
  });
});

router.get("/getAllVendors", verifyAdminAuth, (req, res) => {
  const adminId = req.adminId;
  const sql = "select * from vendors";
  pool.query(sql, (err, data) => {
    console.log(data);
    if (data) return res.send(result.createResult(null, data));
    else return res.send(result.createResult(err));
  });
});

router.post("/updateVendorStatus", verifyAdminAuth, (req, res) => {
  const adminId = req.adminId;
  const { vendorId, status } = req.body;
  console.log("requesting ", req.body, req.adminId);
  const sql = "update vendors set status=? where vendorId=? and adminId=?";
  pool.query(sql, [status, vendorId, adminId], (err, data) => {
    if (data) return res.send(result.createResult(null, data));
    else return res.send(result.createResult(err));
  });
});

module.exports = router;
