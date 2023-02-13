import Head from 'next/head'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { supabaseClient } from '../utils/supabase'
import {useAuth, useUser} from '@clerk/nextjs'

export default function Recipe() {
  const router = useRouter();
  const { id } = router.query;

  const {getToken} = useAuth()
  //const {user} = useUser()

  const [dateString, setDateString] = useState<any>('')
  const [time, setTime] = useState<any>('')
  const [basics, setBasics] = useState<any>('')
  const [description, setDescription] = useState<any>('')
  const [category, setCategory] = useState<any>('')
  const [location, setLocation] = useState<any>('')
  const [address, setAddress] = useState<any>('')
  const [price, setPrice] = useState<any>('')

  useEffect(() => {
    async function fetchData() {

      const supabaseToken = await getToken({template: 'supabase'})
      const supabase = await supabaseClient(supabaseToken!)
    
      const row: any = await supabase.from('events').select().eq('id', id)
      console.log('row:', row)
      
      const dt = new Date(row.data[0].date);
      console.log('row.data[0].date:', row.data[0].date)
      const year = dt.getUTCFullYear()
      const month = dt.getUTCMonth()
      const day = dt.getUTCDate()
      //console.log('month, day, year:', month, day, year)
      const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      //console.log('monthName, day, year:', monthNames[month], day, year)
      setDateString(monthNames[month].toString() + ' ' + day.toString() + ', ' + year.toString())
      setTime(row.data[0].time)
      setBasics(row.data[0].basics)
      setDescription(row.data[0].description)
      setCategory(row.data[0].category)
      setLocation(row.data[0].location)
      setAddress(row.data[0].address)
      setPrice(row.data[0].price)
    }
    fetchData();
  }, []);

  return (
    <div className='pt-10 pb-40 h-full flex justify-center'>
      <Head>
        <title>{basics}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/calendar.svg" />
        {/* Icon by <a href="https://freeicons.io/profile/3">icon king1</a> on <a href="https://freeicons.io">freeicons.io</a> */}
      </Head>
      <div className='w-3/4 h-fit p-5 mb-60 bg-gray-50 dark:bg-zinc-600 dark:text-white rounded-lg shadow-lg'>
        <div className='mb-10 flex justify-between'>
          <div className='flex'>
            <div className='w-[200px] text-lg font-semibold'>{dateString}</div>
            <div className='text-lg font-semibold'>{time}</div>
          </div>
          <div className='font-semibold'>Price: {price}</div>
        </div>
        <div className='flex mb-7'>
          <div className="w-[55%] pr-6">
            <pre className="whitespace-pre-wrap text-2xl font-bold">{basics}</pre>
          </div>
          <div className='w-[45%]'>
            <pre className="font-semibold whitespace-pre-wrap text-lg">{location}</pre>
            <pre className="whitespace-pre-wrap">{address}</pre>
          </div>
        </div>
        <div className='flex mb-3'>
          <pre className="whitespace-pre-wrap">{description}</pre>
        </div>
        <div className='flex justify-end mb-1 font-semibold'>Category: {category}</div>
      </div>  
    </div>

    // <div className='pt-10 pb-40 h-full flex justify-center'>
    //   <Head>
    //     <title>{basics}</title>
    //     <meta name="description" content="Generated by create next app" />
    //     <link rel="icon" href="/calendar.svg" />
    //     {/* Icon by <a href="https://freeicons.io/profile/3">icon king1</a> on <a href="https://freeicons.io">freeicons.io</a> */}
    //   </Head>
    //   <div className='w-3/4 h-fit p-5 mb-60 bg-gray-100 rounded-lg shadow-lg'>
    //     <div className='mb-10 flex justify-between'>
    //       <div className='flex'>
    //         <div className='w-[200px] text-xl'>{dateString}</div>
    //         <div className='text-xl'>{time}</div>
    //       </div>
    //       <div>Price: {price}</div>
    //     </div>
    //     <div className='flex mb-7'>
    //       <pre className="w-[55%] pr-6 whitespace-pre-wrap text-xl">{basics}</pre>
    //       <div className='w-[45%] '>
    //         <pre className="whitespace-pre-wrap">{location}</pre>
    //         <pre className="whitespace-pre-wrap">{address}</pre>
    //       </div>
    //     </div>
    //     <div className='flex mb-3'>
    //       <pre className="pr-5 whitespace-pre-wrap">{description}</pre>
    //     </div>
    //     <div className='flex justify-end mb-1'>Category: {category}</div>
    //   </div>  
    // </div>
  );
}
