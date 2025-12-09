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
import { styled } from "@mui/material/styles";

const HiddenInput = styled("input")({
  display: "none",
});

export default function AllCategory() {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedImg, setSelectedImg] = useState({}); // Temporary preview per category
  const [showActions, setShowActions] = useState({}); // To show Save / Cancel button per category

  const loadCategories = async () => {
    try {
      const res = await serverData.allCategories();
      if (res.data) setCategories(res.data);
    } catch {
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  const handleImage = (e, item) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Basic file validation (optional)
    if (!file.type.startsWith("image/")) {
      return toast.error("Only image files allowed");
    }

    const previewURL = URL.createObjectURL(file);

    setSelectedImg((prev) => ({ ...prev, [item.id]: previewURL }));
    setShowActions((prev) => ({ ...prev, [item.id]: true }));
    // setImageFile((prev) => ({ ...prev, [item.id]: file }));
  };

  const handleCancel = (itemId) => {
    setShowActions((prev) => ({ ...prev, [itemId]: false }));
    setSelectedImg((prev) => {
      const copy = { ...prev };
      delete copy[itemId];
      return copy;
    });
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

      if (res.data) {
        toast.success("Category deleted sucessfully");
        loadCategories();
      }
    } catch {
      toast.error("Failed to delete");
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

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
                  <IconButton component="label">
                    <HiddenInput
                      type="file"
                      accept="image/*"
                      onChange={handleImage}
                    />
                    <img
                      src={
                        selectedImg[item.id]
                          ? selectedImg[item.id]
                          : `${base_url.url}/uploads/${item.image}`
                      }
                      alt="category"
                      width="50px"
                    />
                  </IconButton>

                  {showActions[item.id] ? (
                    <>
                      <Button
                        size="small"
                        variant="contained"
                        color="success"
                        // onClick={() => handleSave(item.id)}
                      >
                        Save
                      </Button>

                      <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        onClick={() => handleCancel(item.id)}
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      {/* DELETE */}
                      <IconButton onClick={(e) => handleDelete(e, item.id)}>
                        <Delete />
                      </IconButton>

                      {/* EDIT */}
                      <IconButton
                        onClick={() => {
                          setEditData(item);
                          setOpen(true);
                        }}
                      >
                        <Edit />
                      </IconButton>
                    </>
                  )}
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
