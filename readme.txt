Feb 6, 2023

C:/dev/events-nextjs-clerk-supabase

Derived from live tutorial:
    Lets build a Recipe App from scratch - Next.js Clerk Supabase
    https://www.youtube.com/watch?v=en5HXArBwkM&t=5658s&ab_channel=JamesPerkins
    https://www.youtube.com/watch?v=WRsT874OHQU&ab_channel=JamesPerkins

    by James Perkins 

An 'events' website built with nextjs, clerk, supabase, tailwind, geolocation,
dark mode, with help from chatgpt.

The visitor can vary the events shown by category and distance away.

start:
    npm run dev

deployed:
	https://events-nextjs-clerk-supabase.vercel.app/

update:
    git add .
    git commit -m 'message'
    git push


After creating a project at supabase, copy the JWT secret key
then go to clerk.dev and set up authentication.
Under 'JWT Templates' at clerk.dev, click 'New template', 
click 'supabase', paste in the supabase JWT secret key.

Create a database called 'events' at supabase. 
Turn off 'Enable Row Level Security (RLS)'.
These are the columns:
    id              int8
    user_id         text
    event_creator   text
    created_at      timestamptz     now()
    location        text
    address         text
    updated_at      timestamptz     now()
    category        text
    date            date 
    time            text
    basics          text 
    description     text
    price           text 


.env.local looks like this:

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_KEY=


