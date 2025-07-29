import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Api } from '../config/api';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';

const Users = () => {
    const { t, i18n } = useTranslation();
    const [data, setData] = useState([]);
    const [addModal, setAddModal] = useState(false);
    const formik = useFormik({
        initialValues: {
            Images: "",
            Name: "",
            Description: ""
        },
        onSubmit: async (values, { resetForm }) => {
            const formData = new FormData();
            formData.append("name", values.Name);
            formData.append("description", values.Description);
            formData.append("images", values.Images);
            try {
                await axios.post(Api, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                })
                get();
                resetForm();
                setAddModal(false);
            } catch (error) {
                console.error(error);
            }
        }
    })
    const handleChangeFile = (event) => {
        formik.setFieldValue("Images", event.target.files[0])
    }
    async function get() {
        try {
            const { data } = await axios.get(Api);
            setData(data.data);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        get()
    }, [])
    return (
        <div className='dark:bg-gray-950 min-h-[90vh] p-[25px] bg-gray-200 transition-all duration-500'>
            <svg onClick={() => setAddModal(true)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer text-blue-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
            </svg>
            {addModal && (
                <div
                    className='fixed inset-0 bg-black/30 flex items-center justify-center backdrop-blur-[5px]'>
                    <form className='flex flex-col gap-[5px] w-[85%] transition-all duration-500 dark:bg-gray-900 bg-gray-200 p-[20px] rounded-[12px]' onSubmit={formik.handleSubmit} action="">
                        <input
                            type="text"
                            value={formik.values.Name}
                            name='Name'
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            placeholder={t("namePlcHld")}
                            className='bg-white dark:bg-gray-950 placeholder:text-gray-400 transition-all duration-500 dark:border-gray-900 border border-gray-200 p-[5px] rounded-[5px]'
                        />
                        <input
                            type="text"
                            value={formik.values.Description}
                            name='Description'
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            className='bg-white dark:bg-gray-950 placeholder:text-gray-400 transition-all duration-500 dark:border-gray-900 border border-gray-200 p-[5px] rounded-[5px]'
                            placeholder={t("descPlcHld")}
                        />
                        <label className="bg-white dark:bg-gray-950 text-gray-400 transition-all duration-500 dark:border-gray-900 border border-gray-200 p-[5px] rounded-[5px] cursor-pointer inline-block">
                            {t("imgInp")}
                            <input
                                type="file"
                                name="Images"
                                onChange={handleChangeFile}
                                className="hidden"
                            />
                        </label>
                        <button className='bg-blue-500 border text-white dark:border-gray-900 transition-all duration-500 border-gray-200 p-[5px] rounded-[5px]'
                            type="submit">{t("addUser")}</button>
                    </form>
                </div>
            )}
            <h1 className='text-center font-bold transition-all dark:text-blue-500 duration-500 text-blue-500 pt-[10px]'>{t("users")}: {data.length}</h1>
            <div className='dark:bg-gray-900 transition-all duration-500 bg-gray-300 p-[25px] mt-[50px] rounded-[12px]'>
                <div className='flex flex-col h-[350px] lg:h-[500px] transition-all duration-500 overflow-scroll rounded-[8px] bg-gray-300 dark:bg-gray-900 gap-[5px]'>
                    {data.map((e) => {
                        return (
                            <div className='p-[10px] dark:border-none transition-all duration-500 rounded-[8px] bg-gray-200 dark:bg-gray-950'>
                                <Link to={`/UserById/${e.id}`}>
                                    <h1 className='transition-all duration-500 text-blue-400'>{e.name}</h1>
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Users