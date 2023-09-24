

The Feed Component:

WHAT IT DOES
    this component set up the UI to view prompts by several users. it enables a search functionality to search for prompts via prompt-tag or creators-username.


WHAT IT RETURNS
    it returns a section element which encapsulate two element:
        - an input element for the search functionality
            <input 
                type="text"
                placeholder="Search for a tag or username"
                value={searchText}
                onChange={handleSearchChange}
                className="search_input peer"
                required
            />
        the searchText state keeps track of the inputted text
        the handleSearchChange function takes care of the search functionality

        - a PromptCardList Component to render prompts in the application
            <PromptCardList
                data={promptList}
                handleTagClick={handleTagClick}
            />
        the promptList state is an array that stores all prompts in the application
        the handleTagClick function get called when the tag of a prompt is clicked


WHAT IT HAS
- a searchText state
to keep track of the state of the search input element

- a handleSearchChange function 
that deals with the prompt searching functionality

- a promptList state 
to keep track of all the prompt that would be shown.
once the feed component is rendered,
a get request os made to "/api/prompt"
this endpoint send data of all prompts in the application.
this data is stored in the promptList state.

    useEffect(()=>{
        const fetchPrompts = async () => {
        const response = await fetch("/api/prompt");
        const list = await response.json;
        setPromptList(list);
        }

        fetchPrompts();
    }, [])





The API Endpoint "/api/prompt":
when a get request is made to this endpoint, it gets all the prompt document in the Prompt model and returns it in a array.

Workflow
- Create the folder structure
- Create the GET route handler
- Connect to the database
- Querry the prompt model for all prompt document
- Return a Successful response
- Return an Unsuccessful response
1. Create the folder structure "promptopia/app/api/prompt/route.js"
```
promptopia/
├── app/
│ ├── api/
│ │ ├── prompt/
│ │ │ ├── route.js
```



2. Create the GET route handler
```javascript
    export const GET = async (request) => {
        ...
    }

```



3. Connect to the database
```javascript
...
try {
    await connectToDB();
    ...
}
...

```


4. Querry the prompt model for all prompt document
```javascript
...
    try {
        ...

        // obtain all prompt document. 
        // replace the creator reference field with the actual referenced data
        const prompts = await Prompt.find({}).populate("creator")

        ...
    }
...
```


5. Return a Successful response
```javascript
...
    try {
        ...
        return new Response(JSON.stringify(prompts), {status: 200})
    }
...
```


6. Return an Unsuccessful response

```javascript
...
    catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500})
    }
...
```


The  PromptCardList Component:
this component is give a list of prompt information(creator, prompt, tag),
and for each, it renders a PromptCard Component UI.
```javascript
    <PromptCard
        key={prompt._id}
        prompt={prompt}
        handleTagClick={handleTagClick}
```

this component is also given a callback function "handleTagClick"
it would pass this function as a props to each PromptCard UI it renders
PromptCard will call this function when the tag of a card is clicked.

    const PromptListCard = ({data, handleTagClick}) => {

        return (
        <div className="grid prompt_layout">
            {data.map((prompt)=>(
            <PromptCard 
                tag={prompt._id}
                prompt={prompt}
                handleTagClick={handleTagClick}/>
            ))}
        </div>
        )
    }





The PromptCard Component:
This is a component that displays a prompt. 
it shows the creator's information, creator's prompt & tags.
it also shows a copy icon that can be clicked to copy the prompt to clickboard.
if this card is rendered in the profile page, it shows an edit & delete button

### image of the component ###



```jsx
    const PromptCard = ({prompt, handleTagClick, handleEdit, handleDelete}) => {
        return (
            <div className="prompt_card"
                ...
            </div>
        )
    }
```




the copy functionality
when the copy icon is clicked, the prompt is copied to the clipboard 
and for 3 seconds a tick icon is showed instead of the copy icon.
this is implemented using a state "copied"

```
  const [copied, setCopied] = useState("");
```

```
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

```

```
  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(()=>(setCopied("")),3000);
  }
```


the handleEdit & handleDelete Buttons
if the currently logged in user is the creator of that post AND
if they are currently on the profile page,
then we would show the edit and delete buttons in the prompt card.
onclick of this buttons would called the handleEdit & handleDelete callback functions

import {useSession} from "next-auth/react"
import {usePathname} from "next/navigation"

const pathName = usePathname();
const {data: session} = useSession();

{session?.user.id === post.creator._id 
&& pathName === "/profile" 
&& (
    <div className="flex-center gap-4 mt-5 border-t border-gray-100 pt-3">
        <p className="font-inter text-sm green_gradient cursor-pointer" onClick={()=>handleEdit(post)}>Edit</p>
        <p className="font-inter text-sm orange_gradient cursor-pointer" onClick={()=>handleDelete(post)}>Delete</p>
    </div>
)}





# The HandleSearchChange Functionality
all the prompts in the array of the allPosts state is going to be looped through.
if the search text can be found in the prompt creator's username OR prompt's tag OR prompt's text, 
that prompt will be kept in the `promptList state`.


use the search text to create a regex pattern,
test if pattern can be found in the prompt creator's username OR prompt's tag OR prompt's text.


```jsx 
const [searchText, setSearchText] = useState("");
const [searchTimeout, setSearchTimeout] = useState(null);
const [searchList, setSearchList] = useState([]);
```

```jsx
const filteredPrompt = () => {
    const searchPattern = new Regex(searchText);
    const filteredList = allPosts.filter(p => searchPattern.test(p.prompt) || searchPattern.test(p.tag) || searchPattern.test(p.creator.username))
    setPromptList(filtered List)
}
```

```jsx
handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);
    setSearchTimeout(()=>filteredPrompt(), 500);
}
```

# The HandleTagClick Functionality


# The HandleUserInfoClick Functionality