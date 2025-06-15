import React from 'react'
import Title from './Title'
import { assets, exclusiveOffers } from '@/assets/assets'

function ExclusiveOffer() {
    return (
        <div className="px-4 sm:px-12 lg:px-24 xl:px-32 py-16 space-y-12">
            {/* Title Section */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <Title
                    align='left'
                    title='Limited-Time Luxury Deals'
                    subTitle='Unlock exclusive savings and personalized packages — crafted to elevate your experience and make every moment of your stay truly exceptional.'
                />
                <button className="group flex items-center gap-2 text-gray-800 border border-gray-300 rounded-full px-5 py-2 hover:bg-gray-100 transition-all">
                    View All Offers
                    <img
                        src={assets.arrowIcon}
                        alt="arrow-icon"
                        className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    />
                </button>
            </div>

            {/* Offers Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {exclusiveOffers.map((item) => (
                    <div
                        key={item._id}
                        className="group relative p-6 rounded-2xl h-[250px] text-white flex flex-col justify-between bg-cover bg-center shadow-lg"
                        style={{ backgroundImage: `url(${item.image})` }}
                    >
                        {/* Discount Label */}
                        <p className="absolute top-4 left-4 px-3 py-1 text-xs bg-white text-gray-800 font-semibold rounded-full shadow">
                            {item.priceOff}% OFF
                        </p>

                        {/* Content */}
                        <div className="z-10">
                            <h3 className="text-lg py-5 font-semibold mb-1">{item.title}</h3>
                            <p className="text-sm leading-snug opacity-90">{item.description}</p>
                            <p className="text-xs mt-2 text-gray-200">Expires {item.expiryDate}</p>
                        </div>

                        {/* View Offers Button */}
                        <button className="flex items-center gap-2 mt-4 text-sm font-medium backdrop-blur-sm bg-white/20 px-4 py-2 rounded-full hover:bg-white/30 transition-all w-fit">
                            View Offers
                            <img
                                className="invert w-4 h-4 group-hover:translate-x-1 transition-transform"
                                src={assets.arrowIcon}
                                alt="arrow-icon"
                            />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ExclusiveOffer
