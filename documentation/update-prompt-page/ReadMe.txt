# The Update Prompt Page

via the route `/update-prompt` we can view the update prompt page.
this route supports a parameter specifying the prompt id of the prompt to be updated `/update-prompt?promptId=${promptId}`.
the functional component attached to this route is the "UpdatePromptPage Component"



## The UpdatePromptPage Component
this component is very similar to the CreatePromptPage Component of the `create-prompt route` in that it also renders the `Form Component`.

### Functionality
1. Obtain the parameter `promptId` specified in the route URL
```jsx
import {useSearchParams} from "next/navigation"

const UpdatePromptPage = () => {
    let params = useSearchParams();
    let promptId = params.get("promptId")
}
```

2. Obtain prompt information of the `promptId`:
unlike the createPromptPage Component, it sends a GET request to the api endpoint `/api/prompt/[promptId]` in order to get the prompt information of the prompt ID and then passes this information to the Form Component via the post prop.

```
...
const [posts, setPost] = useState({
    prompt: "",
    tag: ""
});

useEffect(() => {
    const getPromptDetails = async () => {
        const response = await fetch(`/api/prompt/${promptId}`);
        const data = await response.json();
        setPost({
            prompt: data.prompt,
            tag: data.tag
        });
    }

    if (promptId) getPromptDetails();
}, [promptId])
...
```

3. The Update functionality:
unlike the createPromptPage Component, when the submit button of the form component is clicked, the `updatePrompt function` is called. this sends a PATCH request to the api endpoint  `/api/prompt/[promptId]` which updates the prompt.
```
const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
        const response = await fetch(`/api/prompt/${promptId}`, {
            method: "PATCH",
            body: JSON.stringify({
                prompt: post.prompt,
                tag: post.tag
            })
        });

        if (response.ok) router.push("/");
    }

    catch (error) {
        console.log("Could not updata prompt");
    }

    finally {
        setSubmitting(false);
    }
} 







## The Api EndPoint "/api/prompt/[promptId]":
This EndPoint would support "GET REQUEST" & "PATCH REQUEST" for the edit functionality of a prompt and "DELETE REQUEST" for the delete functionality.

### The GET request
1. Specify the get route handler
```javascript
    export const GET = async (request, {params}) => {
        ...
    }
```


2. Connect to the mongoDB database
```javascript
...
try {
    await connectToDB();
    ...
}
...

```

3. Get the prompt document
```javascript
if {!params.promptId} 
return new Response("Prompt ID was not specified", {status: 404});

const prompt = Prompt.findById(params.promptId).populate("creator");
```

4. Return a Successful Response
```
    return new Response(JSON.stringify(prompt), {status: 200});
```

5. Return an Unsuccessful Response
```
catch {
    return new Response("failed to fetch prompt", {status:500})
}
```



### The PATCH request
1. Specify the patch route handler
```javascript
    export const PATCH = async (request, {params}) => {
        ...
    }
```

2. Obtain information in the request
```
const {prompt, tag} = await request.json();
```


3. Connect to the mongoDB database
```javascript
...
try {
    await connectToDB();
    ...
}
...
```

4. Get the Prompt document
```javascript
if {!params.promptId} 
return new Response("Prompt ID was not specified", {status: 404});

const existingPrompt = Prompt.findById(params.promptId);

if (!existingPrompt)
return new Response("Prompt Not Found", {status: 404});
```

5. Update Prompt document
```javascript
existingPrompt.prompt = prompt;
existingPrompt.tag = tag;
await existingPrompt.save();
```


- Return a Successful Response
```
    return new Response(JSON.stringify(existingPrompt), {status: 200});
```

- Return an Unsuccessful Response
```
catch {
    return new Response("Failed to update prompt", {status:500})
}
```


### The DELETE request
1. Specify the get route handler
```javascript
    export const DELETE = async (request, {params}) => {
        ...
    }
```


2. Connect to the mongoDB database
```javascript
...
try {
    await connectToDB();
    ...
}
...

```

3. Delete the prompt document
```javascript
await Prompt.findByIdAndRemove(params.promptId);
```

4. Return a Successful Response
```
    return new Response("Prompt Deleted Sucessfully", {status: 200});
```

5. Return an Unsuccessful Response
```
catch {
    return new Response("Failed to Delete prompt", {status:500})
}
```