

# The Feed Component

## What it does

The Feed Component is responsible for creating the UI to view prompts from multiple users. It incorporates a search functionality that enables users to find prompts via tags or creator's usernames or creators's prompt content.

## What it renders

The component renders a `section` element that encapsulates two main elements:

1. **Search Input:**
   ```jsx
   <input
       type="text"
       placeholder="Search for a tag or username"
       value={searchText}
       onChange={handleSearchChange}
       className="search_input peer"
       required
   />
   ```

   - The searchText state tracks the input text in the search field.
   - The handleSearchChange function manages the search functionality.

2. **PromptCardList Component**
    this component renders the UI that would display prompts stored in the application.
    the UI is displayed via a PromptCard component

    ```jsx
        <PromptCardList
            data={promptList}
            handleTagClick={handleTagClick}
            handleUserInfoClick={handleUserInfoClick}
        />
    ```

    - the promptList state is an array that stores all prompts to display;
    - the handleTagClick function get called when the tag of a prompt is clicked


## What it Has
- a searchText state
to keep track of the state of the search input element

- a handleSearchChange function 
that deals with the prompt searching functionality

- a handleTagClick function
the PromptCard Component displays the tags associated with a prompt. this function is called when a tag is clicked.

- a handleUserInfoClick function
the PromptCard Component displays information about the creator of the prompt. when this information is clicked, it re-route user to the profile page of the user

- a allPrompts state
this stores all the prompts in the application.
once the feed component is rendered,
a get request is made to "/api/prompt" to obtain all prompts
```jsx
    useEffect(()=>{
        const fetchPrompts = async () => {
        const response = await fetch("/api/prompt");
        const data = await response.json;
        setAllPrompts(data);
        }

        fetchPrompts();
    }, [])
```

- a promptList state
when a search is made, the array in the allPrompts state is filtered to obtain prompts that corresponds to the search result.
the filtered prompts are stored in the promptList state. 
the prompts in this state would be rendered.




<br><br><br>



# The API Endpoint "/api/prompt":
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


4. Querry the Prompt model for all prompt document
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


<br><br><br>


# The PromptCardList Component:

    ```jsx
        <PromptCardList
            data={promptList}
            handleTagClick={handleTagClick}
            handleUserInfoClick={handleUserInfoClick}
        />
    ```

this component is given a list of prompt information(creator, prompt, tag),
and for each, it renders a PromptCard Component UI.
```jsx
    <PromptCard
        key={prompt._id}
        post={prompt}
        handleTagClick={handleTagClick} 
        handleUserInfoClick={handleUserInfoClick}
    />
```

this component is also given two callback function `handleTagClick` & `handleUserInfoClick`<br>

it would pass this functions as a props to each PromptCard UI it renders
PromptCard will call the handleTagClick function when the tag of a card is clicked.
PromptCard will call the handleUserInfoClick function & when the info of the user is clicked.

```jsx
    const PromptListCard = ({data, handleTagClick}) => {
        return (
        <div className="grid prompt_layout">
            {data.map((prompt)=>(
            <PromptCard 
                tag={prompt._id}
                post={post}
                handleTagClick={handleTagClick}/>
            ))}
        </div>
        )
    }
```


<br><br><br>


# The PromptCard Component:


# The HandleSearchChange Functionality
the allposts state keeps track of all the posts in the application
the searchPosts state keeps track of all the posts that corresponds to users search results

when there is no search value, the feed component renders all the posts in the application.
when there is a search value, allposts state is filtered to contained posts that are related to the search value either by tagname, username or prompt content.


# The HandleTagClick Functionality


# The HandleUserInfoClick Functionality

