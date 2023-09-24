'use client'

import Form from '@components/Form'
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'




const UpdatePromptPage = () => {

    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '', 
        tag: '',
    })
    const searchParams = useSearchParams();
    const promptId = searchParams.get("promptId");

    useEffect(()=>{
        const getPromptDetails = async () => {
            const response = await fetch(`/api/prompt/${promptId}`);
            const data = await response.json();
            setPost({
                prompt: data.prompt,
                tag: data.tag
            })
        }

        if (promptId) getPromptDetails();
    }, [promptId]);



    const updatePrompt = async (e)=>{
        // prevent browser default submit action
        e.preventDefault();

        // change submitting state
        setSubmitting(true);

        // connect to the native api endpoint; post user prompt
        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                body: JSON.stringify({
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
            console.log(error);
        } finally {
            setSubmitting(false);
        }

    }

  return (
    <Form 
        type="Edit"
        submitting={submitting}
        post={post}
        setPost={setPost}
        handleSubmit={updatePrompt}

    />
  )
}

export default UpdatePromptPage;