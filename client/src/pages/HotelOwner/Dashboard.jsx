import { assets, dashboardDummyData } from '@/assets/assets';
import Title from '@/components/Title';
import React, { useState } from 'react';

function Dashboard() {
  const [dashBoardData] = useState(dashboardDummyData);

  return (
    <div className="px-4 sm:px-6 md:px-10 py-10 bg-[#f7f9fc] min-h-screen text-gray-800 max-w-screen-xl mx-auto">
      <Title
        align="left"
        font="outfit"
        title="Dashboard"
        subTitle="Easily monitor your hotel’s performance — manage room listings, track guest bookings, and analyze your revenue trends — all from one powerful, centralized dashboard"
      />

      {/* Overview Cards */}
      <div className="flex flex-wrap gap-6 my-10">
        {/* Total Bookings */}
        <div className="bg-white rounded-2xl shadow-md p-5 flex items-center gap-4 flex-1 min-w-[250px] hover:shadow-lg transition-all">
          <img
            src={assets.totalBookingIcon}
            alt="Total Bookings"
            className="h-10 sm:h-12"
          />
          <div>
            <p className="text-sm text-gray-500">Total Bookings</p>
            <p className="text-lg sm:text-xl font-semibold text-blue-600">
              {dashBoardData.totalBookings}
            </p>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-white rounded-2xl shadow-md p-5 flex items-center gap-4 flex-1 min-w-[250px] hover:shadow-lg transition-all">
          <img
            src={assets.totalRevenueIcon}
            alt="Total Revenue"
            className="h-10 sm:h-12"
          />
          <div>
            <p className="text-sm text-gray-500">Total Revenue</p>
            <p className="text-lg sm:text-xl font-semibold text-green-600">
              ₹{dashBoardData.totalRevenue}
            </p>
          </div>
        </div>
      </div>

      {/* Recent Bookings Table */}
      <h2 className="text-lg sm:text-xl font-semibold mb-4">
        Recent Bookings
      </h2>
      <div className="w-full overflow-x-auto bg-white rounded-xl border border-gray-200 shadow">
        <table className="w-full min-w-[500px] text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 text-xs uppercase tracking-wide">
            <tr>
              <th className="py-3 px-4">User Name</th>
              <th className="py-3 px-4">Room Name</th>
              <th className="py-3 px-4">Total Amount</th>
              <th className="py-3 px-4">Payment Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {dashBoardData.bookings.map((item, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 transition-colors border-t border-gray-100"
              >
                <td className="py-3 px-4">{item.user.username}</td>
                <td className="py-3 px-4">{item.room.roomType}</td>
                <td className="py-3 px-4">₹{item.totalPrice}</td>
                <td className="py-3 px-4">
                  <span
                    className={`py-1 px-3 text-xs rounded-full font-medium inline-block ${item.isPaid
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                      }`}
                  >
                    {item.isPaid ? 'Completed' : 'Pending'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
