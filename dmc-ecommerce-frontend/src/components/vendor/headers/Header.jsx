import { Box, IconButton } from "@mui/material";
import React from "react";
import { AppHeader } from "../../../utils/AppText";
import { useNavigate } from "react-router";
import SegmentIcon from "@mui/icons-material/Segment";
import CategoryIcon from "@mui/icons-material/Category";

function AddHeader(props) {
  const navigate = useNavigate();
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <AppHeader>
          {props.type === "add" ? `Add ${props.title}` : `All  ${props.title}`}
        </AppHeader>

        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={() => navigate(`/page/${props.navigateTo}`)}>
            {props.type === "add" ? <SegmentIcon /> : <CategoryIcon />}
          </IconButton>
        </div>
      </Box>
      <hr style={{ margin: "0px" }} />
    </>
  );
}

export default AddHeader;
