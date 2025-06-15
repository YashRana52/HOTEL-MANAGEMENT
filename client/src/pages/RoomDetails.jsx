import { assets, facilityIcons, roomCommonData, roomsDummyData } from '@/assets/assets';
import StarRating from '@/components/StarRating';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function RoomDetails() {
    const { id } = useParams();
    const [room, setRoom] = useState(null);
    const [mainImage, setMainImage] = useState(null);

    useEffect(() => {
        const foundRoom = roomsDummyData.find((room) => room._id === id);
        if (foundRoom) {
            setRoom(foundRoom);
            setMainImage(foundRoom.images[0]);
        }
    }, [id]);

    return room && (
        <div className='py-32 px-4 md:px-16 lg:px-32 bg-white min-h-screen'>

            {/* Title, Ratings, Location */}
            <div className='flex flex-col gap-3 mb-8'>
                <h1 className='text-3xl font-semibold text-gray-800'>
                    {room.hotel.name}
                    <span className='text-base text-gray-500 ml-2'>({room.roomType})</span>
                </h1>
                <div className='flex items-center gap-3 text-sm text-gray-600'>
                    <StarRating />
                    <p className='font-medium text-gray-700'>200+ reviews</p>
                    <span className='ml-2 bg-orange-500 text-white px-3 py-1 rounded-full text-xs'>20% OFF</span>
                </div>
                <div className='flex items-center gap-2 text-gray-500 text-sm'>
                    <img src={assets.locationIcon} alt="location" className='w-4 h-4' />
                    <span>{room.hotel.address}</span>
                </div>
            </div>

            {/* Main Image & Thumbnails */}
            <div className='grid grid-cols-1 lg:grid-cols-5 gap-4'>

                {/* Main Image - take 3/5 width in large screens */}
                <div className='lg:col-span-3'>
                    <img
                        src={mainImage}
                        alt="Room Main"
                        className='w-full h-[280px] md:h-[400px] object-cover rounded-xl'
                    />
                </div>

                {/* Small Images - 2x2 grid, take 2/5 width */}
                <div className='grid grid-cols-2 grid-rows-2 gap-3 lg:col-span-2'>
                    {room.images.slice(0, 4).map((image, index) => (
                        <img
                            onClick={() => setMainImage(image)}
                            key={index}
                            src={image}
                            alt={`Thumbnail ${index}`}
                            className={`w-full h-[120px] md:h-[130px] object-cover rounded-xl cursor-pointer ${mainImage === image ? 'ring-2 ring-orange-500' : ''
                                }`}
                        />
                    ))}
                </div>

            </div>


            {/* Description, Amenities, Price */}
            <div className='flex flex-col md:flex-row md:justify-between md:items-start mt-12 gap-6'>
                <div className='flex-1'>
                    <h1 className='text-3xl md:text-4xl font-playfair tracking-wide text-gray-800 max-w-xl mb-4 md:mb-6'>
                        Experience Luxury Like Never Before
                    </h1>
                    <p className='text-gray-600 mb-6 leading-relaxed'>
                        Discover the perfect blend of comfort and elegance in our thoughtfully designed rooms.
                        Equipped with modern amenities and offering stunning views, this room ensures a memorable stay
                        whether you're here for business or leisure. Enjoy top-notch facilities, impeccable service, and
                        a peaceful ambiance to unwind and relax.
                    </p>

                    <div className='flex flex-wrap gap-3'>
                        {room?.amenities?.map((item, index) => (
                            <div key={index} className='flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 shadow-sm hover:shadow-md transition'>
                                <img src={facilityIcons[item]} alt={item} className='w-5 h-5' />
                                <p className='text-xs font-medium text-gray-600'>{item}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Price */}
                <div className='self-start md:self-center'>
                    <p className='text-3xl font-semibold text-gray-800'>${room.pricePerNight}
                        <span className='text-lg font-normal text-gray-600'> /night</span>
                    </p>
                </div>
            </div>

            {/* Booking Form */}
            <form className='flex flex-col md:flex-row items-start md:items-center justify-between bg-white shadow-[0_0_20px_rgba(0,0,0,0.1)] p-6 rounded-xl mx-auto mt-16 max-w-6xl w-full gap-6'>

                {/* Inputs */}
                <div className='flex flex-col flex-wrap md:flex-row items-start md:items-center gap-4 md:gap-10 text-gray-500 w-full'>
                    <div className='flex flex-col w-full md:w-auto'>
                        <label htmlFor="checkInDate" className='font-medium'>Check-In</label>
                        <input type="date" id="checkInDate" className='w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none' required />
                    </div>
                    <div className='flex flex-col w-full md:w-auto'>
                        <label htmlFor="checkOutDate" className='font-medium'>Check-Out</label>
                        <input type="date" id="checkOutDate" className='w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none' required />
                    </div>
                    <div className='flex flex-col w-full md:w-auto'>
                        <label htmlFor="guests" className='font-medium'>Guests</label>
                        <input type="number" id="guests" placeholder='0' className='w-full max-w-20 rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none' required />
                    </div>
                </div>

                {/* Button */}
                <button
                    type='submit'
                    className='bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all text-white rounded-md w-full md:w-auto md:px-10 py-3 md:py-4 text-base cursor-pointer'
                >
                    Check Availability
                </button>
            </form>

            {/* Specification */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12'>
                {roomCommonData.map((spec, index) => (
                    <div key={index} className='flex items-start gap-4'>
                        <img src={spec.icon} alt={`${spec.title}-icon`} className='w-8 h-8' />
                        <div>
                            <p className='text-lg font-semibold text-gray-700'>{spec.title}</p>
                            <p className='text-gray-500 text-sm'>{spec.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Divider */}
            <div className='max-w-3xl border-y border-gray-300 my-16 py-10 text-gray-500 text-center'>
                <p>Book now to enjoy exclusive services and premium hospitality designed just for you.</p>
            </div>

            {/* Host Information */}
            <div className='flex flex-col md:flex-row items-center gap-6 mt-10'>
                <img src={room.hotel.owner.image} alt="host" className='h-16 w-16 md:h-20 md:w-20 rounded-full object-cover' />
                <div className='text-center md:text-left'>
                    <p className='text-lg md:text-xl font-medium text-gray-800'>Hosted by {room.hotel.name}</p>
                    <div className='flex items-center justify-center md:justify-start mt-1'>
                        <StarRating />
                        <p className='ml-2 text-gray-600'>100+ reviews</p>
                    </div>
                </div>
                <button className='bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full transition-all text-sm md:text-base'>
                    Contact Now
                </button>
            </div>

        </div>
    );
}

export default RoomDetails;
