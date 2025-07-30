import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { Api, ApiAddImg, ApiComplete, ApiImageDelete, ApiImages } from '../config/api';
import { Carousel } from 'antd';
import { Formik, useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
const UserById = () => {
    const { t, i18n } = useTranslation()
    const [data, setData] = useState(null);
    const [successDeleted, setSuccessDeleted] = useState(false);
    const { id } = useParams();
    async function get() {
        try {
            const { data } = await axios.get(`${Api}/${id}`);
            setData(data);
        } catch (error) {
            console.error(error);
        }
    }
    async function delUser(id) {
        try {
            await axios.delete(`${Api}/${id}`);
            setData(null);
            setTimeout(() => {
                setSuccessDeleted(true);
            }, 1000);
        } catch (error) {
            console.error(error);
        }
    }

    const formik = useFormik({
        initialValues: {
            Images: null
        },
        onSubmit: async (values, { resetForm }) => {
            const formData = new FormData();
            formData.append("Images", values.Images);

            try {
                await axios.post(`${ApiAddImg}/${id}/images`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });

                formik.setFieldValue("Images", null);
            } catch (err) {
                console.error("Ошибка загрузки", err);
            }
        },
    });


    const handleChangeFile = (event) => {
        formik.setFieldValue("Images", event.target.files[0]);
    }
    useEffect(() => {
        get()
    }, [])
    return (
        <div className='min-h-[80vh] flex flex-col gap-[10px] items-center justify-center transition-all duration-500 dark:bg-gray-950'>
            {successDeleted && (
                <div className='flex flex-col dark:bg-gray-900 bg-gray-200 duration-500 transition-all shadow-2xl p-[12px] rounded-[12px] text-center gap-[10px]'>
                    <div className='flex items-center gap-[5px] justify-center'>
                        <h1 className='text-[20px] text-green-500'>{t("successDelete")}</h1>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 text-green-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                    </div>
                    <Link to={'/users'}>
                        <button className='bg-gray-300 transition-all duration-500 text-gray-950 dark:text-gray-200 cursor-pointer dark:bg-gray-950 py-[5px] px-[10px] rounded-[5px]'>{t("buttonPerekhod")}</button>
                    </Link>
                </div>
            )}
            {data && (
                <article key={data.id} className='flex shadow-2xl flex-col gap-[5px] p-[10px] lg:mt-[0px] mt-[-40px] lg:gap-[10px] transition-all duration-500 items-center bg-gray-300 dark:bg-gray-900 lg:w-[55%] rounded-[12px] justify-center'>
                    <h1 className='font-bold text-blue-600 transition-all duration-500'>{data.Name}</h1>
                    <Carousel Carousel autoplay dots className='w-[250px] rounded-[8px] lg:w-[500px]'>
                        <div>
                            <img className='w-[100%] object-cover mb-[20px] transition-all duration-500 rounded-[8px] h-[300px] lg:h-[300px]' src={`${data.Images}`} alt="" />
                        </div>
                    </Carousel >
                    <div className='flex items-center lg:flex-row flex-col gap-[5px] font-[500] text-[16px]'>
                        <h1 className='text-gray-500'>{data.id}</h1>
                        <h1 className='text-blue-500 lg:border-x-[2px] border-blue-500 px-[5px]'>{data.Description}</h1>
                        <h1 className={`${data.isCompleted ? 'text-green-500 transition-all duration-500' : 'text-red-500 transition-all duration-500'}`}>{data.isCompleted ? t("active") : t("inactive")}</h1>
                    </div>
                </article>
            )}
            {data && (
                <div className='flex items-center dark:bg-gray-900 transition-all duration-500 bg-gray-300 shadow-2xl p-[8px] rounded-[8px] lg:gap-[50px] gap-[30px]'>
                    <svg onClick={() => delUser(data.id)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-red-500 cursor-pointer">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                </div>
            )}
        </div>
    )
}

export default UserById