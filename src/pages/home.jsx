import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
    const { t } = useTranslation();
    return (
        <div className='dark:bg-gray-950 flex items-center flex-col gap-[15px] justify-center min-h-[90vh] bg-gray-200 text-gray-950 transition-all duration-500 dark:text-gray-200'>
            <motion.h1 initial={{ scale: .9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: .3 }} className='text-2xl text-center font-bold'>{t("welcome")}</motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .5 }} className='text-lg text-center'>{t("perekhod")}</motion.p>
            <Link to="users">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: .95 }} className='bg-gray-300 transition-all duration-500 text-gray-950 dark:text-gray-200 cursor-pointer dark:bg-gray-900 py-[5px] px-[10px] rounded-[5px]'>{t("buttonPerekhod")}</motion.button>
            </Link>
        </div>)
}; export default Home;
