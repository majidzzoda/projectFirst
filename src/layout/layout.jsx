import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import useDarkSide from '../config/useDarkMode'
import { useTranslation } from 'react-i18next'
import ThemeToggle from '../components/switch'
const Layout = () => {
    const [theme, toggleTheme] = useDarkSide();
    const { t, i18n } = useTranslation()
    return (
        <div className="flex flex-col min-h-[80vh]" >
            <div className='flex items-center gap-[5px] pt-[20px] px-[30px] justify-between lg:gap-[20px] transition-all duration-500'>
                <div onClick={toggleTheme}>
                    <ThemeToggle />
                </div>
                <select className='bg-gray-300 appearance-none text-gray-950 dark:text-gray-200 cursor-pointer dark:bg-gray-900 px-[10px] outline-none focus:border dark:border-gray-900 border-gray-300 border transition-all duration-500 focus:border-blue-500 py-[5px] rounded-[5px]' value={i18n.language} onChange={(e) => i18n.changeLanguage(e.target.value)} name="" id="">
                    <option value="en">English 🇬🇧</option>
                    <option value="ru">Русский 🇷🇺</option>
                    <option value="tj">Тоҷикӣ 🇹🇯</option>
                </select>
            </div>
            <div className='fixed bottom-0 w-full border-t border-blue-500 dark:border-blue-800 font-bold text-[18px] py-[12px] lg:py-[25px] 
               text-gray-950 dark:text-white 
               transition-all duration-500 bg-gray-200 dark:bg-gray-900
               flex items-center justify-evenly'>
                <NavLink to="/" className={({ isActive }) => isActive ? 'text-blue-500 transition-all duration-500' : 'text-gray-400 transition-all duration-500 dark:text-white'}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                        <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
                    </svg>
                </NavLink>
                <NavLink to="users" className={({ isActive }) => isActive ? 'text-blue-500 transition-all duration-500' : 'text-gray-400 transition-all duration-500 dark:text-white'}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z" />
                    </svg>
                </NavLink>
            </div>
            <main className='flex-grow'>
                <Outlet />
            </main>
        </div>
    )
}

export default Layout