import {
  TextField,
  Paper,
  Box,
  Grid,
  Button,
  Avatar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import SegmentIcon from "@mui/icons-material/Segment";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router";
import { PhotoCamera } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { AppHeader, AppSubHeader, AppText } from "../../../../utils/AppText";
import serverData from "../../../../services/ServerData";
import { toast } from "react-toastify";

import CircularProgress from "@mui/material/CircularProgress";

function SubCategory() {
  const navigate = useNavigate();

  const [subCategoryLogo, setSubCategoryLogo] = useState({
    fileName: "/src/assets/small-logo.jpeg",
    bytes: "",
  });

  const [categories, setCategories] = useState(null);
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");

  const [btnStatus, setBtnStatus] = useState(false);

  useEffect(function () {
    getAllCategory();
  }, []);

  const getAllCategory = async () => {
    try {
      const response = await serverData.allCategories();
      if (response.data.status) {
        setCategories(response.data.data);
      } else toast.error("Error");
    } catch (error) {
      toast.error(error);
    }
  };

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const handleImage = (event) => {
    setSubCategoryLogo({
      fileName: URL.createObjectURL(event.target.files[0]),
      bytes: event.target.files[0],
    });
  };

  const handleSave = async () => {
    setBtnStatus(true);
    const formData = new FormData();
    formData.append("categoryId", category);
    formData.append("name", subCategory);
    formData.append("image", subCategoryLogo.bytes);

    try {
      const response = await serverData.addSubCategory(formData);
      if (response.status) {
        toast.success("Subcategory added successfully");
        navigate("/page/allsubcategory");
      } else {
        toast.error(response.error);
      }
      setBtnStatus(false);
    } catch (error) {
      toast.error(error);
      setBtnStatus(false);
    }
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <AppHeader>Sub Category</AppHeader>
        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={() => navigate("/page/allsubcategory")}>
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
              <Grid size={12}>
                <AppSubHeader>Add SubCategory</AppSubHeader>
              </Grid>

              <Grid size={6}>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="category-label">Category</InputLabel>
                    <Select
                      labelId="category-label"
                      id="Category"
                      value={category}
                      label="Category"
                      onChange={handleChange}
                    >
                      {categories?.map((item) => (
                        <MenuItem value={item.categoryId}>{item.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Grid>

              <Grid size={6}>
                <TextField
                  id="subcategory"
                  label="SubCategory"
                  placeholder="Jeans, Shirts, Tops etc."
                  variant="outlined"
                  fullWidth
                  value={subCategory}
                  onChange={(e) => setSubCategory(e.target.value)}
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
                  src={subCategoryLogo.fileName}
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
                    setSubCategoryLogo({
                      fileName: "/src/assets/small-logo.jpeg",
                      bytes: "",
                    });
                  }}
                >
                  Reset
                </Button>

                {btnStatus ? (
                  <Box sx={{ display: "flex" }}>
                    <CircularProgress
                      size={30}
                      style={{ marginLeft: "16px" }}
                    />
                  </Box>
                ) : (
                  <Button
                    variant="contained"
                    style={{ marginLeft: "16px", textTransform: "none" }}
                    onClick={handleSave}
                  >
                    Save
                  </Button>
                )}
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </>
  );
}

export default SubCategory;
