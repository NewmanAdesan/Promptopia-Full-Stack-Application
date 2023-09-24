"use client"


import Link from 'next/link';
import Image from 'next/image';
import {useState, useEffect} from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';



const Nav = () => {

  const {data: session}= useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropDown, setToggleDropDown] = useState(false);

  useEffect(()=>{
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    }

    setUpProviders();
  }, [])

  return (
    <nav className='flex-between w-full mb-16 pt-3'>

      {/* Nav-Logo */}
      <Link href="/" className="flex gap-2 flex-center">
        <Image 
            src="/assets/images/logo.svg"
            alt="Promptopia Logo"
            width={30}
            height={30}
            className="object-contain"
        />
        <p className='logo_text'>Promptopia</p>
      </Link>


      {/* Desktop-Navigation */}
      <div className="hidden md:flex">
        {/* in here, we need to know if user is logged in or not, to know which buttons to show.
        for now, we would use a mock boolean variable isUserLoggedIn.
        when user is logged in, aside the logo we see create-post button, sign-out button and a profile image.
        when user is not logged in,aside the logo we see a Sign in button

        later we will change this isUserLoggedIn to the client session variable that next auth provides
        checking if it has the user property which will be added if a user has logged-in through a service e.g Goggle, Github e.t.c
        
        */}

        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>

            {/* create prompt link */}
            <Link 
              href="/create-prompt" className="black_btn">
                Create Post
            </Link>

            {/* sign out button */}
            <button type='button' className="outline_btn" onClick={signOut}>
              Sign Out
            </button>


            {/* user profile link (user profile image will show here) */}
            <Link href={`/profile?userId=${session?.user.id}&username=${session?.user.username}`}>
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"

              />
            </Link>
          </div>
        ) : (
          <>
          {/* not logged in, we have a button to sign in.
              and to be able to do that using "next auth"
              we have to have something know as "Providers".
            
              we import "getProviders from next-auth/react"
              we create a state in Nav called "providers & setProviders" with starting value of null.
              then we set the state once when the Nav component has loaded; to do this, we use the "useEffect hooks" making it run once; then in the useEffect hooks, we create an asynchronous function in it we call the "getProvider function" awaiting its response; then we set it response to be the new value for the providers state; still in the useEffect hooks, we call this function.
              so "getProviders" kind of gives us an object containing the providers we have and this will be placed in our "providers" state
            
              now if users is not logged in we want a sign in button to appear in our nav for each provider values in the "providers state".
              when clicked it signs in using that provider.

              ================ A CAVEAT ================
              THIS EXPLANATION IS IN PART. THIS IS THE FIRST PART
              so if user is not logged in, for now we would see any buttons because we are trying to fetch providers that are not actually there. we would do this later when we fully set up our next auth.

              the questions are
              how do we add providers like "Google" such that get providers give us a meaning object? 
            
            */}
            {providers && Object.values(providers).map((provider)=>(
              <div
                type="button"
                key={provider.name}
                onClick={()=>signIn(provider.id)}
                className='black_btn cursor-pointer'
                >Sign In</div>
            ))}

          </>
        )}
    </div>





      {/* Mobile-Navigation */}
      {/* on mobile, the nav bar feature the logo & the profile image.
          when the profile image is clicked, a drop down menu appears.
          to do this, we add a state called "toggleDropDown" which is false initially.
          when the profile image is clicked, it becomes true.
          below the profile image react code is the drop down menu react code that renders based on the "toggleDropDown" state
      */}
      <div className='md:hidden flex relative'>
        {session?.user ? (
          <div>
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={()=>setToggleDropDown((prevState)=>!prevState)}
            />

            
            {toggleDropDown && (
              <div className='dropdown'>
                <Link
                    href={`/profile?userId=${session.user.id}&username=${session.user.username}`}
                    className='dropdown_link'
                    onClick={()=>setToggleDropDown(false)}>
                    My Profile
                </Link>
                <Link
                    href="/create-prompt"
                    className='dropdown_link'
                    onClick={()=>setToggleDropDown(false)}>
                    Create Prompt
                </Link>
              </div>
            )}
          </div>

        ) : (
          <>
            {providers && Object.values(providers).map((provider)=>(
              <div
                type="button"
                key={provider.name}
                onClick={()=>signIn(provider.id)}
                className='black_btn cursor-pointer'
                >Sign In</div>
            ))}
          </>
        )}

      </div>

    </nav>
  )
}

export default Nav


/**
 * Link allows up move to other pages of our application
 * Image automatically optimizes our images for us
 * signIn, signOut, useSession, getProviders all make the sign-in & sign-out process incredibly simple
 * 
 * STRUCTURE OF OUT NAVGATION BAR
 */