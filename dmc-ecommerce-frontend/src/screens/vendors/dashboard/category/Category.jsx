import { TextField, Paper, Box, Grid, Button, Avatar } from "@mui/material";
import SegmentIcon from "@mui/icons-material/Segment";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router";
import { styled } from "@mui/material/styles";
import { PhotoCamera } from "@mui/icons-material";
import { useState } from "react";
import Server from "../../../../services/callServer";
import { AppHeader, AppSubHeader, AppText } from "../../../../utils/AppText";
import serverData from "../../../../services/ServerData";
import { toast } from "react-toastify";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function Category() {
  const navigate = useNavigate();

  const [category, setCategory] = useState("");
  const [categoryLogo, setCategoryLogo] = useState({
    fileName: "/src/assets/small-logo.jpeg",
    bytes: "",
  });

  const handleImage = (event) => {
    setCategoryLogo({
      fileName: URL.createObjectURL(event.target.files[0]),
      bytes: event.target.files[0],
    });
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("name", category);
    formData.append("image", categoryLogo.bytes);

    try {
      const response = await serverData.addCategory(formData);
      if (response.status) {
        toast.success("Category added successfully");
        navigate("/page/allcategory");
      } else {
        toast.error(response.error);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <AppHeader>Category</AppHeader>
        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={() => navigate("/page/allcategory")}>
            <SegmentIcon />
          </IconButton>
        </div>
      </div>
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={2}
          style={{
            width: "60%",
            height: "fit-content",
            padding: "16px",
            marginTop: "3%",
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid size={6}>
                <AppSubHeader>Add Category</AppSubHeader>
              </Grid>

              <Grid size={12}>
                <TextField
                  id="category"
                  label="Category"
                  placeholder="Mens, Womens, Kids etc."
                  variant="outlined"
                  fullWidth
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </Grid>
              <Grid
                size={6}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <IconButton
                  fullWidth
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                >
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={handleImage}
                  />
                  <PhotoCamera />
                </IconButton>
              </Grid>
              <Grid
                size={6}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Avatar
                  alt="Remy Sharp"
                  variant="rounded"
                  src={categoryLogo.fileName}
                  sx={{ width: 56, height: 56 }}
                />
              </Grid>

              <Grid
                size={12}
                style={{
                  display: "flex",
                  justifyContent: "end",
                  marginTop: "16px",
                }}
              >
                <Button
                  variant="outlined"
                  style={{ textTransform: "none" }}
                  onClick={() => {
                    setCategory("");
                    setCategoryLogo({
                      fileName: "/src/assets/small-logo.jpeg",
                      bytes: "",
                    });
                  }}
                >
                  Reset
                </Button>

                <Button
                  variant="contained"
                  style={{ marginLeft: "16px", textTransform: "none" }}
                  onClick={handleSave}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </>
  );
}

export default Category;
