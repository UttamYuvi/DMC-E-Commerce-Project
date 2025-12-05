import React, { useEffect, useState } from "react";
import { AppHeader, AppSubHeader, AppText } from "../../../../utils/AppText";
import CategoryIcon from "@mui/icons-material/Category";
import { Box, CircularProgress, IconButton } from "@mui/material";
import serverData from "../../../../services/ServerData";
import { Toast } from "bootstrap";
import { base_url } from "../../../../utils/config";
import { Delete, Edit } from "@mui/icons-material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { PhotoCamera } from "@mui/icons-material";
import { Avatar, Grid, TextField, Button } from "@mui/material";
import Header from "../../../../components/vendor/headers/Header";

import { toast } from "react-toastify";
import Swal from "sweetalert2";
import CategoryFields from "./CategoryFields";
import emptyListImg from "../../../../assets/empty_box.png";

export default function AllCategory() {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [categories, setCategories] = useState([]);

  const loadCategories = async () => {
    try {
      const res = await serverData.allCategories();
      if (res.data.status) setCategories(res.data.data);
    } catch {
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (e, id) => {
    const confirm = await Swal.fire({
      title: "Delete?",
      text: "deletion is not revertable.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await serverData.deleteCategory(id);

      if (res.data.status) {
        toast.success("Deleted");
        loadCategories();
      }
    } catch {
      toast.error("Failed to delete");
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  // const handleUpdate = async () => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("categoryId", categoryId);
  //     formData.append("name", categoryName);

  // if (categoryLogo.bytes) {
  //   formData.append("image", categoryLogo.bytes);
  // } else {
  //   formData.append("image", null);
  //     }

  //     const response = await serverData.updateCategory(formData);

  //     if (response.data.status) {
  //       toast.success("Category updated successfully");
  //       handleClose();
  //       fetchCategoryData();
  //     } else {
  //       toast.error("Category update failed");
  //     }
  //   } catch (error) {
  //     toast.error(error);
  //   }
  // };

  // const handleImage = (event) => {
  //   setCategoryLogo({
  //     fileName: URL.createObjectURL(event.target.files[0]),
  //     bytes: event.target.files[0],
  //   });
  // };

  // const editCategoryDialog = () => {
  //   return (
  //     <React.Fragment>
  //       <Dialog
  //         open={openEditDialog}
  //         onClose={handleClose}
  //         aria-labelledby="alert-dialog-title"
  //         aria-describedby="alert-dialog-description"
  //       >
  //         <DialogContent>
  //           <Grid container spacing={2}>
  //             <Grid size={12}>
  //               <AppSubHeader>Update category</AppSubHeader>
  //             </Grid>
  //             <Grid size={12}>
  //               <TextField
  //                 variant="outlined"
  //                 label="Category"
  //                 fullWidth
  //                 value={categoryName}
  //                 onChange={(e) => setCategoryName(e.target.value)}
  //                 placeholder="Updated category name"
  //               />
  //             </Grid>

  //             <Grid
  //               item
  //               xs={6}
  //               style={{
  //                 display: "flex",
  //                 justifyContent: "space-around",
  //                 width: "100%",
  //               }}
  //             >
  //               <IconButton
  //                 fullWidth
  //                 color="primary"
  //                 aria-label="upload picture"
  //                 component="label"
  //               >
  //                 <input
  //                   hidden
  //                   accept="image/*"
  //                   type="file"
  //                   onChange={handleImage}
  //                 />
  //                 <PhotoCamera />
  //               </IconButton>
  //               <Avatar
  //                 alt="Remy Sharp"
  //                 variant="rounded"
  //                 src={categoryLogo.fileName}
  //                 sx={{ width: 56, height: 56 }}
  //               />
  //             </Grid>
  //           </Grid>
  //         </DialogContent>
  //         <DialogActions>
  //           <Button
  //             onClick={handleClose}
  //             color="error"
  //             variant="outlined"
  //             style={{ textTransform: "none" }}
  //           >
  //             Cancel
  //           </Button>
  //           <Button
  //             onClick={handleUpdate}
  //             autoFocus
  //             variant="contained"
  //             style={{ textTransform: "none" }}
  //           >
  //             Update
  //           </Button>
  //         </DialogActions>
  //       </Dialog>
  //     </React.Fragment>
  //   );
  // };

  return (
    <>
      <Header title={"Category"} navigateTo={"category"} />

      {loading ? (
        <Box sx={{ textAlign: "center", py: 5 }}>
          <CircularProgress />
        </Box>
      ) : categories.length === 0 ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img src={emptyListImg} alt="empty-list" width={"200px"} />
        </div>
      ) : (
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
                      onClick={() => {
                        setEditData(item);
                        setOpen(true);
                      }}
                    >
                      <Edit />
                    </IconButton>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Update/Add Dialog */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent>
          <CategoryFields
            mode={editData ? "edit" : "add"}
            data={editData}
            onClose={() => setOpen(false)}
            onSuccess={loadCategories}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
