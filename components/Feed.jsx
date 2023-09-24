"use client"


import { useState, useEffect } from "react"
import PromptCard from "./PromptCard"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"


const PromptListCard = ({data, handleTagClick, handleUserInfoClick}) => {
    return (
      <div className="prompt_layout">
        {data.map((post)=>(
          <PromptCard 
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
            handleUserInfoClick={() => handleUserInfoClick && handleUserInfoClick(post)}/>
        ))}
      </div>
    )
}

const Feed = () => {  
  const [searchText, setSearchText] = useState("");
  const [allPrompt, setAllPrompt] = useState([]);
  const [promptList, setPromptList] = useState([]);
  const [timeoutID, setTimeoutID] = useState(0);
  const router = useRouter();

  useEffect(()=>{
    const fetchPrompts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setAllPrompt(data);
      setPromptList(data);
    }

    fetchPrompts();
  }, [])

  const filterPrompts = (value) => {
    let searchRegex = new RegExp(value);
    let newList = allPrompt.filter((data) => searchRegex.test(data.prompt) || searchRegex.test(data.tag) || searchRegex.test(data.creator.username));
    setPromptList(newList);
  }

  const handleSearchChange = (e) => {
    // clear the timeout
    clearTimeout(timeoutID);

    if (!e.target.value) setPromptList(allPrompt);

    // set the search text state
    setSearchText(e.target.value);

    // set another timeout that filters allPrompt according to the search text
    setTimeoutID(setTimeout(filterPrompts(e.target.value), 500));

  }


  const handleTagClick = (tag) => {
    setSearchText(tag);
    filterPrompts(tag);
  }

  const handleUserInfoClick = (post) => {
    router.push(`/profile?userId=${post.creator._id}&username=${post.creator.username}`);
  }


  return (
    <section className='feed'>

      {/* search input */}
      <form className='w-full relative flex-center'>
        <input 
            type="text"
            placeholder="Search for a tag or username"
            value={searchText}
            onChange={handleSearchChange}
            className="search_input peer"
            required
        />
      </form>


      {/* search results */}
      <PromptListCard 
        data={promptList}
        handleTagClick={handleTagClick}
        handleUserInfoClick={handleUserInfoClick}
      />
    </section>
  )
}

export default Feed