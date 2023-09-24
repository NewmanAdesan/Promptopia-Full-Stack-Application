






Promptopia Demo
    it is an open source AI prompting tool for modern world 
    that helps you discover create and share creative prompts 

    as you're aware we're using chat GPT more and more every single day 
    so wouldn't it be great to have a list of all the phenomenal prompts t
    hat you can immediately pass on to chatgpt.

    this is what this application does, an app where you can discover and share AI powered prompts

    * Log in functionality via Next authentication & Google authentication
    * browsing of prompts
    * searching of prompts via content or hashtags
    * search for other users.
    * create, copy, edit, delete prompts



Step 1: create folder "share_prompt"



Step 2: run command "npx create-next-app@latest"
    - TypeScript? No
    - ESLint? No
    - Tailwind? Yes
    - src/? No
    - App Router? Yes


Step 3: Installing Other dependencies
    - bcrypt: to hash passwords
    - mongodb: for our database
    - mongoose: for managing out database
    - next-auth: 


Step 4: Folders & Files Structure   
    - Create a new "app/" folder.
    - Create a "components/" folder. our reusable components will lie here.
    - Create a "models/" folder. this will be for our mongodb, mongoose models
    - Create a new "public/" folder
    - Create a "styles/" folder for styles
    - Create a "utils/" folder for utility functions
    - Create an ".env" file. our environment variables where we can store secure keys

    - setup base styles
    - setup tailwind customizable classes
    - setup project assets

    - create the "page.jsx" in "app/". this will render our homepage
    - create the "layout.jsx" file in "app/".
    - create a barebone functional compoment in layout.jsx
    - import the css to our entire application
    - change the metadata of our application using static metadata. add title & description metadata
    - edit the "jsconfig.json" file change "@/*" to "@*" so that our import "@styles/globals.css" can work



Step


HOME
first, we would work on the text data in the homepage
we have a section element which comprises of an h1 tag (home-title),
a p tag (home-description), a feed component


NAVIGATION LAYOUT & STYLES 
second we work on the navigation bar component.
this will be called inside layout.jsx. just after the main element where the "children" are housed.
this component renders a nav element essentially.

the navigation comprises of a nav logo, two buttons that are links ("create-post","sign-out", "sign-in"), a profile image that is also a link to users profile setting.

for small screens, only the logo & profile image shows.
when the profile image is clicked, there is a small dropdown. in this dropdown are the "create-post" & "sign-out" buttons.
the way we implemented the responsiveness in REACT is that we had two separate div that houses the buttons for desktop & mobile then using tailwind css media querry utility class we control which should display.

since our application features a login functionality,
the buttons that shows depend on if user is loggedin or not.
if user is not loggedin, a "sign-in" button shows that logs in the user using their goggle account and when user is loggedin, the profile image becomes the image that is connected to the users goggle account (pretty cool)

how do we know if a user is loggedIN?
how do we log in users?
how do we log out users?



this are all the reusable components in the "components/" folder.
Feed.jsx - where we would show all the prompts
Form.jsx - 
Nav.jsx - 
Profile.jsx -
PromptCard.jsx -
Provider.jsx -


USER AUTHENTICATION

CREATE-PROMPT PAGE










42:00 - 47:00 (5) --> 1hour
47:00 - 51:28 (4) --> 1hour
understanding css gradient  --> 1hour + 30mins
51:28 - 54:52 (3)   --> 1hour
54:53 - 55:57 (1)   --> 1hour

55.57 - 1:11:05 (15)     --> 3hours

linear-gradient():
        - change colours alogn a line. from one edge of element to another
        - two basic factors "angle of gradient" & "pure color positions"
        - angle of gradient can be specified in "degress" 0deg, 54deg, 180deg
        - 0deg points upwards, 90deg points right, 180deg points bottom ...e.t.c
        - angle of gradient can be specified with keywords "to top" (0deg)
        - "to right" (90deg), "to bottom", "to left"
        - "to top right" - from the bottom left corner to the top right corner of the element

        - gradients are images rendered by the processor on the fly, 
        - it may take a bit of processing power for devices not up for it like small devices.
        - consider serving a separate stylesheet without gradient for mobile

        - with the right choice, gradients are a nice way to give elements subtle shading and 3D appearance

        - gradient are applied on background-image, border-image, list-style-image


Radial-gradient():
        - start at a point & spread outward in a circular or elliptical shape.
        - at minimum, it requires two color stops
        - by default, it's center is positioned at center of element

        - three basic factures govern the Radial-gradient function
        - shape/size, center-position, color
        
        - shape: with either "circle" or "ellipse" keyword
        - size: specifies area of gradient ray (x, y)
        - specified with length units, percentages or keywords (using one value spefies x & y)
        - keywords such as "closest-side", "closest-corner", "farthest-side", "farthest-corner"

        - center-position: similar syntax to the background-position property with an addition of the "at" keyword

        - radial-gradient(at right bottom, aqua, green)
        - radial-gradient(200px 50px, aqua, green)
        - radial-gradient(circle, aqua, green)
        - radial-gradient(farthest-side at right bottom, aqua, green)


Repeating Gradients:
        - repeating-linear-gradient() or repeating-radial-gradient
        - causes the pattern to repeat the color stops infinitely in both directions.
        - repeating-linear-gradient(to bottom, white, sliver 30px);
        - repeating-linear-gradient(45deg, orange, orange 12px, white 12px, white 24px);



<i class='bx bxl-github' style='color:#ffffff'></i>
<i class='bx bxl-google' style='color:#ffffff'></i>