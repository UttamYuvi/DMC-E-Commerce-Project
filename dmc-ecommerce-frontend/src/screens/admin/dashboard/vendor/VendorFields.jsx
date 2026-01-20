import { Avatar, Grid, IconButton, TextField, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { AppSubHeader } from "../../../../utils/AppText";
import { PhotoCamera } from "@mui/icons-material";
import { toast } from "react-toastify";
import serverData from "../../../../services/ServerData";
import { useNavigate } from "react-router";
import { styled } from "@mui/material/styles";
import defaultImage from "/src/assets/small-logo.jpeg";
import { base_url } from "../../../../utils/config";

const HiddenInput = styled("input")({
  display: "none",
});

function VendorFields({ mode = "add", data = null, onClose, onSuccess }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    file: null,
    preview: defaultImage,
  });

  // Prefill when editing
  useEffect(() => {
    if (mode === "edit" && data) {
      setForm({
        name: data.name,
        file: null,
        preview: `${base_url.vendorUrl}/images/${data.image}`,
      });
    }
  }, [mode, data]);

  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Basic file validation (optional)
    if (!file.type.startsWith("image/")) {
      return toast.error("Only image files allowed");
    }

    setForm((prev) => ({
      ...prev,
      file,
      preview: URL.createObjectURL(file),
    }));
  };

  const handleSave = async () => {
    if (!form.name.trim()) return toast.error("Category name is required");

    const fd = new FormData();
    fd.append("name", form.name);
    if (mode === "edit") fd.append("categoryId", data.categoryId);
    if (form.file) fd.append("image", form.file);
    else fd.append("image", null);

    try {
      let response;

      if (mode === "add") {
        console.log("adding cat1:");
        response = await serverData.addCategory(fd);
      } else {
        console.log("updating req: ", form);
        response = await serverData.updateCategory(fd);
      }

      if (response.data.status) {
        toast.success(
          mode === "add"
            ? "Category added successfully"
            : "Category updated successfully"
        );
        if (mode === "add") {
          navigate("/page/allcategory");
        } else {
          onClose();
        }
        onSuccess();
      } else {
        toast.error(response.data.message || "Failed to add category");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleResetCancel = () => {
    if (mode === "add") {
      setForm({
        name: "",
        file: null,
        preview: defaultImage,
      });
    } else {
      onClose();
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <AppSubHeader>
          {mode === "add" ? "Add Category" : "Update Category"}
        </AppSubHeader>
      </Grid>

      <Grid size={12}>
        <TextField
          label="Category"
          placeholder="Mens, Womens, Kids etc."
          variant="outlined"
          fullWidth
          value={form.name}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      </Grid>

      {/* Upload Button */}
      <Grid size={6} sx={{ display: "flex", justifyContent: "center" }}>
        <IconButton component="label">
          <HiddenInput type="file" accept="image/*" onChange={handleImage} />
          <PhotoCamera />
        </IconButton>
      </Grid>

      {/* Preview Image */}
      <Grid size={6} sx={{ display: "flex", justifyContent: "center" }}>
        <Avatar
          variant="rounded"
          src={form.preview}
          sx={{ width: 56, height: 56 }}
        />
      </Grid>

      {/* Action Buttons */}
      <Grid size={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button variant="outlined" onClick={handleResetCancel}>
          {mode === "add" ? "Reset" : "Cancel"}
        </Button>

        <Button variant="contained" sx={{ ml: 2 }} onClick={handleSave}>
          {mode === "add" ? "Save" : "Update"}
        </Button>
      </Grid>
    </Grid>
  );
}

export default VendorFields;
