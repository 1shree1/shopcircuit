import React, { useEffect, useState } from 'react'
import Admin from './Admin'
import { delpost, postlists } from './Axios'
import { useNavigate } from 'react-router-dom'
export default function Postlists() {
    const [posts, setPosts] = useState([])
    const navigate = useNavigate()
    useEffect(()=>{
        const fetchPosts = async()=>{
            const fetch = await postlists()
            setPosts(fetch)
        }
        fetchPosts()
    },[])
    const getRelativeTime = (dateString) => {
        const postDate = new Date(dateString);
        const currentDate = new Date();
        const diffInMs = currentDate - postDate;
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
        if (diffInDays < 7) {
          return `${diffInDays} day${diffInDays !== 1 ? "s" : ""} ago`;
        } else {
          const diffInWeeks = Math.floor(diffInDays / 7);
          return `${diffInWeeks} week${diffInWeeks !== 1 ? "s" : ""} ago`;
        }
      };
    const handleDelete = (async(id)=>{
      await delpost(id)
      window.location.reload()
    })
  return (
    <>
    <Admin/>
    <h1 style={{textAlign:"center", position:"absolute", top:"20%", margin:"0 40%"}}>Posts by Users</h1>
    <div className='posts'>
    {posts.slice().reverse().map((post, idx) => (
          <div className="indpost" key={idx}>
            {post.image && <img src={post.image} alt={post.productName} className="post-image" />}
            <h3>Product Name: {post.productName}</h3>
            <p>Category: {post.category}</p>
            <p>Location: {post.location}</p>
            <p>Date: {getRelativeTime(post.date)}</p>
            <button className="remove-btn" onClick={()=>handleDelete(post._id)}>
              Remove
            </button>
          </div>
        ))}
    </div>
    </>
  )
}
