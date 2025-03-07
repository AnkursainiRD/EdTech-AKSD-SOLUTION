import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import IconButton from '../../../common/IconButton'
import {FiUpload} from "react-icons/fi"
import { updateDisplayPicture } from '../../../../services/operations/settingsApi'

function ChangeProfile() {
    const {user}=useSelector((state)=>state.profile)
    const {token}=useSelector((state)=>state.auth)
    const [loading,setLoading]=useState(false)
    const [imageFile,setImageFile]=useState(null)
    const [previewSource,setPreviewSource]=useState(null)
    const dispatch=useDispatch()
    const fileInputRef=useRef(null)

    function handleClick(){
        fileInputRef.current.click()
    }
    
    function handleFileChange(e){
        const file=e.target.files[0];
        if(file){
            setImageFile(file)
            previewFile(file)
        }
    }

    function previewFile(file){
        const reader=new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend=()=>{
            setPreviewSource(reader.result)
        }
    }

    function handleFileUpload(){
        try {
            setLoading(true)
            const formData=new FormData()
            formData.append('displayPicture',imageFile)
            dispatch(updateDisplayPicture(token,formData)).then(()=>setLoading(false))
        } catch (error) {
            
        }
    }

    useEffect(()=>{
        if(imageFile){
            previewFile(imageFile)
        }
    },[imageFile])
  return (
    <div className='flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 text-richblack-5'>
        <div className='flex text-richblack-5 items-center gap-x-4'>
            <img src={previewSource || user?.image} alt={`profile-${user?.firstName}`} className='aspect-square rounded-full w-[78px] object-cover'/>
            <div className='space-y-2'>
                <p>Change Profile Picture</p>
                <div className='flex items-center gap-3'>
                    <input type="file"
                    className='hidden'
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept='image/png, image/jpg, image/webp' />

                    <button
                    onClick={handleClick}
                    onChange={handleFileChange}
                    className='cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50'
                    >Select
                    </button>    

                   <div>
                     <IconButton
                        text={loading?("Uploading..."):("Upload")}
                        onClick={handleFileUpload}
                    >
                        {!loading && (<FiUpload className='text-lg text-richblack-900' />)}
                    </IconButton>
                     </div>
                   </div>
            </div>
        </div>
    </div>
  )
}

export default ChangeProfile