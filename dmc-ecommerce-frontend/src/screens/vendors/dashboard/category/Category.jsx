import { Paper, Box } from "@mui/material";

import Header from "../../../../components/vendor/headers/Header";
import CategoryFields from "./CategoryFields";


export default function Category() {
  

  return (
    <>
      {/* Page Header */}
      <Header title={"Category"} navigateTo={"allcategory"} type={"add"} />

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
          {/* category fields*/}
          <CategoryFields mode={"add"} data={null} />
        </Paper>
      </Box>
    </>
  );
}
