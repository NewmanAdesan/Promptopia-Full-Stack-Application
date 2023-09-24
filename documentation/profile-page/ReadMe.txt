Profile page
this page shows all the prompt corresponding to a user.
the profile page route can accept two parameters `userId` & 'username` 

this signifies whose profile page to render. `/profile?userId=[userId]&username=[username]`
if this parameters are not specified, it renders the profile page of the session user.

on the UI that displays each prompt (PromptCard Component) we are going to have an Edit & Delete button





The ProfilePage Component

----- image at .\images\profilepage---profilePage-component.png -----


Overview
this is the component that corresponds to the profile page route

```
promptopia/
├── app/
│ ├── profile/
│ │ ├── page.jsx
```


```jsx
...

const ProfilePage = () => {
    return (
        ...
    )
}

export default ProfilePage;
```


Functionality

1.) the profile page route can accept parameters to signify whose profile page to render.
using the `useSearchParams` hook we obtain the values of this parameters.
```jsx
    const searchParams = useSearchParams();
    const userId = searchParams.get("userId");
    const username = searchParams.get("username");
```

1.) it uses the api endpoint `/api/users/[id]/posts` to obtains all prompts affiliate with a user and stores the prompts in a state called `post`

```jsx
const {data: session} = useSession();
const [posts, setPosts] = useState([]);

useEffect(()=>{

    const fetchPosts = async () => {
        const response = await fetch(`/api/users/${userId}/posts`);
        const data = await response.json();
        setPosts(data);
    }

    if (session?.user.id) fetchPosts();

}, [])
```

2. it specifies two functions "handleEdit" & "handleDelete which will delete & edit a post.
```jsx
const handleEdit = (post) => {
    ...
}

const handleDelete = async (post) => {
    ...
}
```

3. it renders the Profile Component. this component shows:
- the heading of the profile page
- the description of the profile page
- a list of prompts

```jsx
    <Profile
        name="My"
        desc="Welcome to your personalized profile page"
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
```





# The API Endpoint "/app/api/users/[userId]/posts"
a get request to this endpoint returns prompt information stored by a user.

---- image at ./images/apiEndpoint---app-api-users-[userId]-posts ----

1. Create the folder structure "promptopia/app/api/users/[userId]/posts"
```
promptopia/
├── app/
│ ├── api/
│ │ ├── users/
│ │ │ ├── [userId]/
│ │ │ │ │ ├── posts/
│ │ │ │  ││ ├── route.js
```



2. Create the GET route handler
```javascript
    export const GET = async (request, {params}) => {
        ...
    }

```



3. Connect to the database 
```javascript
import connectToDB from "@utils/database";

...
try {
    await connectToDB();
    ...
}
...

```


4. Querry the Prompt model for user's prompt documents
```javascript
...
    try {
        ...

        if (params.userId) {
            const prompts = await Prompt.find({creator: params.userId}).populate("creator")
        }
        else {
            return new Response("A User ID was not specified", {status: 404})
        }
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
        return new Response("Failed to fetch user's prompts", { status: 500})
    }
...
```




# The Profile Component

----- image at .\images\profilePage---profile-component -----

the functional component
```jsx
const Profile = ({name, desc, data, handleEdit, handleDelete}) => {
    return (
        <section className="w-full">
            ...
        </section>
    )
}
```

the heading text
```jsx
...

<h1 className="head-text text-left">
    <span className="blue-gradient">{name} Profile</span>
</h1>

...
```

the description text
```jsx
...

<p className="desc-text text-left">
    {desc}
</p>

...
```

the list of user prompts
```jsx
...

<div className="mt-10 prompt-layout">
    {data.map((post) => (
        <PromptCard
            key={post._id}
            post={post}
            handleEdit= {() => handleEdit && handleEdit(post)}
            handleDelete= {() => handleDelete && handleDelete(post)}
        />
    ))}
</div>

...
```


# Edit Functionality
This is simply done in one step. the user is routed to the "update-prompt" page.
in the route URL the prompt-id of the prompt to be edited is specified. ("/update-prompt?[prompt-id])

```jsx

import {useRouter} from "next/navigation";

const router = useRouter();

const handleEdit = (post) => {
    router.push(`/update-prompt?promptId=${post._id}`)
}

```
    - the update-prompt page sends a GET request to the api-endpoint "/api/prompt/[prompt-id]" to get information about the prompt with id=prompt-id
    - the page renders the form component specifying the information about the prompt.
    - when the form is submitted, a UPDATE request is sent to the api-endpoint "/api/prompt/[prompt-id]"



# Delete Functionality
This is done in three basic steps.
1. Alert user to confirm delete action
```jsx
const handleDelete = async (post) => {
      let hasConfirmed = confirm("Are you certain you want to delete this prompt?")
      if (!hasConfirmed) return;

      ...
}
```

2. Send a DELETE Request to the API Endpoint "/api/prompt/[promptId]"
```jsx
try {
    await fetch(`/api/prompt/${post._id}`, {method:"DELETE"});

    ...
}
```

3. Update the post State
```jsx
try {
    ...
    const filteredPost = posts.filter( (p) => p._id !== post._id );
    setPosts(filteredPost);
} catch (error) {
    console.log(error);
}
```
