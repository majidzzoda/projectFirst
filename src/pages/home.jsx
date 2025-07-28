import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div className='dark:bg-gray-950 flex items-center flex-col gap-[15px] justify-center min-h-screen bg-gray-200 text-gray-950 transition-all duration-500 dark:text-gray-200'>
            <h1 className='text-2xl text-center font-bold'>Добро пожаловать!</h1>
            <p className='text-lg text-center'>Перейдите по кнопке ниже, чтобы посмотреть список пользователей.</p>
            <Link to={'users'}>
                <button className='bg-gray-300 transition-all duration-500 text-gray-950 dark:text-gray-200 cursor-pointer dark:bg-gray-900 py-[5px] px-[10px] rounded-[5px]'>
                    Перейти к пользователям
                </button>
            </Link>
        </div>
    )
}

export default Home