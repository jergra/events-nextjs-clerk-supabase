import Head from 'next/head'
import Link from "next/link"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { supabaseClient } from '../utils/supabase'
import {useAuth, useUser} from '@clerk/nextjs'
import {findDistance} from '../utils/distance'

import {AiFillGithub} from 'react-icons/ai'
import {format} from 'date-fns'


export default function Home() {
  const [lat, setLat] = useState<any>(49.0870455);
  const [lng, setLng] = useState<any>(-122.2676685);
  const [status, setStatus] = useState<any>(null);

  const {getToken} = useAuth()
  //const {user} = useUser()

  const [eventData, setEventData] = useState<any>();
  const [category, setCategory] = useState<any>('');
  const [range, setRange] = useState<any>(50000);
  const router = useRouter();
  

  const transformDate = (rawDate: any) => {
      const dt = new Date(rawDate);
      //console.log('rawDate:', rawDate)
      const year = dt.getUTCFullYear()
      const month = dt.getUTCMonth()
      const day = dt.getUTCDate()
      //console.log('month, day, year:', month, day, year)
      const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      //console.log('monthName, day, year:', monthNames[month], day, year)
      const transformedDate = monthNames[month].toString() + ' ' + day.toString() + ', ' + year.toString()
    
    //console.log('transformedDate:', transformedDate)
    
    return transformedDate
  }

  const handleSubmit = async (e: any) => {
      e.preventDefault();
      const today = format(new Date(), 'yyyy-MM-dd')
      const supabaseToken = await getToken({template: 'supabase'})
      const supabase = await supabaseClient(supabaseToken!)
      let query = supabase.from('events').select();
      console.log('range:', range)
      if (category === 'All') {
        const rows = await query.gte('date', today).order('date').lt('distance', range)
        console.log('rows.data4:', rows.data)
        setEventData(rows.data)
        console.log('eventData4:', eventData)
      } else {
        const rows = await query.gte('date', today).order('date').lt('distance', range).eq('category', category)
        console.log('rows.data5:', rows.data)
        setEventData(rows.data)
        console.log('eventData5:', eventData)
      }
  }

  useEffect(() => {
    const getLocation = () => {
      if (!navigator.geolocation) {
        setStatus('Geolocation is not supported by your browser');
      } else {
        setStatus('Locating...');
        navigator.geolocation.getCurrentPosition((position) => {
          setStatus(null);
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
        }, () => {
          setStatus('Unable to retrieve your location');
        });
      }
    }
    getLocation()
    console.log('lat, lng:', lat, lng)
  }, [])

  useEffect(() => {
    async function fetchData() {
      const today = format(new Date(), 'yyyy-MM-dd')
      const supabaseToken = await getToken({template: 'supabase'})
      const supabase = await supabaseClient(supabaseToken!)
      
      let query = supabase.from('events').select();
      const rows = await query.gte('date', today).order('date')
      console.log('rows.data1:', rows.data)
      
      if (rows.data) {
        console.log('lat, lng used in fetch:', lat, lng)
        for (let j=0;j<rows.data.length;j++) {
          fetch(`https://geocode.maps.co/search?q=${rows.data[j].address}`)
            .then(res => res.json())  // convert to json
            .then(data => {
                //console.log('lat, data[0].lat, lng, data[0].lon:', lat, data[0].lat, lng, data[0].lon )
                const dist = findDistance(lat, data[0].lat, lng, data[0].lon)
                
                var distance = dist/1000
                console.log('distance:', distance)
                if (!distance) {
                  distance = 10
                }
                const changeDistance = async () => {
                  const supabaseToken = await getToken({template: 'supabase'})
                  const supabase = await supabaseClient(supabaseToken!)
                  const{data, error} = await supabase
                    .from('events')
                    .update({distance: distance})
                    .eq('id', rows.data[j].id)
                  // console.log('DATA:', data)
                  // console.log('ERROR:', error)
                }
                changeDistance()
                
          }).catch(err => console.log('Request Failed', err)); // Catch errors
        }
      }
      
      setEventData(rows.data)
      console.log('eventData1:', eventData)
    }

    fetchData()
    console.log('eventData2:', eventData)
  
  }, [lat]);

  return (
    <div className='flex flex-col w-full h-full items-center justify-between'>
      <Head>
        <title>Events</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/calendar.svg" />
        {/* Icon by <a href="https://freeicons.io/profile/3">icon king1</a> on <a href="https://freeicons.io">freeicons.io</a> */}
                                
      </Head>
      <main className='flex flex-col w-full items-center'>
        <div className='mt-10 w-2/3 flex justify-between items-center'>
          <form 
              onSubmit={handleSubmit} 
              className='flex'
          >
            <div className='flex items-center'>
            <div className="relative rounded-md mr-2">
              <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)} 
                  className="form-input py-2 px-3 block leading-5 rounded-md 
                    transition duration-150 ease-in-out bg-gray-50 
                    dark:bg-zinc-600 dark:text-white border 
                    border-gray-300 focus:outline-none 
                    focus:shadow-outline-indigo-300 focus:border-indigo-300"
              >
                <option value="">Category</option>
                <option value="All">All</option>
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
                <option value="Kids">Kids</option>
              </select>
            </div>
            <div className="relative rounded-md mr-2">
              <select 
                  value={range} 
                  onChange={(e) => setRange(e.target.value)} 
                  className="form-input py-2 px-3 block leading-5 rounded-md 
                    transition duration-150 ease-in-out bg-gray-50 
                    dark:bg-zinc-600 dark:text-white border 
                    border-gray-300 focus:outline-none 
                    focus:shadow-outline-indigo-300 focus:border-indigo-300"
              >
                <option value='50000'>Distance</option>
                <option value='5'>Less than 5 km</option>
                <option value="10">Less than 10 km</option>
                <option value="25">Less than 25 km</option>
                <option value="100">Less than 100 km</option>
                <option value="60000">Any Distance</option>
              </select>
            </div>
            <button 
                type='submit'
                className='inline-block px-4 py-3 text-lg font-semibold text-center
              text-white uppercase transition duration-200 ease-in-out 
              rounded-md cursor-pointer bg-indigo-600 hover:bg-indigo-700 
              dark:bg-indigo-700 dark:hover:bg-indigo-800'
              >Apply</button>
              </div>
          </form>
          <Link href='/add-event'>
            <button 
              className='inline-block px-4 py-3 text-lg font-semibold text-center
              text-white uppercase transition duration-200 ease-in-out 
              rounded-md cursor-pointer bg-indigo-600 hover:bg-indigo-700 
              dark:bg-indigo-700 dark:hover:bg-indigo-800'
            >Add Event</button>
          </Link> 
        </div>

        <div className='mt-10 w-2/3'>
            {eventData?.map((event: any, index: any) => (
                <div
                    className='flex flex-col mb-6 cursor-pointer text-xl bg-gray-50 dark:bg-zinc-600 dark:text-white  p-2 rounded-lg shadow-md hover:shadow-lg'
                    key={event.id}
                    onClick={() => router.push(`/event?id=${event.id}`)}
                >
                    <div className='flex justify-center mb-2'>
                        <div className='whitespace-pre-wrap rounded-full bg-gray-100 dark:bg-zinc-700 text-2xl font-bold px-4 py-2'>{event.basics}</div>
                    </div>
                    <div className='flex justify-between mb-2'>
                        <div className='flex'>
                            <div className='w-[200px] flex flex-col p-1 font-medium'>{transformDate(event.date)}</div>
                            <div className='flex flex-col p-1 font-medium'>{event.time}</div>
                        </div>
                        <div className='p-1 whitespace-pre-wrap font-medium'>{event.location}</div>
                    </div>
                </div>
            ))}
        </div>

      </main>
      <footer className='mt-[140px] mb-14'>
        <a
          href="https://github.com/jergra/events-nextjs-clerk-supabase"
          target='_blank'
          rel='noreferrer'
          className='text-gray-900 dark:text-white'
        >
          <AiFillGithub size={40} />
        </a>
      </footer>
    </div>
  ) 
}
