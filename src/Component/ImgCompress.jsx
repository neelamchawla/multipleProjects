import React, {useState} from 'react';
import Compressor from 'compressorjs';

const ImgCompress = () => {
  const [oldImg, setOldImg] = useState(null);
  const [compressedFile, setCompressedFile] = useState(null);
  
  const handleCompressedUpload = (e) => {
    const image = e.target.files[0];
    setOldImg(image.size);
    // console.log(image.size);
    new Compressor(image, {
      quality: 0.8, // 0.6 can also be used, but its not recommended to go below.
      success: (compressedResult) => {
        // compressedResult has the compressed file.
        // Use the compressed file to upload the images to your server.        
        setCompressedFile(compressedResult.size);
        // console.log(compressedResult.size);
      },
    });
  };
  
  return ( <>
      <input
        accept="image/*,capture=camera"
        capture="camera"
        type="file"
        onChange={(event) => handleCompressedUpload(event)}
        />

        <br/>
        Old Image size: {oldImg}
        <br/>
        New Image size: {compressedFile}
      {/* {compressedFile} */}
    </>
  );
};

export default ImgCompress;