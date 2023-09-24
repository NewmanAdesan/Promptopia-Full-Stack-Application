import Link from "next/link"

const Form = ({ type, submitting, post, setPost, handleSubmit}) => {
  console.log(post.prompt, post.tag);
  return (
    <section className='w-full max-w-full flex-start flex-col'>

      {/*** Heading Text ***/}
      <h1 className='head_text text-left'>
        <span className="blue_gradient">{type} Post</span>
      </h1>


      {/*** Description Text ***/}
      <p className="desc text-left max-w-md">
        {type} and share amazing prompts with the world, and let your imagination run wild with any AI-powered platform.
      </p>


      {/*** Form ***/}
      <form 
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        
        {/* prompt input */}
      <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">Your AI Prompt</span>
          <textarea
            placeholder="Write your prompt here..."
            value={post.prompt}
            onChange={(e) => setPost({ 
              ...post,
              prompt: e.target.value
            })}
            className="form_textarea"
            required
          />  
      </label>
        
        {/* tag input */}
      <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag {' '}
            <span className="font-normal">(#product, #webdevelopment, #idea)</span>
          </span>
          <input
            placeholder="#tag"
            value={post.tag}
            onChange={(e) => setPost({ 
              ...post,
              tag: e.target.value
            })}
            className="form_input"
            required
          />  
      </label>
        
        {/* form actions */}
        <div className="flex-end gap-4 mx-3 mb-5">

          {/* cancel action */}
          <Link href="/" className="text-sm text-gray-500">
            Cancel
          </Link>

          {/* submit action */}
          <button
              type="submit"
              disabled={submitting}
              className="text-sm text-white px-5 py-1.5 bg-primary-orange rounded-full"
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  )
} 

export default Form