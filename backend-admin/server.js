const express = require("express");
const adminRouter = require("./routers/admin");
const vendorRouter = require("./routers/vendor");
const authorization = require("./utils/adminAuth");

const app = express();

app.use(express.json());

// app.use(authorization);
app.use("/admin", adminRouter);
app.use("/vendor", vendorRouter);

app.listen(4001, "localhost", () => {
  console.log("Server started at 4001");
});
