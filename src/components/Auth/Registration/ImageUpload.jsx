import React, { useState } from 'react';

const ImageUpload = ({ onFileChange }) => {
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileChange(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {preview && (
        <div>
          <img
            src={preview}
            alt="Preview"
            style={{ width: '100px', height: '100px', objectFit: 'cover' }}
          />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
