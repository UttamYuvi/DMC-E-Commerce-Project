import React, { useEffect, useState } from "react";
import { AppHeader, AppSubHeader, AppText } from "../../../../utils/AppText";
import { Box, CircularProgress, IconButton, Switch } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import emptyListImg from "../../../../assets/empty_box.png";
import serverData from "../../../../services/ServerData";
import AddHeader from "../../../../components/admin/headers/Header";

const label = { inputProps: { "aria-label": "Switch demo" } };

export default function AllVendors() {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [vendors, setVendors] = useState([]);

  const loadCategories = async () => {
    try {
      const res = await serverData.allVendorsList();
      if (res.data.status) {
        setVendors(res.data.data);
      }
    } catch {
      toast.error("Failed to load vendors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleStatus = async (event, item) => {
    const checked = event.target.checked;
    const statusString = checked ? "active" : "inactive";

    // 1️⃣ Update switch UI state
    setVendors((prev) =>
      prev.map((v) =>
        v.vendorId === item.vendorId ? { ...v, status: statusString } : v,
      ),
    );

    // 3️⃣ Payload for backend
    const body = {
      vendorId: item.vendorId,
      status: statusString,
    };

    // 4️⃣ OPTIONAL: call API
    try {
      const res = await serverData.updateVendorStatus(body);
      if (res.data.status) {
        toast.success("Vendor status updated");

        // sync vendors list text
        setVendors((prev) =>
          prev.map((v) =>
            v.vendorId === item.vendorId ? { ...v, status: statusString } : v,
          ),
        );
      }
    } catch {
      toast.error("Failed to update status");
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <AppHeader>All Vendors</AppHeader>
      </Box>

      {loading ? (
        <Box sx={{ textAlign: "center", py: 5 }}>
          <CircularProgress />
        </Box>
      ) : vendors.length === 0 ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img src={emptyListImg} alt="empty-list" width={"200px"} />
        </div>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>
                <AppSubHeader style={{ fontSize: "16px" }}>
                  Vendors
                </AppSubHeader>
              </th>
              <th>
                <AppSubHeader style={{ fontSize: "16px" }}>
                  Contact
                </AppSubHeader>
              </th>

              <th>
                <AppSubHeader style={{ fontSize: "16px" }}>
                  Created At
                </AppSubHeader>
              </th>
              <th>
                <AppSubHeader style={{ fontSize: "16px" }}>Status</AppSubHeader>
              </th>
              <th>
                <AppSubHeader style={{ fontSize: "16px", textAlign: "right" }}>
                  Action
                </AppSubHeader>
              </th>
            </tr>
          </thead>
          <tbody>
            {vendors.map((item, i) => (
              <tr key={i}>
                <td style={{ alignContent: "center" }}>
                  <AppText>{item.firstName}</AppText>
                  <AppText>{item.lastName}</AppText>
                </td>
                <td>
                  <AppText>{item.email}</AppText>
                  <AppText>{item.mobile}</AppText>
                </td>

                <td>
                  <AppText>
                    {new Date(item.createdAt).toLocaleDateString()}
                  </AppText>
                </td>

                <td>
                  <div>
                    <AppText>
                      {item.status?.charAt(0).toUpperCase() +
                        item.status?.slice(1)}
                    </AppText>
                    <Switch
                      {...label}
                      checked={item.status === "active"}
                      onChange={(e) => handleStatus(e, item)}
                    />
                  </div>
                </td>

                <td style={{ textAlign: "right" }}>
                  <IconButton
                    onClick={() => {
                      // setEditData(item);
                      setOpen(true);
                    }}
                  >
                    <Edit />
                  </IconButton>
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
          {/* <CategoryFields
            mode={editData ? "edit" : "add"}
            data={editData}
            onClose={() => setOpen(false)}
            onSuccess={loadCategories}
          /> */}
        </DialogContent>
      </Dialog>
    </>
  );
}
