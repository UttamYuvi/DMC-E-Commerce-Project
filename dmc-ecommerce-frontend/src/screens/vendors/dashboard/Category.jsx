import { TextField, Paper, Box, Grid } from "@mui/material";
import SegmentIcon from "@mui/icons-material/Segment";
import { IconButton } from "@mui/material";

function Category() {
  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        height: "100%",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={2}
        style={{ width: "60%", height: "fit-content", padding: "16px" }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid size={6}>
              <div>Category</div>
            </Grid>
            <Grid size={6} style={{ display: "flex", justifyContent: "right" }}>
              <div>
                <IconButton variant={"outlined"}>
                  <SegmentIcon />
                </IconButton>
              </div>
            </Grid>
            <Grid size={6}>
              <TextField
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid size={6}>
              <TextField
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid size={6}>
              <TextField
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid size={6}>
              <TextField
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
                fullWidth
              />
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
}

export default Category;
