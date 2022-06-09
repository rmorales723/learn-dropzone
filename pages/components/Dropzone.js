import React, {useCallback, useRef, useState, useMemo} from 'react'
import {useDropzone} from 'react-dropzone'
import {db, storage} from '../../firebase'
import {addDoc, arrayUnion, collection, serverTimestamp, updateDoc, doc} from 'firebase/firestore'
import {ref, getDownloadURL, uploadBytes} from "@firebase/storage";

const Dropzone = () => {
    const [selectedImages, setSelectedImages] = useState([])
    const captionRef = useRef(null)
    const baseStyle = {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        borderWidth: 2,
        borderRadius: 2,
        borderColor: '#eeeeee',
        borderStyle: 'dashed',
        backgroundColor: '#fafafa',
        color: '#bdbdbd',
        outline: 'none',
        transition: 'border .24s ease-in-out'
      };
      
      const focusedStyle = {
        borderColor: '#2196f3'
      };
      
      const acceptStyle = {
        borderColor: '#00e676'
      };
      
      const rejectStyle = {
        borderColor: '#ff1744'
      };
      
    const uploadPost = async()=>{
        const docRef = await addDoc(collection(db,"posts"),{
            caption:captionRef.current.value,
            timestamp:serverTimestamp()
        })
        await Promise.all(
            selectedImages.map(image=>{
                const imageRef = ref(storage, `posts/${docRef.id}/${image.path}`);
                uploadBytes(imageRef, image,"data_url").then(async()=>{
                    const downloadURL = await getDownloadURL(imageRef)
                    await updateDoc(doc(db,"posts",docRef.id),{
                        images:arrayUnion(downloadURL)
                    })
                })
            })
        )
        captionRef.current.value=''
        setSelectedImages([])
    }
    const onDrop = useCallback(acceptedFiles => {
        setSelectedImages(acceptedFiles.map(file=>
            Object.assign(file,{
                preview:URL.createObjectURL(file)
            })
            ))
      }, [])
      const {getRootProps, getInputProps, isFocused,
        isDragAccept,
        isDragReject} = useDropzone({onDrop, accept: 'image/*'})
        const style = useMemo(() => ({
            ...baseStyle,
            ...(isFocused ? focusedStyle : {}),
            ...(isDragAccept ? acceptStyle : {}),
            ...(isDragReject ? rejectStyle : {})
          }), [
            isFocused,
            isDragAccept,
            isDragReject
          ]);
      const selected_images = selectedImages?.map(file=>(
          <div>
              <img src={file.preview} style={{width:"200px"}} alt="" />
          </div>
      ))
      return (
          <div>
        <div {...getRootProps({style})}>
          <input {...getInputProps()} />
              <p>Drop the files here ...</p>           
        </div>
        <input ref={captionRef} type= "text" placeholder='Enter a caption' />
        <button onClick={uploadPost}>post</button>
        {selected_images}
        </div>
      )
}

export default Dropzone;