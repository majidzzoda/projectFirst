import React, { useEffect, useState, Suspense } from 'react'
import axios from 'axios'
import { Api } from '../config/api';
import { useFormik } from 'formik';
import { useForm } from "react-hook-form";

import { useTranslation } from 'react-i18next';
import LazyLoader from '../components/lazycomp'; // тот, что мы делали
const UserList = React.lazy(() => import('../components/UserList'));

const Users = () => {
    let searchIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-gray-400">
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
    </svg>
    const [search, setSearch] = useState("");
    const { t, i18n } = useTranslation();
    const [data, setData] = useState([]);
    const [addModal, setAddModal] = useState(false);
    const filteredData = data.filter((e) =>
        e.Name.toLowerCase().trim().includes(search.toLowerCase().trim())
    );
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const onSubmit = async (data) => {
        try {
            await axios.post(Api, {
                Name: data.Name,
                Description: data.Description
            });
            setAddModal(false);
            get();
            reset(); // очищаем поля
        } catch (err) {
            console.error(err);
        }
    };

    async function get() {
        try {
            const { data } = await axios.get(Api);
            setData(data);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        get()
    }, [])
    return (
        <div className='dark:bg-gray-950 min-h-[80vh] pt-[25px] px-[25px] bg-gray-200 transition-all duration-500'>
            {addModal && (
                <div
                    className='fixed inset-0 bg-black/30 flex items-center justify-center backdrop-blur-[5px]'>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className='flex flex-col gap-[10px] w-[85%] dark:bg-gray-900 bg-gray-200 p-[20px] rounded-[12px]'
                    >
                        {/* Name Field */}
                        <input
                            type="text"
                            placeholder={t("namePlcHld")}
                            {...register("Name", {
                                required: t("nameRequired"),
                                minLength: { value: 2, message: t("nameMin") },
                                maxLength: { value: 30, message: t("nameMax") }
                            })}
                            className='py-[5px] px-[10px] outline-none dark:text-white border transition-all duration-300 rounded-[8px] placeholder:text-gray-400 bg-gray-200 dark:bg-gray-950 border-gray-300 dark:border-gray-800'
                        />
                        {errors.Name && <p className="text-red-500 text-sm">{errors.Name.message}</p>}

                        {/* Description Field */}
                        <input
                            type="text"
                            placeholder={t("descPlcHld")}
                            {...register("Description", {
                                required: t("descRequired"),
                                minLength: { value: 5, message: t("descMin") },
                                maxLength: { value: 100, message: t("descMax") }
                            })}
                            className='py-[5px] px-[10px] outline-none dark:text-white border transition-all duration-300 rounded-[8px] placeholder:text-gray-400 bg-gray-200 dark:bg-gray-950 border-gray-300 dark:border-gray-800'
                        />
                        {errors.Description && <p className="text-red-500 text-sm">{errors.Description.message}</p>}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className='bg-blue-500 text-white py-[8px] px-[10px] rounded-[8px] hover:bg-blue-600 transition-all duration-300'
                        >
                            {t("addUser")}
                        </button>
                    </form>

                </div>
            )
            }
            <div className='flex items-center justify-between px-[30px]'>
                <h1 className='text-center font-bold transition-all dark:text-blue-500 duration-500 text-blue-500'>{t("users")}: {filteredData.length}</h1>
                <svg onClick={() => setAddModal(true)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7 cursor-pointer text-blue-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                </svg>
            </div>
            <div className='dark:bg-gray-900 transition-all duration-500 bg-gray-300 p-[25px] mt-[15px] rounded-[12px]'>
                <div className='flex items-center'>
                    <input
                        type="search"
                        placeholder={t("search")}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className='p-[10px] pl-[35px] outline-none dark:text-white dark:border-gray-900 focus:border-blue-500 transition-all duration-500 rounded-[8px] w-full placeholder:text-gray-400 bg-gray-200 dark:bg-gray-950 border border-gray-300'
                    />
                    <button className='absolute pl-[10px]'>{searchIcon}</button>
                </div>
                <Suspense fallback={<LazyLoader />}>
                    <UserList data={data} search={search} />
                </Suspense>

            </div>
        </div >
    )
}

export default Users