'use client'

import { useState, useEffect } from "react"; 
import { useSession } from "next-auth/react"
import Profile from "@components/Profile"
import { useRouter, useSearchParams } from "next/navigation";


const ProfilePage = () => {
    const [posts, setPosts] = useState([]);
    const {data: session} = useSession();
    const router = useRouter();
    
    // obtain route parameters
    const searchParams = useSearchParams();
    const userId = searchParams.get("userId");
    const username = searchParams.get("username");

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${userId}/posts`);
            const data = await response.json();
            setPosts(data);
        }
    
        if (userId) fetchPosts();
    }, [])

    const handleEdit = (post) => {
      router.push(`/update-prompt?promptId=${post._id}`)
    }

    const handleDelete = async (post) => {
      // alert user to confirm delte action
      let hasConfirmed = confirm("Are you certain you want to delete this prompt?")
      if (!hasConfirmed) return;

      // make delete request
      try{
        await fetch(`/api/prompt/${post._id}`, {method:"DELETE"});

        // remove prompt from post state
        const filteredPost = posts.filter( (p) => p._id !== post._id );
        setPosts(filteredPost);

      } catch (error) {
        console.log("Failed to delete prompt.")
      }
    }

  return (
    <Profile
        name={userId == session?.user.id ? "My" : username}
        desc={userId == session?.user.id ? "Welcome to your personalized profile page" : `Welcome to ${username} personalized profile page`}
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
    />
  )
}

export default ProfilePage