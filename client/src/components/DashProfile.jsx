import { Button, TextInput } from 'flowbite-react';
import { useEffect, useRef } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import {getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import {app} from '../firebase'

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const [image, setImage] = useState(null);
  const [imageFile,setImageFile] = useState(null);
  const [imageFileUppload,setImageFileUpload] = useState(null)
  const fileref = useRef()
  const handleImageChange = (e)=>{
    const file = e.target.files[0];
    if(file){
      setImageFile(file);}
      setImage(URL.createObjectURL(file));
  }
  useEffect(()=>{
    if(image){
      uploadImage();
    }
  },[image])
  const uploadImage = async ()=>{
    console.log('uploading .....');
    const storage = getStorage(app)
    const fileName = new Date().getTime()+ image.name;
    const storageRef= ref(storage, fileName);
    const uploadTask  = uploadBytesResumable(storageRef,image)
    uploadTask.on("state_changed",(snapshot)=> {
      const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
    })
  }
  console.log(image,imageFile);
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <input type="file" accept='image/*' onChange={handleImageChange} ref={fileref} hidden/>
        <div className='w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full' onClick={()=>{
          fileref.current.click()
        }}>
          <img
            src={imageFile || currentUser.profilePicture}
            alt='user'
            className='rounded-full w-full h-full object-cover border-8 border-[lightgray]'
          />
        </div>
        <TextInput
          type='text'
          id='username'
          placeholder='username'
          defaultValue={currentUser.username}
        />
        <TextInput
          type='email'
          id='email'
          placeholder='email'
          defaultValue={currentUser.email}
        />
        <TextInput type='password' id='password' placeholder='password' />
        <Button type='submit' gradientDuoTone='purpleToBlue' outline>
            Update
        </Button>
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span className='cursor-pointer'>Delete Account</span>
        <span className='cursor-pointer'>Sign Out</span>
      </div>
    </div>
  );
}