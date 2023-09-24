

The CreatePrompt Component:
    this is the component associated with the frontend route `/create-prompt` 
    
    WHAT IT DOES:
        - It Renders a Form Component which obtains prompt data from the user and passes it up to the CreatePrompt Component via the `post state`.
        - It defines the `createPrompt function` which sends the user prompt information to a native API endpoint `api/prompt/new` via a POST REQUEST. this endpoint adds the prompt information as a record in the PROMPT table in the database. it passes this function down to the Form Component so it is called when the form is submitted.

    
    WHAT IT RETURNS
            <Form
                type="Create"
                post={post}
                setPost={setPost}
                handleSubmit={createPrompt}
                submitting={submitting}
            />

        - the post & setPost props corresponds to a state that store users prompt-text & prompt-tag
        - const [post, setPost] = useState({prompt-text: "", prompt-tag: ""})

        - the handleSubmit props holds the function that would be called when the form element in the Form Component is submitted.
        - it refers to the createPrompt function that adds user prompt information to the database

        - the submitting props; the createPrompt is an asynchronous function. once it has been called, we want to inform Form Component that a submission is going on. so that the form element submit button will be disabled to avoid further submission AND a loading icon can be exhibited.

    

    WHAT IT HAS
        - the submitting state
            const [submitting, setSubmitting] = useState(false);

        - the post state
            const [post, setPost] = useState({
                    prompt: "", 
                    tag: ""
            })

        - the createPrompt function
            const createPrompt = async (e) {
                e.preventDefault();
                setSubmitting(true);
      
                try {
                    const response = await fetch('/api/prompt/new', {
                        method: 'POST',
                        body: JSON.Stringify({
                            userId: session?.user.id,
                            post.prompt,
                            post.tag
                        })
                    })

                    if (response.ok) {
                        router.push('/');
                    }
                } catch (error) {
                    console.log(error)
                } finally {
                    setSubmitting(false)
                }
            }






The Form Component:

############ IMAGE OF HOW IT LOOKS ###############

WHAT IT DOES
This component is the UI user interacts with to enter prompt information. user enters prompt into an input field as well as the hash-tags that correspond to the prompt, user can then submit the infomation OR "cancel" to go back to the homepage


WHAT IT RETURNS
1. Section Element.
2. Heading (`H1`) Element displaying the type of operation (in this case, "Create Post").
3. Description paragraph Element explaining the purpose of the prompt.
4. Form Element with the following attributes:
   - `onSubmit`: Calls the `createPrompt` function when the form is submitted.
   - Styling classes for layout and appearance.
5. Input fields within the form:
   - Textarea for the prompt content.
   - Input field for the tag.
6. Div Element for the Buttons section:
   - Cancel link for navigating back.
   - Submit button for posting the prompt.

Form Component Button Section
<div className="...">
    <Link href="/" className="...">
        Cancel
    <Link>

    <button
        type="submit"
        disabled={submitting}
        className="..."
    >
        {submitting ? `${type}...` : type}
    </button>
<div>


Form Component Element for prompt-content
<textarea
    value={post.prompt}
    onChange={(e) => setPost({
        ...post, 
        prompt: e.target.value}
    )}
    placeholder="Write your prompt here..."
    className="..."
    required
/>


Form Component Element for prompt-tag
<input
    value={post.tag}
    onChange={(e) => setPost({
        ...post, 
        tag: e.target.value}
    )}
    placeholder="#tag"
    className="..."
    required
/>







The Prompt Model/Schema:
This Model created in our mongoDB database, will store every single prompt information of a user. keeping track of the user that created the prompt via its id in the User Schema.


############ IMAGE OF HOW IT LOOKS ###############


first, we would create the folder structure "promptopia/models/Prompt.js
next use mongoose to create a Schema with three fields "creator", "prompt" & "tag". creator references the id of the user from the User Schema.
    const PromptSchema = new Schema({
        creator: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },

        prompt: {
            type: String,
            required: [true, 'Prompt is required'],
        },

        tag: {
            type: String,
            required: [true, 'Tag is required']
        }
    });

next we convert our Schema into a Model called "Prompt" & export it
    const Prompt = models.Prompt || model('Prompt', PromptSchema);
    export default Prompt;

This is how we create a table in mongoDB




The Api Endpoint ("/api/prompt/new") :
This Endpoint obtains a post request to store user prompt information in the database. in the database is a table/schema/model called "Prompt". This is where user prompt information will be stored.

############ IMAGE OF HOW IT LOOKS ###############

first, we would create the folder structure "promptopia/app/api/prompt/new/route.js
next we create a route handler for post request
    export const POST = async (req) => {
        ...
    }
next we extract the properties "userId", "prompt", "tag" from the body of the post request
    const { userId, prompt, tag }  = await req.json();

next we connect to our mongoDB database via the `connectToDB` function we created earlier.
    await connectToDB();

next we create a record for the user prompt in the Prompt Schema in our database
    const newPrompt = new Prompt({
        creator: userId,
        prompt,
        tag
    })

    await newPrompt.save();


next we return a Response Object, containing the data in the record as an object.
    return new Response(JSON.stringify(newPrompt), {status: 201})

next in the case of an error, we return a Response Object, that flags an error.
    return new Response("Failed to Create A New Prompt", { status: 500})



QUESTIONS:
    - 



