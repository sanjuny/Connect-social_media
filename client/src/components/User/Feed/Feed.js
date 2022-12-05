import React from 'react'
import image from '../../../Images/messi.jpg'
import copa from '../../../Images/copa.jpg'
import { FaRegComment } from 'react-icons/fa'
import { FcLike } from 'react-icons/fc'



function Feed() {
    return (
        < >
            <div role="main">
                <div className="flex overflow-y-auto fixed  h-screen no-scrollbar" style={{ width: '990px' }}>
                    <div className="w-3/5 border border-y-0 border-gray-800" style={{ maxWidth: '600px' }}>
                        <div>
                            <div className="flex justify-start">
                                <div className="px-4 py-2 mx-2">
                                </div>
                                <div className="mx-2">
                                    <h2 className="mb-5 text-xl font-bold text-white">Home</h2>
                                </div>
                            </div>
                            <hr className="border-gray-800" />
                        </div>

                        {/* Feed/ */}

                        <ul className="list-none">
                            <li>
                                <div className="hover:bg-gray-800 transition duration-350 ease-in-out ">
                                    <div className="flex flex-shrink-0 p-4 pb-0">
                                        <div className="flex-shrink-0 group block">
                                            <div className="flex items-center">
                                                <div>
                                                    <img className="inline-block h-10 w-10 rounded-full"
                                                        src={image}
                                                        alt="" />
                                                </div>
                                                <div className="ml-3">
                                                    <p className="text-base leading-6 font-medium text-white">
                                                        Lionel Andrés Messi
                                                        <span
                                                            className="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                                                            @leo_messi . 1 day ago
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
                                                <img src={copa} style={{ height: 'auto', width: 'auto' }}></img>
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
                                                        src={image}
                                                        alt="" />
                                                </div>
                                                <div className="ml-3">
                                                    <p className="text-base leading-6 font-medium text-white">
                                                        Lionel Andrés Messi
                                                        <span
                                                            className="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                                                            @leo_messi . 1 day ago
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
                                                <img src={copa} style={{ height: 'auto', width: 'auto' }}></img>
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
                                                        src={image}
                                                        alt="" />
                                                </div>
                                                <div className="ml-3">
                                                    <p className="text-base leading-6 font-medium text-white">
                                                        Lionel Andrés Messi
                                                        <span
                                                            className="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                                                            @leo_messi . 1 day ago
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
                                                <img src={copa} style={{ height: 'auto', width: 'auto' }}></img>
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
                                                        src={image}
                                                        alt="" />
                                                </div>
                                                <div className="ml-3">
                                                    <p className="text-base leading-6 font-medium text-white">
                                                        Lionel Andrés Messi
                                                        <span
                                                            className="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                                                            @leo_messi . 1 day ago
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
                                                <img src={copa} style={{ height: 'auto', width: 'auto' }}></img>
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
                                                        src={image}
                                                        alt="" />
                                                </div>
                                                <div className="ml-3">
                                                    <p className="text-base leading-6 font-medium text-white">
                                                        Lionel Andrés Messi
                                                        <span
                                                            className="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                                                            @leo_messi . 1 day ago
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
                                                <img src={copa} style={{ height: 'auto', width: 'auto' }}></img>
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
                                                        src={image}
                                                        alt="" />
                                                </div>
                                                <div className="ml-3">
                                                    <p className="text-base leading-6 font-medium text-white">
                                                        Lionel Andrés Messi
                                                        <span
                                                            className="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                                                            @leo_messi . 1 day ago
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
                                                <img src={copa} style={{ height: 'auto', width: 'auto' }}></img>
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
                                                        src={image}
                                                        alt="" />
                                                </div>
                                                <div className="ml-3">
                                                    <p className="text-base leading-6 font-medium text-white">
                                                        Lionel Andrés Messi
                                                        <span
                                                            className="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                                                            @leo_messi . 1 day ago
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
                                                <img src={copa} style={{ height: 'auto', width: 'auto' }}></img>
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
            </div>
        </>
    )
}

export default Feed