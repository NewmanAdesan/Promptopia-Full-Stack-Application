'use client'

import Form from '@components/Form'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

/****** CHECK import { useRouter } from 'next/navigation'  ******/

const CreatePrompt = () => {

    const {data: session} = useSession();
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '', 
        tag: '',
    })

    const createPrompt = async (e)=>{
        // prevent browser default submit action
        e.preventDefault();

        // change submitting state
        setSubmitting(true);

        // connect to the native api endpoint; post user prompt
        try {
            const response = await fetch("/api/prompt/new", {
                method: 'POST',
                body: JSON.stringify({
                    userId: session?.user.id,
                    prompt: post.prompt,
                    tag: post.tag,
                })
            })

            if(response.ok) {
                // if post was succesful, redirect to homepage
                router.push("/")
            } else {
                console.log(response);
            }
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitting(false)
        }

    }

  return (
    <Form 
        type="Create"
        submitting={submitting}
        post={post}
        setPost={setPost}
        handleSubmit={createPrompt}

    />
  )
}

export default CreatePrompt