import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

function DropZone() {
  const [Image, setImage] = useState([]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setImage(
        acceptedFiles.map((upFile) =>
          Object.assign(upFile, {
            preview: URL.createObjectURL(upFile),
          })
        )
      );
    },
  });

  
  return (
    <div style={{marginLeft: "5px"}}>
      <div {...getRootProps()}>
        <input {...getInputProps} />
        {isDragActive ? <p>Drop the Image here..</p> : null}
      </div>
      <div>
        {Image === [] ? (
          <p>Company Logo</p>
        ) : (
          <div>
            {Image.map((upFile) => {
              return (
                <div>
                  <img
                    src={upFile.preview}
                    alt="company image"
                    style={{ width: "100px", height: "100px" }}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default DropZone;
