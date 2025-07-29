import React, { useEffect, useState, Suspense } from 'react'
import axios from 'axios'
import { Api } from '../config/api';
import { useFormik } from 'formik';
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
        e.name.toLowerCase().trim().includes(search.toLowerCase().trim())
    );
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
                            className='py-[5px] px-[10px] outline-none dark:text-white dark:border-gray-900 focus:border-blue-500 transition-all duration-500 rounded-[8px] w-full placeholder:text-gray-400 bg-gray-200 dark:bg-gray-950 border border-gray-300'
                        />
                        <input
                            type="text"
                            value={formik.values.Description}
                            name='Description'
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            className='py-[5px] px-[10px] outline-none dark:text-white dark:border-gray-900 focus:border-blue-500 transition-all duration-500 rounded-[8px] w-full placeholder:text-gray-400 bg-gray-200 dark:bg-gray-950 border border-gray-300'
                            placeholder={t("descPlcHld")}
                        />
                        <label
                            className='py-[5px] px-[10px] outline-none dark:text-gray-400 dark:border-gray-900 focus:border-blue-500 transition-all duration-500 rounded-[8px] w-full placeholder:text-gray-400 bg-gray-200 dark:bg-gray-950 border border-gray-300'
                        >
                            {t("imgInp")}
                            <input
                                type="file"
                                name="Images"
                                onChange={handleChangeFile}
                                className="hidden"
                            />
                        </label>
                        <button className='bg-blue-500 border text-white dark:border-gray-900 transition-all duration-500 border-gray-200 py-[5px] px-[10px] rounded-[10px]'
                            type="submit">{t("addUser")}</button>
                    </form>
                </div>
            )}
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
        </div>
    )
}

export default Users