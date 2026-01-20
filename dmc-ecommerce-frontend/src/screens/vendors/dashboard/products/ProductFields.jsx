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
import serverData from "../../../../services/ServerData";
import { useNavigate } from "react-router";
import defaultImage from "/src/assets/small-logo.jpeg";
import { base_url, categories, subCategories } from "../../../../utils/config";
import ProductImageDropzone from "./ProductImageDropzone";

function ProductFields({ mode = "add", data = null, onClose }) {
  console.log("ProductFields", data);

  const navigate = useNavigate();
  const [filteredSubCategories, setFilteredSubCategories] = React.useState([]);

  const [form, setForm] = useState({
    categoryId: "",
    subCategoryId: "",
    product: "",
    description: "",
    price: "",
    stock: "",
    status: "continue",
    images: [],
    previews: [],
  });

  // Prefill when editing
  useEffect(() => {
    if (mode === "edit" && data) {
      setForm({
        categoryId: data.categoryId,
        subCategoryId: data.subCategoryId,
        product: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock,
        status: data.status,
        file: null,
        preview: `${base_url.vendorUrl}/images/${data.image}`,
      });
    }
    const filtered = subCategories.filter(
      (sub) => sub.categoryId == data?.categoryId
    );
    setFilteredSubCategories(filtered);
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
    console.log(form.stock);
    if (!form.categoryId) return toast.error("Select category first");
    if (!form.subCategoryId) return toast.error("Select subcategory");
    if (!form.product) return toast.error("Product name is required");
    if (!form.description) return toast.error("Description is required");
    if (!form.price) return toast.error("Price is required");
    if (!form.stock) return toast.error("Stock is required");

    try {
      let response;

      if (mode === "add") {
        const fd = new FormData();

        fd.append("categoryId", form.categoryId);
        fd.append("subCategoryId", form.subCategoryId);
        fd.append("name", form.product);
        fd.append("description", form.description);
        fd.append("price", form.price);
        fd.append("stock", form.stock);
        fd.append("status", form.status);

        form.images.forEach((file) => {
          fd.append("images", file);
        });

        console.log("Adding product:", form);
        response = await serverData.addProduct(fd);
      } else {
        const body = {
          productId: data.id,
          categoryId: form.categoryId,
          subCategoryId: form.subCategoryId,
          name: form.product,
          description: form.description,
          price: form.price,
          stock: form.stock,
          status: form.status,
        };

        console.log("Updating product:", body);
        response = await serverData.updateProduct(body);
      }

      if (response?.data) {
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
      } else {
        toast.error(response?.data?.message || "Operation failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
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
          control={
            <Switch
              color="primary"
              checked={form.status === "continue"}
              onChange={(e) => {
                setForm((prev) => ({
                  ...prev,
                  status: e.target.checked ? "continue" : "discontinue",
                }));
              }}
            />
          }
          label="Status"
        />
      </Grid>

      {mode === "add" && (
        <>
          <Grid size={12}>
            <hr />
          </Grid>
          <Grid size={12}>
            <AppSubHeader>Add Product Images</AppSubHeader>
          </Grid>

          <ProductImageDropzone
            images={form.images}
            previews={form.previews}
            setImages={(fn) =>
              setForm((prev) => ({ ...prev, images: fn(prev.images) }))
            }
            setPreviews={(fn) =>
              setForm((prev) => ({ ...prev, previews: fn(prev.previews) }))
            }
          />
        </>
      )}

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
