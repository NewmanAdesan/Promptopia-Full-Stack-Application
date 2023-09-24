
## Authentication with Next.js and NextAuth.js
- [Authentication with Next.js and NextAuth.js](#authentication-with-next.js-and-nextauth.js)
  - [Overview](#overview)
  - [Step 1: Session Provider](#step-1-session-provider)
  - [Step 2: Integration with Layout Component](#step-2-integration-with-layout-component)
  - [Step 3: Next.js API for Authentication](#step-3-next.js-api-for-authentication)
  - [Step 4: Obtaining Google Credentials](#step-4-obtaining-google-credentials)
  - [Step 5: Testing](#step-5-testing)

<br><br>


### Overview
This section discusses implementing user authentication using Google NextAuth with the help of Next.js and NextAuth.js. We'll enable users to authenticate using their Google accounts and display their profile photos. The process involves setting up the required components, using Next.js API routes for back-end endpoints, and integrating Google authentication.

<br><br>

### Step 1: Session Provider
- Import the `SessionProvider` from `next-auth/react`.
- Create a higher-order component to wrap other components with the `SessionProvider`.
- Pass `children` and `session` through props to the HOC.
- Render the `SessionProvider` with `children`, and set `session` to `session`.

<br><br>

### Step 2: Integration with Layout Component
- Wrap the entire content within the `Layout` component with the `SessionProvider`.
- This ensures that authentication functionalities are available throughout the app.

<br><br>

### Step 3: Next.js API for Authentication
- Create a new folder called `API` and inside it create another folder named `auth`.
- Within the `auth` folder, create a folder with square brackets and the name `next-auth`.
- Inside the `next-auth` folder, create a file named `route.js`.
- Import `next-auth` and `GoogleProvider` from `next-auth/providers/Google`.
- Set up the `Handler` function as an API route that handles authentication.
- In the `Handler`, configure the `providers` array with the Google provider, specifying `clientID` and `clientSecret`.
- Create `session` and `signIn` functions to manage user sessions and profile data.
- Export the `Handler` as both `get` and `post`.

<br>

### Step 4: Obtaining Google Credentials
- Go to `console.cloud.google.com` and create a new project (e.g., `primetopia`).
- Set up OAuth consent screen with app name, developer email, authorized domain (e.g., `localhost:3000`).
- Obtain the `clientID` and `clientSecret`.
- Store the credentials in your `.env` file as `Google_ID` and `Google_Client_Secret`.
- Access the credentials using `process.env.Google_ID` and `process.env.Google_Client_Secret`.



<br><br>



### Step 5: Testing
- Verify that the environmental variables are being passed correctly by logging an object containing the credentials.
- Ensure that the client ID and client secret are accessible within the application.
- Reload the application and check the console for the logged credentials.

With these steps, you can implement user authentication using NextAuth with Google provider and ensure secure access to your application. Ensure to keep the credentials confidential and avoid exposing them in your codebase.
