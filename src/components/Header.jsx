import React from 'react';

const Header = () => {
    return (
        <header className='flex justify-between item-center mb-6'>
            <h1 className='text-2xl font-bold'>Task Manager</h1>
            <button className='bg-blue-500 text-while px-3 py-1 rounded-lg hover:bg-blue-600'>
                New Task
            </button>
        </header>
    )
}

export default Header;