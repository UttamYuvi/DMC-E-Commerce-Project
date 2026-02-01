const express = require("express");
const cors = require("cors");
const adminRouter = require("./routers/admin");
const vendorRouter = require("./routers/vendor");
const authorization = require("./utils/adminAuth");

const PORT = process.env.PORT || 4001;

const app = express();

app.use(cors());
app.use(express.json());

app.use(authorization);
app.use("/admin", adminRouter);
app.use("/vendor", vendorRouter);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server started at ${PORT}`);
});
