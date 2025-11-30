import React, { useEffect, useState } from "react";
import { AppHeader, AppSubHeader, AppText } from "../../../../utils/AppText";
import CategoryIcon from "@mui/icons-material/Category";
import { IconButton } from "@mui/material";
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
import Server from "../../../../services/callServer";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function AllCategory() {
  const navigate = useNavigate();

  const [categoryId, setCategoryId] = useState("");
  const [categoryName, setCategoryName] = useState("");

  const [categoryLogo, setCategoryLogo] = useState({
    fileName: "/src/assets/small-logo.jpeg",
    bytes: "",
  });

  const [categories, setCategories] = useState([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const fetchCategoryData = async () => {
    try {
      const response = await serverData.allCategories();
      if (response.data.status) {
        setCategories(response.data.data);
      } else Toast("Error");
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    fetchCategoryData();
  }, []);

  const handleDelete = (e, item) => {
    Swal.fire({
      title: "Are you sure?",
      showDenyButton: true,
      confirmButtonText: "Delete",
      denyButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await serverData.deleteCategory({
            categoryId: item.categoryId,
          });
          if (response.data.status) {
            Swal.fire("Category deleted successfully", "", "success");
            fetchCategoryData();
          }
        } catch (error) {
          toast.error(error);
        }
      } else if (result.isDenied) {
        Swal.fire("Abort deleting category", "", "info");
      }
    });
  };

  const handleOpenEditDialog = (event, item) => {
    setCategoryId(item.categoryId);
    setCategoryName(item.name);

    setCategoryLogo({
      fileName: `${base_url.url}/images/${item.image}`,
      bytes: "",
    });

    setOpenEditDialog(true);
  };

  const showCategoryData = () => {
    return (
      <>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <AppHeader>All Category</AppHeader>
          <div style={{ display: "flex", alignItems: "center" }}>
            <IconButton onClick={() => navigate("/page/category")}>
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
                <AppSubHeader style={{ fontSize: "16px" }}>Image</AppSubHeader>
              </th>
              <th style={{ display: "flex", justifyContent: "right" }}>
                <AppSubHeader style={{ fontSize: "16px" }}>Action</AppSubHeader>
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map((item, i) => (
              <tr key={i}>
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

  // const handleCancle = () => {
  //   setCategoryLogo({
  //     fileName: `${base_url.url}/images/${oldImage}`,
  //     bytes: "",
  //   });
  // };

  const handleClose = () => {
    setOpenEditDialog(false);
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("categoryId", categoryId);
      formData.append("name", categoryName);

      if (categoryLogo.bytes) {
        formData.append("image", categoryLogo.bytes);
      } else {
        formData.append("image", null);
      }

      const response = await serverData.updateCategory(formData);

      if (response.data.status) {
        toast.success("Category updated successfully");
        handleClose();
        fetchCategoryData();
      } else {
        toast.error("Category update failed");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleImage = (event) => {
    setCategoryLogo({
      fileName: URL.createObjectURL(event.target.files[0]),
      bytes: event.target.files[0],
    });
  };

  const editCategoryDialog = () => {
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
              <Grid size={12}>
                <TextField
                  variant="outlined"
                  label="Category"
                  fullWidth
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
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
                  src={categoryLogo.fileName}
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
      {showCategoryData()}
      {editCategoryDialog()}
    </>
  );
}
