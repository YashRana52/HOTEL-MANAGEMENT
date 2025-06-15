import { assets, facilityIcons, roomsDummyData } from '@/assets/assets';
import StarRating from '@/components/StarRating';
import { Label } from '@radix-ui/react-label';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CheckBox = ({ label, selected = false, onChange = () => { } }) => {
    return (
        <Label className='flex gap-2 items-center cursor-pointer text-sm'>
            <input
                type="checkbox"
                checked={selected}
                onChange={(e) => onChange(e.target.checked, label)}
                className='accent-blue-600 w-4 h-4'
            />
            <span className='font-light select-none'>{label}</span>
        </Label>
    );
};

const RadioButton = ({ label, selected = false, onChange = () => { } }) => {
    return (
        <Label className='flex gap-2 items-center cursor-pointer text-sm'>
            <input
                type="radio"
                name='sortOptions'
                checked={selected}
                onChange={() => onChange(label)}
                className='accent-blue-600 w-4 h-4'
            />
            <span className='font-light select-none'>{label}</span>
        </Label>
    );
};

function AllRooms() {
    const navigate = useNavigate();
    const [openFilter, setOpenFilter] = useState(false);

    const RoomTypes = ["Single Bed", "Double Bed", "Luxury Room", "Family Suite"];
    const PriceRange = ['0 to 500', '500 to 1000', '1000 to 2000', '2000 to 3000'];
    const sortOptions = ['Price Low to High', "Price High to Low", "Newest First"];

    const [selectedRoomTypes, setSelectedRoomTypes] = useState([]);
    const [selectedPriceRange, setSelectedPriceRange] = useState([]);
    const [selectedSort, setSelectedSort] = useState('');

    const toggleRoomType = (checked, label) => {
        setSelectedRoomTypes(prev => checked ? [...prev, label] : prev.filter(item => item !== label));
    };

    const togglePriceRange = (checked, label) => {
        setSelectedPriceRange(prev => checked ? [...prev, label] : prev.filter(item => item !== label));
    };

    const changeSort = (label) => {
        setSelectedSort(label);
    };

    const clearAll = () => {
        setSelectedRoomTypes([]);
        setSelectedPriceRange([]);
        setSelectedSort('');
    };

    return (
        <div className='flex flex-col gap-6 pt-28 md:pt-32 px-4 md:px-16 lg:px-24 xl:px-32'>

            {/* Mobile Filter Bar */}
            <div className='lg:hidden flex justify-between items-center bg-white p-4 rounded-xl shadow-md'>
                <p className='font-medium text-gray-800'>Filters</p>
                <button
                    onClick={() => setOpenFilter(!openFilter)}
                    className='text-sm text-blue-600 font-medium'
                >
                    {openFilter ? 'Hide' : 'Show'}
                </button>
            </div>

            {/* Collapsible Filter for Mobile */}
            <div className={`lg:hidden bg-white overflow-hidden rounded-xl transition-all duration-500 ${openFilter ? 'max-h-[1000px] p-4' : 'max-h-0 p-0'}`}>
                <div className='flex justify-between items-center mb-2'>
                    <p className='text-gray-700 font-medium'>Filters</p>
                    <button onClick={clearAll} className='text-blue-600 text-sm'>Clear All</button>
                </div>
                <div className='space-y-4'>
                    <div>
                        <p className='font-medium text-gray-800 mb-2'>Room Types</p>
                        {RoomTypes.map((room, index) => (
                            <CheckBox
                                key={index}
                                label={room}
                                selected={selectedRoomTypes.includes(room)}
                                onChange={toggleRoomType}
                            />
                        ))}
                    </div>
                    <div>
                        <p className='font-medium text-gray-800 mb-2'>Price Range</p>
                        {PriceRange.map((range, index) => (
                            <CheckBox
                                key={index}
                                label={range}
                                selected={selectedPriceRange.includes(range)}
                                onChange={togglePriceRange}
                            />
                        ))}
                    </div>
                    <div>
                        <p className='font-medium text-gray-800 mb-2'>Sort By</p>
                        {sortOptions.map((option, index) => (
                            <RadioButton
                                key={index}
                                label={option}
                                selected={selectedSort === option}
                                onChange={changeSort}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className='flex flex-col lg:flex-row gap-8'>

                {/* Rooms List */}
                <div className='w-full lg:w-3/4 space-y-8'>
                    <h1 className='font-playfair text-4xl font-semibold'>Hotel Rooms</h1>
                    <p className='text-gray-600 text-sm md:text-base'>Take advantage of our limited-time offers to enhance your stay.</p>
                    {roomsDummyData.map((room) => (
                        <div
                            key={room._id}
                            className='flex flex-col md:flex-row gap-4 p-4 border rounded-xl shadow-sm hover:shadow-md transition bg-white cursor-pointer'
                        >
                            <img
                                onClick={() => { navigate(`/rooms/${room._id}`); scrollTo(0, 0); }}
                                src={room.images[0]}
                                alt="Room"
                                className='w-full md:w-60 h-44 rounded-xl object-cover'
                            />
                            <div className='flex flex-col justify-between flex-grow'>
                                <div className='space-y-1'>
                                    <p className='text-sm text-gray-500'>{room.hotel.city}</p>
                                    <p
                                        onClick={() => { navigate(`/rooms/${room._id}`); scrollTo(0, 0); }}
                                        className='font-playfair text-xl font-semibold text-gray-800 hover:text-blue-600'
                                    >
                                        {room.hotel.name}
                                    </p>
                                    <div className='flex items-center text-sm text-gray-600'>
                                        <StarRating />
                                        <span className='ml-2'>200+ reviews</span>
                                    </div>
                                    <div className='flex items-center text-gray-500 text-sm space-x-2 mt-1'>
                                        <img src={assets.locationIcon} alt="Location" className='w-4 h-4' />
                                        <span>{room.hotel.address}</span>
                                    </div>
                                </div>
                                <div className='flex flex-wrap items-center justify-between mt-4'>
                                    <div className='flex gap-2 flex-wrap'>
                                        {room.amenities.map((item, index) => (
                                            <div key={index} className='flex items-center gap-1 border px-2 py-1 rounded-full text-xs text-gray-600'>
                                                <img src={facilityIcons[item]} alt={item} className='w-4 h-4' />
                                                <span>{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <p className='text-gray-800 text-lg font-semibold mt-4 md:mt-0'>${room.pricePerNight} /night</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Desktop Filter Sidebar */}
                <div className='hidden lg:block bg-white w-80 border p-5 rounded-xl h-max shadow-sm'>
                    <div className='flex justify-between items-center mb-4'>
                        <p className='text-base font-medium text-gray-800'>Filters</p>
                        <button onClick={clearAll} className='text-sm text-blue-600'>Clear All</button>
                    </div>
                    <div className='space-y-6'>
                        <div>
                            <p className='font-medium text-gray-800 mb-2'>Room Types</p>
                            {RoomTypes.map((room, index) => (
                                <CheckBox
                                    key={index}
                                    label={room}
                                    selected={selectedRoomTypes.includes(room)}
                                    onChange={toggleRoomType}
                                />
                            ))}
                        </div>
                        <div>
                            <p className='font-medium text-gray-800 mb-2'>Price Range</p>
                            {PriceRange.map((range, index) => (
                                <CheckBox
                                    key={index}
                                    label={range}
                                    selected={selectedPriceRange.includes(range)}
                                    onChange={togglePriceRange}
                                />
                            ))}
                        </div>
                        <div>
                            <p className='font-medium text-gray-800 mb-2'>Sort By</p>
                            {sortOptions.map((option, index) => (
                                <RadioButton
                                    key={index}
                                    label={option}
                                    selected={selectedSort === option}
                                    onChange={changeSort}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AllRooms;
