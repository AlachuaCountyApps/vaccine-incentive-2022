import { Button, Grid, LinearProgress, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { Box } from "@mui/system";

const createThumbnail = (file) => {
  const url = URL.createObjectURL(file);
  return url;
};

export default function FileDisplay({
  file,
  index,
  removeFile,
  fileUploadStarted,
}) {
  const [progress, setProgress] = useState(50);

  return (
    <Grid container sx={{ mb: "1.5rem", ml: "1rem" }} key={index}>
      <Grid item xs={12}>
        <img src={createThumbnail(file)} width='25%' alt={file.name} />

        {!fileUploadStarted ? (
          <span
            style={{
              top: "40%",
              width: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box sx={{ width: "100%", mr: 1 }}>
              <LinearProgress variant='determinate' value={progress} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
              <Typography variant='body2' color='text.secondary'>{`${Math.round(
                progress
              )}%`}</Typography>
            </Box>
          </span>
        ) : (
          <span style={{ float: "right", position: "relative", top: "40%" }}>
            <Button
              size='large'
              title='remove'
              onClick={() => removeFile(file.lastModified)}
            >
              <DeleteIcon color='error' fontSize='large' />
            </Button>
          </span>
        )}
      </Grid>
    </Grid>
  );
}
