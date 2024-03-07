import React, { useState, useRef, useEffect } from 'react'
import {CiCircleRemove} from 'react-icons/ci'

const ProfilePicture = ({setFormData}) => {

  const [imageFile, setImageFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(null);

  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if(file){
      setImageFile(file);
      previewFile(file);
    }
  }

  const handleFileRemove = () => {
    setImageFile(null);
    setPreviewSource(null);
  }

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    }
  }

  useEffect(()=>{
    if(imageFile){
      previewFile(imageFile);
      setFormData((prev) => ({...prev, imageFile: imageFile}));
    }
  }, [imageFile, setFormData])

  return (
    <div className='flex items-center justify-center gap-5 p-2 rounded-lg border border-dashed -mb-3'>
      
      <div className='flex flex-col items-center'>
        <p className='text-[1.1rem]'>Add Profile Picture</p>
        <div className='flex gap-3'>

          <input
            type='file'
            ref={fileInputRef}
            className='hidden'
            accept="image/png, image/gif, image/jpeg"
            onChange={handleFileChange}
          />

          <button
            onClick={handleClick}
            className="bg-blue-500 rounded-[8px] font-medium text-white px-[12px] py-[8px] mt-2 hover:scale-[0.98] transition-all duration-150"
          >
            Select
          </button>
        </div>
      </div>

      {previewSource && 
        <div className='flex items-start'>
            <img
            src={previewSource}
            alt='selectedImage'
            className="aspect-square w-[100px] rounded-full object-cover"
          />
          <button className='text-2xl' onClick={handleFileRemove}><CiCircleRemove/></button>
        </div>
      }

    </div>
  )
}

export default ProfilePicture