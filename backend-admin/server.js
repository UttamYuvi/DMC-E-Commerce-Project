const express = require("express");
const cors = require("cors");
const adminRouter = require("./routers/admin");
const vendorRouter = require("./routers/vendor");
const authorization = require("./utils/adminAuth");

const app = express();

app.use(cors());
app.use(express.json());

app.use(authorization);
app.use("/admin", adminRouter);
app.use("/vendor", vendorRouter);
/*
app.use((req,res,next)=>{
  req.url = req.url.trim();
  next();
});
*/
app.listen(4001, "localhost", () => {
  console.log("Server started at 4001");
});
