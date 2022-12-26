import React, {useState} from 'react';
import Compressor from 'compressorjs';
import Back from '../Img/back.png';
import {Link} from "react-router-dom";

const ImgCompress = () => {
  const [oldImg, setOldImg] = useState(null);
  const [compressedFile, setCompressedFile] = useState(null);
  
  const handleCompressedUpload = (e) => {
    const image = e.target.files[0];
    setOldImg(image.size);
    console.log(image);
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
  
  return ( <div style={{ height: "100vh" }}>
      <h1 className='pageHeader'>Image Compress</h1>
      <Link to="/">
          <img title='Back To Home Page' className='backBtn' src={Back} />
      </Link>

      <input
        className='counterOutput imgInp'
        accept="image/*,capture=camera"
        capture="camera"
        type="file"
        onChange={(event) => handleCompressedUpload(event)}
        />

        <br/>
        <p className='counterOutput'>
          Old Image size: {oldImg}
        </p>
        <br/>
        <p className='counterOutput'>
          New Image size: {compressedFile}
        </p>
      {/* {compressedFile} */}
    </div>
  );
};

export default ImgCompress;