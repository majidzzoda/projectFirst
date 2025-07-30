import React from 'react';
import { Link } from 'react-router-dom';

const UserLists = ({ data, search }) => {
    return (
        <div className='flex flex-col h-[350px] lg:h-[500px] transition-all duration-500 overflow-scroll mt-[10px] rounded-[8px] bg-gray-300 dark:bg-gray-900 gap-[5px]'>
            {data
                .filter((e) => e.Name.toLowerCase().trim().includes(search.toLowerCase().trim()))
                .map((e) => (
                    <div
                        key={e.id}
                        className='p-[10px] dark:border-none transition-all duration-500 rounded-[8px] bg-gray-200 dark:bg-gray-950'
                    >
                        <Link to={`/UserById/${e.id}`}>
                            <h1 className='transition-all duration-500 text-blue-400'>{e.Name}</h1>
                        </Link>
                    </div>
                ))}
        </div>
    );
};

export default UserLists;
