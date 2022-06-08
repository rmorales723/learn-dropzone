import React from 'react'
import {useDropzone} from 'react-dropzone'


const Dropzone = () => {
    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
      }, [])
      const {getRootProps, getInputProps} = useDropzone({onDrop})
    
      return (
        <div {...getRootProps()}>
          <input {...getInputProps()} />
              <p>Drop the files here ...</p> :          
        </div>
      )
}

export default Dropzone;