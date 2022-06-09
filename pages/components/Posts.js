import React, {useEffect, useState} from 'react'
import {db} from "../../firebase";
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';

const Posts = () => {
  const  [posts, setPosts] = useState([])
  useEffect(() => {
    const collectionRef = collection(db, "posts");
    const q = query(collectionRef, orderBy("timestamp", "desc"))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setPosts(querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id, timestamp: doc.data().timestamp.toDate().getTime()})))
    });

    return 
      unsubscribe
  },[])

  return (
    <div>{
      posts.map(post=><div key={post.id}>
        <div className='text-lg'>{post.caption}</div>
      </div>)
      }</div>)
        
}

export default Posts