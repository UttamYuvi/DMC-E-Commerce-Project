import { Paper, Box } from "@mui/material";

import Header from "../../../../components/vendor/headers/Header";
import CategoryFields from "./CategoryFields";
// import serverData from "../../../../services/ServerData";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router";

export default function Category() {
  // const navigate = useNavigate();

  // const handleSave = async (fd) => {
  //   try {
  //     console.log("adding cat2:");
  //     const res = await serverData.addCategory(fd);
  //     if (res.data.status) {
  //       toast.success("Category added successfully");
  //       navigate("/page/allcategory");
  //     } else {
  //       toast.error(res.data.message);
  //     }
  //   } catch (err) {
  //     toast.error(err);
  //   }
  // };

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
