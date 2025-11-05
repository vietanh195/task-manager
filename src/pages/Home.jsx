import React from 'react';
import Header from '../components/Header';

const Home = () => {
    return (
        <div className='max-w-6xl mx-auto'>   
            <Header />
            <h1 className='text-3xl font-bold text-center mb-6'>My Task Manager</h1>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <div className='bg-white rounded-xl shadow p-4'>
                    <h2 className='font-semibold text-lg mb-2 text-blue-600'>To Do</h2>
                    {/* Task hien thi o day */}
                </div>   

                <div className="bg-white rounded-xl shadow p-4">
                    <h2 className="font-semibold text-lg mb-2 text-yellow-600">In Progress</h2>
                </div>

                <div className="bg-white rounded-xl shadow p-4">
                    <h2 className="font-semibold text-lg mb-2 text-green-600">Done</h2>
                </div>
            </div>
        </div>
    )
}

export default Home;