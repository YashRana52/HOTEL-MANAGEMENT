import { roomsDummyData } from '@/assets/assets'
import React from 'react'
import HotelCard from './HotelCard'
import Title from './Title'
import { useNavigate } from 'react-router-dom'

function FeaturedDestination() {
    const navigate = useNavigate()
    return (
        <div className='flex flex-col items-center px-2 md:px-8 lg:px-16 bg-slate-50 py-20'>
            <Title
                title='Where Adventure Meets Elegance'
                subTitle='Discover breathtaking destinations and exquisite stays that blend exploration with world-class hospitality — all in one unforgettable journey.'
            />


            <div className='flex flex-wrap items-center justify-center gap-6 mt-20'>
                {
                    roomsDummyData.slice(0, 4).map((room, index) => (
                        <HotelCard key={room._id} room={room} index={index} />
                    ))
                }
            </div>
            <button onClick={() => { navigate('/rooms'); scrollTo(0, 0) }} className="mt-6 px-6 py-2 rounded-full bg-gray-800 text-white text-sm font-medium hover:bg-gray-700 transition-all shadow-md hover:shadow-lg">
                View All Destinations
            </button>




        </div>
    )
}

export default FeaturedDestination