import React from 'react'
import { BiArrowBack } from 'react-icons/bi'
import { FaRegComment } from 'react-icons/fa'
import { FcLike } from 'react-icons/fc'
import meone from '../../../Images/meone.jpg'
import metwo from '../../../Images/metwo.jpg'
import methree from '../../../Images/methree.jpg'
import mefour from '../../../Images/mefour.jpg'


function UserProfile() {
    return (
        <div className="flex overflow-y-auto fixed  h-screen no-scrollbar" style={{ width: '990px' }}>
            <div className="w-3/5 border border-y-0 border-gray-800" style={{ maxWidth: '600px' }}>
                <div>
                    <div className="flex justify-start">
                        <div className="px-4 py-0 mx-2">
                            <BiArrowBack className='w-7 h-7 text-white' />
                        </div>
                        <div className="mx-2">
                            <h2 className="mb-0 text-xl font-bold text-white">Sanjay</h2>
                            <p className="mb-0 w-48 text-xs text-gray-400">916 Photos & videos</p>
                        </div>
                    </div>
                    <hr className="border-gray-800" />
                </div>
                <div>
                    <div className="w-full bg-cover bg-no-repeat bg-center"
                        style={{ height: '200px', backgroundImage: `url(${metwo})` }}>
                        <img className="opacity-0 w-full h-full"
                            src={metwo} alt="" />
                    </div>
                    <div className="p-4">
                        <div className="relative flex w-full">
                            <div className="flex flex-1">
                                <div style={{ marginTop: '-96px' }}>
                                    <div style={{ height: '144px', width: '144px' }}
                                        className="md rounded-full relative avatar">
                                        <img style={{ height: '144px', width: '144px' }}
                                            className="md rounded-full relative border-4 border-gray-900"
                                            src={meone}
                                            alt="" />
                                        <div className="absolute"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col text-right">
                                <button
                                    className="flex justify-center  max-h-max whitespace-nowrap focus:outline-none  focus:ring   max-w-max border bg-transparent border-blue-500 text-blue-500 hover:border-blue-800 items-center hover:shadow-lg font-bold py-2 px-4 rounded-full mr-0 ml-auto">
                                    Edit Profile
                                </button>
                            </div>
                        </div>
                        <div className="space-y-1 justify-center w-full mt-3 ml-3">

                            <div>
                                <h2 className="text-xl leading-6 font-bold text-white">Sanjay</h2>
                                <p className="text-sm leading-5 font-medium text-gray-600">@sanjuny07</p>
                            </div>

                            <div className="mt-3">
                                <p className="text-white leading-tight mb-2">Vibe high the magic will unfold you.....</p>
                            </div>
                            <div
                                className="pt-3 flex justify-start items-start w-full divide-x divide-gray-800 divide-solid">
                                <div className="text-center pr-3"><span className="font-bold text-white">520</span><span
                                    className="text-gray-600"> Following</span></div>
                                <div className="text-center px-3"><span className="font-bold text-white">650
                                </span><span className="text-gray-600"> Followers</span></div>
                            </div>
                        </div>
                    </div>
                    <hr className="border-gray-800" />
                </div>
                <ul className="list-none">

                    <li>
                        <div className="hover:bg-gray-800 transition duration-350 ease-in-out ">
                            <div className="flex flex-shrink-0 p-4 pb-0">
                                <div className="flex-shrink-0 group block">
                                    <div className="flex items-center">
                                        <div>
                                            <img className="inline-block h-10 w-10 rounded-full"
                                                src={meone}
                                                alt="" />
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-base leading-6 font-medium text-white">
                                                Sanjay
                                                <span
                                                    className="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                                                    @sanjuny07 . 1 day ago
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="pl-16">
                                <p className="text-base width-auto font-medium text-white flex-shrink">
                                    I dreamed a lot about this day and thank God it came. I have no words
                                    to thank you for all the love.What a beautiful night enjoyed it so
                                    much. Unforgettable🇦🇷🇦🇷
                                    <a className="text-blue-400"> #CopaAmerica #Argentina</a>
                                </p>
                                <div className="md:flex-shrink pr-6 pt-3">
                                    <div className="bg-cover bg-no-repeat bg-center rounded-lg w-full h-64"
                                        style={{ height: 'auto' }}>
                                        <img src={methree} style={{ height: 'auto', width: 'auto' }}></img>
                                    </div>
                                </div>
                                <div className="flex gap-5 items-center py-4">
                                    <div className="flex items-center text-xs text-gray-400 hover:text-blue-400 transition duration-350 ease-in-out gap-3">
                                        <FaRegComment className='w-6 h-6' />12.5k
                                    </div>
                                    <div className="flex items-center text-xs text-gray-400 hover:text-red-800 transition duration-350 ease-in-out gap-3">
                                        <FcLike className='w-6 h-6' />10.5k
                                    </div>
                                </div>
                            </div>
                            <hr className="border-gray-800" />
                        </div>
                    </li>

                    <li>
                        <div className="hover:bg-gray-800 transition duration-350 ease-in-out ">
                            <div className="flex flex-shrink-0 p-4 pb-0">
                                <div className="flex-shrink-0 group block">
                                    <div className="flex items-center">
                                        <div>
                                            <img className="inline-block h-10 w-10 rounded-full"
                                                src={meone}
                                                alt="" />
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-base leading-6 font-medium text-white">
                                                Sanjay
                                                <span
                                                    className="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                                                    @sanjuny07 . 1 day ago
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="pl-16">
                                <p className="text-base width-auto font-medium text-white flex-shrink">
                                    I dreamed a lot about this day and thank God it came. I have no words
                                    to thank you for all the love.What a beautiful night enjoyed it so
                                    much. Unforgettable🇦🇷🇦🇷
                                    <a className="text-blue-400"> #CopaAmerica #Argentina</a>
                                </p>
                                <div className="md:flex-shrink pr-6 pt-3">
                                    <div className="bg-cover bg-no-repeat bg-center rounded-lg w-full h-64"
                                        style={{ height: 'auto' }}>
                                        <img src={mefour} style={{ height: 'auto', width: 'auto' }}></img>
                                    </div>
                                </div>
                                <div className="flex gap-5 items-center py-4">
                                    <div className="flex items-center text-xs text-gray-400 hover:text-blue-400 transition duration-350 ease-in-out gap-3">
                                        <FaRegComment className='w-6 h-6' />12.5k
                                    </div>
                                    <div className="flex items-center text-xs text-gray-400 hover:text-red-800 transition duration-350 ease-in-out gap-3">
                                        <FcLike className='w-6 h-6' />10.5k
                                    </div>
                                </div>
                            </div>
                            <hr className="border-gray-800" />
                        </div>
                    </li>
                </ul>
            </div>
        </div>


    )
}

export default UserProfile