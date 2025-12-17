import { Delete, Edit } from "@mui/icons-material";
import { Avatar, Box, CircularProgress, IconButton } from "@mui/material";
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

export default function AllProducts() {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    try {
      const res = await serverData.allProductList();
      if (res.data.status) {
        setProducts(res.data.data);
      }
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
        loadProducts();
      }
    } catch {
      toast.error("Failed to delete");
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  console.log(products);

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
                imageArray = item.images ? JSON.parse(item.images) : [];
              } catch (e) {
                imageArray = [];
                console.log(imageArray, e);
              }

              return (
                <tr key={i}>
                  <td style={{ alignContent: "center" }}>
                    <AppText>{item.categoryName}</AppText>
                    <AppText>{item.subCategoryName}</AppText>
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
                  <td style={{ alignContent: "center" }}>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      {imageArray.map((img, index) => (
                        <Avatar
                          key={index}
                          src={`${base_url.url}/images/${img}`}
                          variant="rounded"
                          sx={{ width: 40, height: 40 }}
                        />
                      ))}
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

      {/* Update/Add Dialog */}
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
            onSuccess={loadProducts}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
