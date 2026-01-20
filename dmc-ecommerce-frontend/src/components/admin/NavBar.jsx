import { Logout } from "@mui/icons-material";
import {
  Avatar,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
} from "@mui/material";
import React, { useState } from "react";

import Settings from "@mui/icons-material/Settings";
import { clearAll } from "../../utils/LocalStorage";
import { useNavigate } from "react-router";

function NavBar() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="navbar sticky-top bg-dark flex-md-nowrap p-0 shadow">
      <div
        style={{ background: "#ffffff", margin: "0px" }}
        className="navbar-brand col-md-3 col-lg-2 me-0 py-3 fs-6 text-black"
      >
        <img src="/src/assets/logo.jpeg" width={"111px"} />
      </div>
      <div className="pr-4">
        <IconButton
          onClick={handleClick}
          id="basic-button"
          style={{ padding: 0 }}
        >
          <Avatar alt="User Profile" src="/profile.jpg" />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          id="basic-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          slotProps={{
            paper: {
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&::before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={handleClose}>
            <Avatar /> Profile
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Update password
          </MenuItem>
          <Divider />

          <MenuItem
            onClick={() => {
              clearAll();
              navigate("/");
            }}
          >
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
}

export default NavBar;
