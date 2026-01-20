import { Paper, Box } from "@mui/material";

import Header from "../../../../components/vendor/headers/Header";
import VendorFields from "./VendorFields";

export default function Vendor() {
  return (
    <>
      {/* Page Header */}
      <Header title={"Vendor"} navigateTo={"allVendors"} type={"add"} />

      {/* Form Section */}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Paper
          elevation={2}
          sx={{
            width: "60%",
            p: 3,
            mt: 3,
          }}
        >
          {/* vendor fields*/}
          {/* <VendorFields mode={"add"} data={null} /> */}
        </Paper>
      </Box>
    </>
  );
}
