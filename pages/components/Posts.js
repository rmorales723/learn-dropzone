import React, {useEffect, useState} from 'react'
import {db} from "../../firebase";
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import Image from 'next/image';
import moment from 'moment';

const Posts = () => {
  const  [posts, setPosts] = useState([])
  const postImages = (post)=>{
    const post_images = post.images?.map(file=>(
      <div className='relative w-full h-96'>
        <Image src={file} layout="fill" objectFit='cover'/>
        </div>
    ))
    return post_images
  }
  useEffect(() => {
    const collectionRef = collection(db, "posts");
    const q = query(collectionRef, orderBy("timestamp", "desc"))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setPosts(querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id, timestamp: doc.data().timestamp?.toDate().getTime()})))
    });

    return 
      unsubscribe
  },[])

  return (
    <div>{
      posts.map(post=><div key={post.id}
        className=' bg-white rounded-lg shadow-xl p-8 w-1/2 m-auto mb-4'

      >
        
        <div className='text-lg'>{post.caption}</div>
        <div className="flex space-x-3">
          {postImages(post)}
          </div>
          <p className="mt-5 text-right text-gray-400">{moment(post.timestamp).fromNow()}</p>
      </div>)
      }
      </div>
      
      )
    }

export default Posts