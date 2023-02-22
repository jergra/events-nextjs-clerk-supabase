import Head from 'next/head'
import { useRouter } from 'next/router';
import { supabaseClient } from '../utils/supabase'
import {useAuth, useUser} from '@clerk/nextjs'
import { useState } from 'react'

export default function Create() {
    const {getToken} = useAuth()
    const {user} = useUser()
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('')
    const [location, setLocation] = useState('');
    const [address, setAddress] = useState('');
    const [basics, setBasics] = useState('');
    const [description, setDescription] = useState('');

    const router = useRouter()
    
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const supabaseToken = await getToken({template: 'supabase'})
        const supabase = await supabaseClient(supabaseToken!)
        const{data, error} = await supabase.from('events').insert({
            user_id: user?.id,
            event_creator: user?.fullName,
            date: date,
            time: time,
            price: price,
            category: category,
            location: location,
            address: address,
            basics: basics,
            description: description
        })
        console.log('DATA:', data)
        console.log('ERROR:', error)
        router.push('/')
    }
  return (
    <div className='h-full flex justify-center'>
        <Head>
            <title>Add Event</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/calendar.svg" />
            {/* Icon by <a href="https://freeicons.io/profile/3">icon king1</a> on <a href="https://freeicons.io">freeicons.io</a> */}
        </Head>
        <form 
            onSubmit={handleSubmit}
            className='mt-10 mb-60 bg-gray-50 dark:bg-zinc-700 dark:text-white w-[80%] p-5 rounded-lg shadow-lg'
        >
            <div className='flex justify-between'>
                <div className='flex mb-5'>
                    <div className='flex flex-col mr-3'>
                        <label htmlFor='event-time' className='mb-1'>Event Date</label>
                        <input 
                            type='date'
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className='input input-bordered w-40 dark:bg-zinc-500 dark:text-white'
                        ></input>
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor='event-time' className='mb-1'>Event Time</label>
                        <input 
                            type='text'
                            value={time}
                            placeholder='7:30 pm'
                            onChange={(e) => setTime(e.target.value)}
                            className='input input-bordered w-[180px] dark:bg-zinc-500 dark:text-white'
                        ></input>
                    </div>
                </div>
                <div className='flex mb-5'>
                    <div className='flex flex-col mr-3'>
                        <label htmlFor='event-time' className='mb-1'>Price</label>
                        <input 
                            type='text'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className='input input-bordered w-[220px] dark:bg-zinc-500 dark:text-white'
                        ></input>
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor='category' className='mb-1'>Category</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className='input input-bordered w-30 dark:bg-zinc-500 dark:text-white'
                        >
                            <option value="">Select</option>
                            <option value="Classical Music">Classical Music</option>
                            <option value="Music">Music</option>
                            <option value="Movies">Movies</option>
                            <option value="Theatre">Theatre</option>
                            <option value="Comedy">Comedy</option>
                            <option value="Talks">Talks</option>
                            <option value="Performing Arts">Performing Arts</option>
                            <option value="Visual Arts">Visual Arts</option>
                            <option value="Shows">Shows</option>
                            <option value="Food & Drink">Food & Drink</option>
                            <option value="Sports & Fitness">Sports & Fitness</option>
                            <option value="Classes">Classes</option>
                            <option value="Kids">Kids</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className='flex mb-5'>
                <div className='flex flex-col w-[50%] mr-5'>
                    <label htmlFor='description' className='mb-1'>Event</label>
                    <textarea
                        value={basics}
                        onChange={(e) => setBasics(e.target.value)}
                        className='h-18 input input-bordered dark:bg-zinc-500 dark:text-white'
                    ></textarea>
                </div>
                <div className=' w-[50%]'>
                    <div className='flex flex-col mb-2'>
                        <label htmlFor='location' className='mb-1'>Venue</label>
                        <textarea
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className='input input-bordered dark:bg-zinc-500 dark:text-white'
                        ></textarea>
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor='location' className='mb-1'>Address</label>
                        <textarea
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className='h-20 input input-bordered dark:bg-zinc-500 dark:text-white'
                        ></textarea>
                    </div>
                </div>
               
            </div>
            <div className='flex flex-col'>
                    <label htmlFor='description' className='mb-1'>Details</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className='h-[180px] input input-bordered dark:bg-zinc-500 dark:text-white'
                    ></textarea>
                </div>
            <div className='flex justify-start mt-8'>
                <button 
                    type='submit' 
                    className='inline-block px-10 py-3 text-lg font-semibold text-center
                    text-white uppercase transition duration-200 ease-in-out 
                    rounded-md cursor-pointer bg-indigo-600 hover:bg-indigo-700 
                    dark:bg-indigo-700 dark:hover:bg-indigo-800'
                >Save</button>
            </div>
        </form>
    </div>
  )
}
