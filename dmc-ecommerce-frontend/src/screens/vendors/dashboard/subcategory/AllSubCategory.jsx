import React, { useEffect, useState } from "react";
import { AppHeader, AppSubHeader, AppText } from "../../../../utils/AppText";
import CategoryIcon from "@mui/icons-material/Category";
import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useNavigate } from "react-router";
import serverData from "../../../../services/ServerData";
import { Toast } from "bootstrap";
import { base_url } from "../../../../utils/config";
import { Delete, Edit } from "@mui/icons-material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { PhotoCamera } from "@mui/icons-material";
import { Avatar, Grid, TextField, Button } from "@mui/material";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function AllSubCategory() {
  const navigate = useNavigate();

  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");

  const [subCategoryName, setSubCategoryName] = useState("");

  const [categories, setCategories] = useState(null);

  const [subCategoryLogo, setSubCategoryLogo] = useState({
    fileName: "/src/assets/small-logo.jpeg",
    bytes: "",
  });

  const [subcategories, subSubCategories] = useState([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const fetchSubCategoryData = async () => {
    try {
      const response = await serverData.allSubCategories();
      if (response.data.status) {
        subSubCategories(response.data.data);
      } else toast.error("Error");
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    fetchSubCategoryData();
  }, []);

  useEffect(
    function () {
      getAllCategory();
    },
    [openEditDialog]
  );

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

  const handleDelete = (e, item) => {
    Swal.fire({
      title: "Are you sure?",
      showDenyButton: true,
      confirmButtonText: "Delete",
      denyButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await serverData.deleteSubCategory({
            subCategoryId: item.subCategoryId,
          });
          if (response.data.status) {
            Swal.fire("SubCategory deleted successfully", "", "success");
            fetchSubCategoryData();
          }
        } catch (error) {
          toast.error(error);
        }
      } else if (result.isDenied) {
        Swal.fire("Abort deleting SubCategory", "", "info");
      }
    });
  };

  const handleOpenEditDialog = (event, item) => {
    setSubCategoryId(item.subCategoryId);
    setCategoryId(item.categoryId);
    setSubCategoryName(item.name);

    setSubCategoryLogo({
      fileName: `${base_url.url}/images/${item.image}`,
      bytes: "",
    });

    setOpenEditDialog(true);
  };

  const showSubCategoryData = () => {
    return (
      <>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <AppHeader>All SubCategory</AppHeader>
          <div style={{ display: "flex", alignItems: "center" }}>
            <IconButton onClick={() => navigate("/page/subcategory")}>
              <CategoryIcon />
            </IconButton>
          </div>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>
                <AppSubHeader style={{ fontSize: "16px" }}>
                  Category
                </AppSubHeader>
              </th>
              <th>
                <AppSubHeader style={{ fontSize: "16px" }}>
                  SubCategory
                </AppSubHeader>
              </th>
              <th>
                <AppSubHeader style={{ fontSize: "16px" }}>Image</AppSubHeader>
              </th>
              <th style={{ display: "flex", justifyContent: "right" }}>
                <AppSubHeader style={{ fontSize: "16px" }}>Action</AppSubHeader>
              </th>
            </tr>
          </thead>
          <tbody>
            {subcategories.map((item, i) => (
              <tr key={i}>
                <td style={{ alignContent: "center" }}>
                  <AppText>{item.categoryName}</AppText>
                </td>
                <td style={{ alignContent: "center" }}>
                  <AppText>{item.name}</AppText>
                </td>
                <td>
                  <img
                    src={`${base_url.url}/images/${item.image}`}
                    alt="category_img"
                    width={"50px"}
                  />
                </td>
                <td
                  style={{
                    display: "flex",
                    justifyContent: "right",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <IconButton onClick={(e) => handleDelete(e, item)}>
                      <Delete />
                    </IconButton>
                  </div>
                  <div>
                    <IconButton
                      onClick={(event) => handleOpenEditDialog(event, item)}
                    >
                      <Edit />
                    </IconButton>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  };

  const handleClose = () => {
    setOpenEditDialog(false);
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("categoryId", categoryId);
      formData.append("subCategoryId", subCategoryId);
      formData.append("name", subCategoryName);

      if (subCategoryLogo.bytes) {
        formData.append("image", subCategoryLogo.bytes);
      } else {
        formData.append("image", null);
      }

      const response = await serverData.updateSubCategory(formData);

      if (response.data.status) {
        toast.success("SubCategory updated successfully");
        handleClose();
        fetchSubCategoryData();
      } else {
        toast.error("SubCategory update failed");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleImage = (event) => {
    setSubCategoryLogo({
      fileName: URL.createObjectURL(event.target.files[0]),
      bytes: event.target.files[0],
    });
  };

  const handleChange = (event) => {
    setCategoryId(event.target.value);
  };

  const editSubCategoryDialog = () => {
    return (
      <React.Fragment>
        <Dialog
          open={openEditDialog}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <Grid container spacing={2}>
              <Grid size={12}>
                <AppSubHeader>Update category</AppSubHeader>
              </Grid>

              <Grid size={6}>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="category-label">Category</InputLabel>
                    <Select
                      labelId="category-label"
                      id="Category"
                      value={categoryId}
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
                  variant="outlined"
                  label="Category"
                  fullWidth
                  value={subCategoryName}
                  onChange={(e) => setSubCategoryName(e.target.value)}
                  placeholder="Updated category name"
                />
              </Grid>

              <Grid
                item
                xs={6}
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  width: "100%",
                }}
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
                <Avatar
                  alt="Remy Sharp"
                  variant="rounded"
                  src={subCategoryLogo.fileName}
                  sx={{ width: 56, height: 56 }}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              color="error"
              variant="outlined"
              style={{ textTransform: "none" }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdate}
              autoFocus
              variant="contained"
              style={{ textTransform: "none" }}
            >
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  };

  return (
    <>
      {showSubCategoryData()}
      {editSubCategoryDialog()}
    </>
  );
}
