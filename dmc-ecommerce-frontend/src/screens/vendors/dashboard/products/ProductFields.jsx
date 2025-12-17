import {
  Avatar,
  Grid,
  IconButton,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormLabel,
  FormControlLabel,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { AppSubHeader } from "../../../../utils/AppText";
import { PhotoCamera } from "@mui/icons-material";
import { toast } from "react-toastify";
// import serverData from "../../../../services/ServerData";
import { useNavigate } from "react-router";
import defaultImage from "/src/assets/small-logo.jpeg";
import { base_url, categories, subCategories } from "../../../../utils/config";
import Dropzone from "react-dropzone";
import serverData from "../../../../services/ServerData";

function ProductFields({ mode = "add", data = null, onClose, onSuccess }) {
  const MAX_FILES = 4;
  const MAX_FILE_SIZE_MB = 2;
  const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

  const navigate = useNavigate();
  const [filteredSubCategories, setFilteredSubCategories] = React.useState([]);

  const [form, setForm] = useState({
    categoryId: "",
    subCategoryId: "",
    product: "",
    description: "",
    price: "",
    stock: "",
    status: true,
    images: [],
    previews: [],
  });

  // Prefill when editing
  useEffect(() => {
    if (mode === "edit" && data) {
      setForm({
        name: data.name,
        file: null,
        preview: `${base_url.url}/images/${data.image}`,
      });
    }
  }, [mode, data]);

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setForm((prev) => ({ ...prev, categoryId: categoryId }));

    const filtered = subCategories.filter(
      (sub) => sub.categoryId == categoryId
    );

    setFilteredSubCategories(filtered);
  };
  const handleSubCategoryChange = (e) => {
    const subCategory = e.target.value;
    setForm((prev) => ({ ...prev, subCategoryId: subCategory }));
  };

  const handleSave = async () => {
    if (!form.categoryId != 0) return toast.error("Select category first");
    if (!form.subCategoryId != 0) return toast.error("Select subcategory");
    if (!form.product.trim()) return toast.error("Product name is required");
    if (!form.description.trim()) return toast.error("Description is required");
    if (!form.price.trim()) return toast.error("Price is required");
    if (!form.stock.trim()) return toast.error("Stock is required");

    const fd = new FormData();
    fd.append("categoryId", form.categoryId);
    fd.append("subCategoryId", form.subCategoryId);
    fd.append("product", form.product);
    fd.append("description", form.description);
    fd.append("price", form.price);
    fd.append("stock", form.stock);
    fd.append("status", form.status);

    form.images.map((item, index) => {
      fd.append("images" + index, item);
    });

    try {
      let response;

      if (mode === "add") {
        console.log("Addding product log: ", form);
        response = await serverData.addProduct(fd);
      } else {
        // response = await serverData.updateCategory(fd);
      }

      if (response.data.status) {
        toast.success(
          mode === "add"
            ? "Product added successfully"
            : "Product updated successfully"
        );
        if (mode === "add") {
          navigate("/page/allproducts");
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
        categoryId: "",
        subCategoryId: "",
        product: "",
        description: "",
        price: "",
        stock: "",
        status: true,
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
          {mode === "add" ? "Add Product" : "Update Produt"}
        </AppSubHeader>
      </Grid>

      <Grid size={4}>
        <FormControl fullWidth>
          <InputLabel id="category-label">Category</InputLabel>

          <Select
            labelId="category-label"
            value={form.categoryId}
            label="Category"
            onChange={handleCategoryChange}
          >
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid size={4}>
        <FormControl fullWidth>
          <InputLabel id="subcategory-label">Sub Category</InputLabel>
          <Select
            labelId="subcategory-label"
            label="Sub Category"
            disabled={!form.categoryId}
            value={form.subCategoryId}
            onChange={handleSubCategoryChange}
          >
            {filteredSubCategories.map((sub) => (
              <MenuItem key={sub.id} value={sub.id}>
                {sub.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid size={4}>
        <TextField
          label="Title"
          placeholder="Raymond, Levi's, Redtape etc..."
          variant="outlined"
          fullWidth
          value={form.product}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, product: e.target.value }))
          }
        />
      </Grid>

      <Grid size={12}>
        <TextField
          label="Description"
          placeholder="Tell something about this product"
          variant="outlined"
          fullWidth
          value={form.description}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, description: e.target.value }))
          }
        />
      </Grid>

      <Grid size={4}>
        <TextField
          label="Price"
          placeholder="M.R.P."
          variant="outlined"
          fullWidth
          value={form.price}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, price: e.target.value }))
          }
        />
      </Grid>

      <Grid size={4}>
        <TextField
          label="Stock"
          placeholder="No. of items"
          variant="outlined"
          fullWidth
          value={form.stock}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, stock: e.target.value }))
          }
        />
      </Grid>

      <Grid
        size={4}
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <FormControlLabel
          sx={{ margin: 0 }}
          value="Status"
          control={
            <Switch
              color="primary"
              checked={form.status}
              onChange={(e) => {
                setForm((prev) => ({ ...prev, status: e.target.checked }));
              }}
            />
          }
          label="Status"
          labelPlacement="Status"
        />
      </Grid>

      <Grid size={12}>
        <hr />
      </Grid>

      <Grid size={12}>
        <AppSubHeader>Add Product Images</AppSubHeader>
      </Grid>

      <Grid size={12}>
        <Dropzone
          accept={{ "image/*": [] }}
          multiple
          onDrop={(acceptedFiles) => {
            setForm((prev) => {
              const availableSlots = MAX_FILES - prev.images.length;
              if (availableSlots <= 0) {
                alert(`You can upload only ${MAX_FILES} images`);
                return prev;
              }
              // Size validation
              const validFiles = acceptedFiles.filter(
                (file) => file.size <= MAX_FILE_SIZE_BYTES
              );
              if (validFiles.length !== acceptedFiles.length) {
                alert(`Each file must be less than ${MAX_FILE_SIZE_MB} MB`);
              }
              // Limit count
              const filesToAdd = validFiles.slice(0, availableSlots);
              // Removes Dupliate images
              const newFile = filesToAdd.filter(
                (file) => !prev.images.some((img) => img.name === file.name)
              );

              return {
                ...prev,
                images: [...prev.images, ...newFile],
                previews: [
                  ...prev.previews,
                  ...newFile.map((file) => URL.createObjectURL(file)),
                ],
              };
            });
          }}
        >
          {({ getRootProps, getInputProps }) => (
            <section>
              <div
                {...getRootProps()}
                style={{
                  border: "2px dashed #aaa",
                  padding: "20px",
                  textAlign: "center",
                  cursor: "pointer",
                }}
              >
                <input {...getInputProps()} />
                <p>
                  Drag & drop images or click to upload (max 4 images,{" "}
                  {MAX_FILE_SIZE_MB}MB each)
                </p>
              </div>
            </section>
          )}
        </Dropzone>
      </Grid>

      <Grid size={12} display="flex" gap={2} mt={2}>
        {form.previews.map((src, index) => (
          <Avatar
            key={index}
            variant="rounded"
            src={src}
            style={{
              objectFit: "cover",
              borderRadius: 50,
              width: 80,
              height: 80,
            }}
          />
        ))}
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

export default ProductFields;
