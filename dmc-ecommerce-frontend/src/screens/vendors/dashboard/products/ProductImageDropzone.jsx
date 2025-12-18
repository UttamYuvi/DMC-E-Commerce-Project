import { Avatar, Grid } from "@mui/material";
import Dropzone from "react-dropzone";

function ProductImageDropzone({
  images,
  previews,
  setImages,
  setPreviews,
  onImageSelect,
}) {
  const maxFiles = import.meta.env.VITE_PRODUCT_IMAGE_MAX_FILES_COUNT;
  const maxFileSizeMB = import.meta.env.VITE_PRODUCT_IMAGE_MAX_FILE_SIZE_MB;
  const MAX_FILE_SIZE_BYTES = maxFileSizeMB * 1024 * 1024;

  return (
    <>
      <Grid size={12}>
        <Dropzone
          accept={{ "image/*": [] }}
          multiple
          onDrop={(acceptedFiles) => {
            const availableSlots = maxFiles - images.length;

            if (availableSlots <= 0) {
              alert(`You can upload only ${maxFiles} images`);
              return;
            }

            // size validation
            const validFiles = acceptedFiles.filter(
              (file) => file.size <= MAX_FILE_SIZE_BYTES
            );

            if (validFiles.length !== acceptedFiles.length) {
              alert(`Each file must be less than ${maxFileSizeMB} MB`);
            }

            // limit count
            const filesToAdd = validFiles.slice(0, availableSlots);

            // remove duplicates
            const newFiles = filesToAdd.filter(
              (file) => !images.some((img) => img.name === file.name)
            );

            setImages((prev) => [...prev, ...newFiles]);
            setPreviews((prev) => [
              ...prev,
              ...newFiles.map((file) => URL.createObjectURL(file)),
            ]);
            onImageSelect?.();
          }}
        >
          {({ getRootProps, getInputProps }) => (
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
                Drag & drop images or click to upload (max {maxFiles} images,{" "}
                {maxFileSizeMB}MB each)
              </p>
            </div>
          )}
        </Dropzone>
      </Grid>

      <Grid size={12} display="flex" gap={2} mt={2}>
        {previews.map((src, index) => (
          <Avatar
            key={index}
            variant="rounded"
            src={src}
            sx={{ width: 80, height: 80, borderRadius: 2 }}
          />
        ))}
      </Grid>
    </>
  );
}

export default ProductImageDropzone;
