import { Paper, Box } from "@mui/material";

import AddHeader from "../../../../components/vendor/headers/Header";
import ProductFields from "./ProductFields";

export default function Product() {
  return (
    <>
      {/* Page Header */}
      <AddHeader title={"Products"} navigateTo={"allproducts"} type={"add"} />

      {/* Form Section */}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Paper
          elevation={2}
          sx={{
            width: "60%",
            p: 3,
            margin: "30px 0px 30px 0px",
          }}
        >
          {/* category fields*/}
          <ProductFields mode={"add"} data={null} />
        </Paper>
      </Box>
    </>
  );
}
