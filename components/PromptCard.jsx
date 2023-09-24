'use client'

import Image from "next/image";
import { useState } from "react";
import { useSession} from "next-auth/react";
import { usePathname } from "next/navigation";


const PromptCard = ({post, handleTagClick, handleUserInfoClick, handleEdit, handleDelete}) => {
  const [copied, setCopied] = useState("");
  const {data: session} = useSession();
  const pathName = usePathname();

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(()=>(setCopied("")),3000);
  }


  return (
    <div className="prompt_card">

      {/* creator info */}
      <div className="flex gap-5 items-start justify-between">

          <div 
            className="flex justify-start items-center gap-3 cursor-pointer flex-1"
            onClick={handleUserInfoClick}>
            {/* creator-image */}
            <Image 
                src={post.creator.image}
                width={40}
                height={40}
                alt="user_image"
                className="rounded-full object-contain"
            />

            {/* creator-username, creator-email */}
            <div className="overflow-wrap-anywhere">
              <h3 className="font-satoshi font-semibold text-gray-900">
                {post.creator.username}
              </h3>
              <p className="font-inter text-sm text-gray-500">
                {post.creator.email}
              </p>
            </div>
          </div>

          {/* copy button */}
          <div className="copy_btn" onClick={handleCopy}>
              <Image 
                src={copied === "" 
                ? "/assets/icons/copy.svg"
                : "/assets/icons/tick.svg"}
                width={12}
                height={12}
                alt="copy prompt"
              />
          </div>

      </div>

      {/* creator prompt */}
      <p 
        className="my-4 font-satoshi text-sm text-gray-700">
        {post.prompt}
      </p>

      {/* creator tag */}
      <p 
        className="font-inter text-sm blue_gradient cursor_pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}>
        {post.tag}
      </p>

      {/* edit & delete button */}
      {session?.user.id === post.creator._id &&
       pathName === "/profile" && 
       (
        <div className="flex-center gap-4 border-t border-gray-100">
          <p className="green_gradient font-inter text-sm cursor-pointer"
             onClick={handleEdit}>Edit</p>
          <p className="orange_gradient font-inter text-sm cursor-pointer"
             onClick={handleDelete}>Delete</p>
        </div>
       )
      }
    </div>
  )
}

export default PromptCard;