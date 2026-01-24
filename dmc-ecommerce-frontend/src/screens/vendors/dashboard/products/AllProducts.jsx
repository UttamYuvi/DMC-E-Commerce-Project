import { Delete, Edit } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  IconButton,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { useEffect, useState } from "react";
import Header from "../../../../components/vendor/headers/Header";
import serverData from "../../../../services/ServerData";
import { AppSubHeader, AppText } from "../../../../utils/AppText";

import { toast } from "react-toastify";
import Swal from "sweetalert2";
import emptyListImg from "../../../../assets/empty_box.png";
import ProductFields from "./ProductFields";
import { base_url } from "../../../../utils/config";
import ImagesUpdateField from "./ProductImageDropzone";
import ProductImageDropzone from "./ProductImageDropzone";

export default function AllProducts() {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [openImgUpdateDialog, setOpenImgUpdateDialog] = useState(false);
  const [showImgActions, setShowImgActions] = useState(false);
  const [editData, setEditData] = useState(null);
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");

  const [form, setForm] = useState({
    images: [],
    previews: [],
  });

  const loadProducts = async () => {
    try {
      const res = await serverData?.allProductList();
      console.log(res.data)
      if (res) {
        setProducts(res.data);
      }
    } catch {
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (e, item) => {
    console.log(item.id);
    const confirm = await Swal.fire({
      title: "Delete?",
      text: "deletion is not revertable.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await serverData.deleteProduct(item.id);
      console.log("ress: ", res);
      if (res) {
        toast.success("Deleted");
        loadProducts();
      }
    } catch {
      toast.error("Failed to delete");
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleProductImages = async () => {
    const fd = new FormData();

    fd.append("productId", productId);
    form.images.forEach((file, index) => {
      fd.append(`images[${index}]`, file);
    });

    console.log("Adding product Images:", form);
    const response = await serverData.updateProductImages(fd);
    if (response.status) {
      setOpenImgUpdateDialog(false);
      loadProducts();
    }
  };

  return (
    <>
      <Header title={"Products"} navigateTo={"product"} />

      {loading ? (
        <Box sx={{ textAlign: "center", py: 5 }}>
          <CircularProgress />
        </Box>
      ) : products.length === 0 ? (
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
                <AppSubHeader style={{ fontSize: "16px" }}>Title</AppSubHeader>
              </th>
              <th>
                <AppSubHeader style={{ fontSize: "16px" }}>
                  Description
                </AppSubHeader>
              </th>
              <th>
                <AppSubHeader style={{ fontSize: "16px" }}>Stock</AppSubHeader>
              </th>
              <th>
                <AppSubHeader style={{ fontSize: "16px" }}>Price</AppSubHeader>
              </th>

              <th>
                <AppSubHeader style={{ fontSize: "16px" }}>Images</AppSubHeader>
              </th>

              <th>
                <AppSubHeader style={{ fontSize: "16px" }}>Date</AppSubHeader>
              </th>
              <th style={{ display: "flex", justifyContent: "right" }}>
                <AppSubHeader style={{ fontSize: "16px" }}>Action</AppSubHeader>
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, i) => {
              let imageArray = [];

              try {
                // imageArray = item.images ? JSON.parse(item.images) : [];
                imageArray = item.images.split(",");
              } catch (e) {
                imageArray = [];
                console.log(imageArray, e);
              }
              console.log(`imgggg: `, imageArray);

              return (
                <tr key={i}>
                  <td style={{ alignContent: "center" }}>
                    <AppText style={{ fontSize: "10px", fontWeight: "bold" }}>
                      {item.category}
                    </AppText>
                    <AppText>{item.subCategory}</AppText>
                  </td>

                  <td style={{ alignContent: "center" }}>
                    <AppText>{item.name}</AppText>
                  </td>

                  <td style={{ alignContent: "center" }}>
                    <AppText>{item.description}</AppText>
                  </td>
                  <td style={{ alignContent: "center" }}>
                    <AppText>{item.stock}</AppText>
                  </td>
                  <td style={{ alignContent: "center" }}>
                    <AppText>&#8377;{item.price}</AppText>
                  </td>
                  <td
                    onClick={() => {
                      setOpenImgUpdateDialog(true);
                      setProductId(item.productId);
                    }}
                    style={{ alignContent: "center", cursor: "pointer" }}
                  >
                    <Box sx={{ display: "flex", gap: 1 }}>
                      {imageArray.map((img, index) => {
                        console.log(img);
                        return (
                          <Avatar
                            key={index}
                            src={`${base_url.vendorUrl}/uploads/products/${img}`}
                            variant="rounded"
                            sx={{ width: 40, height: 40 }}
                          />
                        );
                      })}
                    </Box>
                  </td>
                  <td style={{ alignContent: "center" }}>
                    <AppText>
                      {new Date(item.createdAt).toLocaleDateString()}
                    </AppText>
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
              );
            })}
          </tbody>
        </table>
      )}

      {/* Update/Add Dialog Product*/}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent>
          <ProductFields
            mode={editData ? "edit" : "add"}
            data={editData}
            onClose={() => setOpen(false)}
            loadProducts={loadProducts}
          />
        </DialogContent>
      </Dialog>

      {/* Update Images */}
      <Dialog
        open={openImgUpdateDialog}
        onClose={() => {
          setOpenImgUpdateDialog(false);
          setShowImgActions(false);
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent>
          <ProductImageDropzone
            productId={productId}
            images={form.images}
            previews={form.previews}
            setImages={(fn) =>
              setForm((prev) => ({ ...prev, images: fn(prev.images) }))
            }
            setPreviews={(fn) =>
              setForm((prev) => ({ ...prev, previews: fn(prev.previews) }))
            }
            onImageSelect={() => setShowImgActions(true)}
          />
          {showImgActions && (
            <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
              <Button
                variant="outlined"
                onClick={() => {
                  setForm((prev) => ({ ...prev, images: [], previews: [] }));
                  setShowImgActions(false);
                  setOpenImgUpdateDialog(false);
                }}
              >
                Cancel
              </Button>

              <Button variant="contained" onClick={handleProductImages}>
                Upload
              </Button>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
