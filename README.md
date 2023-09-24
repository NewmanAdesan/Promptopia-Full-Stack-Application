

# The Home Page Setup

## layout & styles

We start by setting up the home page and creating the navigation bar for our website. The home component is wrapped in an HTML5 semantic `<section>` tag with Tailwind CSS classes for styling. The navigation bar contains links, buttons, and icons.

### Home Component

- The main content of the home page is wrapped in a `<section>` tag with Tailwind CSS classes for layout and styling.
- The heading text "Discover and Share" is styled using the `head_text` class from the `globals.css` stylesheet.
- A `<span>` element is used to display the tagline "AI powered prompts."
- The body text "Primetopia is an open source AI prompting tool..." is styled using the `desc` class from `globals.css`.

### Navigation Bar (Desktop)

- The navigation bar is created as a horizontal layout with links and buttons.
- The Primetopia logo and site name are displayed using the `Image` component from Next.js with a source of `assets/images/logo.svg`.
- Links for creating prompts and viewing the user profile are included.
- For authentication, Google Sign-In button is provided (will be implemented using NextAuth).

### Navigation Bar (Mobile)

- On smaller devices, the navigation bar collapses into a mobile-friendly version.
- The profile icon is displayed using the same logo image for now.
- Clicking the icon opens a dropdown menu with links for user profile, creating prompts, and signing out.

### Layout and Provider Component

- The `Layout` component is used to wrap the entire website content.
- The `Provider` component from NextAuth is used for user authentication.
- This ensures authentication functionality is available across the entire app.




## user authetication & database integration
This documentation provides a summary of the tutorial transcript that covers the process of building a web application with Google OAuth authentication, MongoDB database integration, user models, and sign-in functionality.

### Setting Up Google OAuth
1. Create a project on the Google Cloud Platform.
2. Enable the Google+ API for the project.
3. Create OAuth 2.0 credentials for a web application.
4. Configure OAuth consent screen settings, including app name, email, authorized domains, logo, and developer email.
5. Generate OAuth client ID and client secret, storing them in the `.env` file.
6. Implement environmental variable retrieval in the code using `process.env`.

### Connecting to MongoDB Database
1. Create a `database.js` file in the `utils` directory.
2. Import Mongoose and set up options to handle connections.
3. Define an `isConnected` variable to track connection status.
4. Export an asynchronous `connectToDB` function that establishes the database connection.
5. Use the MongoDB Atlas service to create a new cluster.
6. Obtain the MongoDB URI and update the `.env` file.
7. Import the `connectToDB` function in the main route file.
8. Ensure the connection is established before proceeding.

### Database Connection
1. Establish a connection to the MongoDB Atlas database using Mongoose.
2. Define a user schema with fields like email, username, and image.

### User Session and Profile Handling
1. Create an asynchronous function to retrieve the user's session based on their email.
2. Update the user's session with their ID to track the current user.

### MongoDB Atlas Setup
1. Create a MongoDB Atlas cluster via the MongoDB website.
2. Configure database access by setting up network access and a user password.
3. Retrieve the MongoDB URI and save it as an environment variable in `.env`.

### Creating User Models
1. Create a `user.js` file in the `models` directory.
2. Import Mongoose functions for schema creation.
3. Define a user schema with fields like email, username, and image.
4. Set validation rules for email uniqueness, required fields, and username format.
5. Utilize a registered model if available, else create a new one.

### Implementing Sign-In Functionality
1. Import the user model in the main route file.
2. Implement the `signIn` function using a try-catch block.
3. Use `user.findOne` to check if a user with the provided email already exists.
4. If the user does not exist, create a new user using `user.create`.
5. Extract user data from the Google OAuth profile, including email, username, and image.
6. Handle errors during sign-in and user creation.

### Updating User Session
1. To maintain an active user session, create a `sessionUser` variable.
2. Retrieve user data based on the email stored in the session.
3. Update the user's ID in the session to associate the user with their session.
4. Return the updated session object.

### Configuring Callback URLs and Secrets
1. Configure callback URLs for OAuth providers by adding URIs to the authorized redirect URIs in the Google Cloud console.
2. Create an appropriate `next-auth.local.js` configuration file to specify environment variables such as `NEXTAUTH_URL`, `NEXTAUTH_URL_INTERNAL`, and `NEXTAUTH_SECRET`.
3. Generate a random `NEXTAUTH_SECRET` using the OpenSSL terminal command.

### Displaying User Profile Icon
1. Utilize the `session.user.image` property to display the user's profile icon.
2. Replace the mock logo with the actual user profile icon.
3. Update both mobile and desktop navigation bars to include the profile icon.


## Conclusion
This tutorial has guided you through the process of setting up user sessions, implementing authentication, and displaying user profile information in your web application. Refer to the full tutorial for detailed explanations and code samples.

For more in-depth insights and to learn about error handling, deployment, and additional features, explore the NextAuth.js documentation and resources.


## Conclusion
With user authentication and session management now established, as well as MongoDB integration in place, the application is poised for further development. The "Create Post" page will be the next focus, allowing users to share prompts.

Continuing to build on this foundation will help you develop a complete web application. Refer to the full tutorial for detailed explanations and code samples.

For advanced features, deployment, and enhancing the user experience, explore additional resources and tutorials available online.



<br><br><br>




# The Create-Prompt Page
