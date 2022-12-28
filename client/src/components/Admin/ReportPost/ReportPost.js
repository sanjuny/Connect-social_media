import React, { useEffect, useState } from 'react'
import { blockUserpost, fetchReportedPost, getReportDetails, UnblockUserpost } from '../../../Api/AdminApi/AdminUsermanagement'
import moment from "moment"
import { toast } from 'react-toastify';

function ReportPost() {

  const [posts, setPosts] = useState([])
  const [open, setOpen] = useState(false)
  const [modalData, setModaldata] = useState({})
  const [reportData, setReportData] = useState([])
  const [update, setUpdate] = useState(true)
  const closeMODAl = () => {
    setOpen(false)
  }



  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await fetchReportedPost()
        console.log(data, 'fetchpost');
        setPosts(data)
        console.log('jiiiid');
      } catch (error) {
        console.log(error, 'eroorrr');
      }
    }
    fetchPost()
  }, [update])



  // handle modal view


  const handleview = async (items) => {
    setModaldata(items)
    try {
      const { data } = await getReportDetails(items?._id)
      console.log(data, 'jsjjsjsjsjsjsjssjs');
      setReportData(data)
      setOpen(true)
    } catch (error) {
      console.log(error, 'errror');
    }
  }
  // handle block post

  const handleBlockPost = async (postId) => {
    try {
      const { data } = await blockUserpost(postId)
      console.log(data, 'handleblockpost');
      setOpen(false)
      setUpdate(!update)
      toast.error('The post is blocked!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.log(error, 'erorrrrr');
    }
  }

  // handle unblock post

  const handleUnblockPost = async (postId) => {
    try {
      const { data } = await UnblockUserpost(postId)
      console.log(data, 'handleununblockpost');
      setOpen(false)
      setUpdate(!update)
      toast.success('The post is Unblocked!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      
    } catch (error) {
      console.log(error, 'erorrrrr');
    }
  }

  console.log(update, 'updateeeeeeeeeee');

  return (
    <>
      <div className=" w-full my-2 py-2  px-5 overflow-x-auto sm:-mx-6 sm:px-6 lg:- pr-10 lg:px-8 flex justify-center">
        <div className="w-full align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-6  py-3 border-b-2 border-gray-300 leading-4 text-blue-500 tracking-wider">S.No</th>
                <th className="px-6  py-3 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">PostID</th>
                <th className="px-6  py-3 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">Description</th>
                <th className="px-6  py-3 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {posts.map((items, index) => {
                return (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                      <div className="flex items-center">
                        <div>
                          <div className="text-base leading-5 text-black font-medium  text-center">{index + 1}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-center">
                      <div className="font-medium   leading-5 text-slate-900" >{items?._id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b text-slate-900 border-gray-500 font-medium  leading-5 text-center">{items.description}</td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500  leading-5 text-center">
                      <button type="button" onClick={() => handleview(items)} className="w-32 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-white dark:focus:ring-white font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">View</button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* modal */}
      {
        open && (
          <div className='flex justify-center'>
            <div class=" p-4 items-center justify-center w-[680px] rounded-xl group sm:flex space-x-6 bg-gray-500 bg-opacity-50 shadow-xl hover:rounded-2xl">
              {modalData?.image ?
                <img class="mx-auto  block w-4/12 h-40 rounded-lg max-w-lg transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0" alt="art cover" src={'/images/' + modalData.image} />
                : null}
              {reportData.map((data) => {
                let reportedOn = moment(data?.createdAt).format("YYYY-MM-DD")
                return (
                  <div class="sm:w-8/12 pl-0 p-5">
                    <button type="button" onClick={closeMODAl} className="float-right bg-whit rounded-md p-2 inline-flex items-center justify-center text-black hover:text-black hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black">
                      <span className="sr-only">Close menu</span>
                      <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                    <div class="space-y-2">
                      <div class="space-y-4">
                        <h4 class="text-md font-semibold text-cyan-900 text-justify">
                          Reported By : {data?.userId.username}
                        </h4>
                        <h4 class="text-md font-semibold text-cyan-900 text-justify">
                          Reason : {data?.reason}
                        </h4>
                        <h4 class="text-md font-semibold text-cyan-900 text-justify">
                          Reported At : {reportedOn}
                        </h4>
                      </div>
                      <div class="flex items-center space-x-4 justify-between">
                        <div class="text-grey-500 flex flex-row space-x-1  my-4">
                          <svg stroke="currentColor" fill="none" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12  0118 0z"></path></svg>
                          <p class="text-xs"></p>
                        </div>
                        <div class="flex flex-row space-x-1">
                          {
                            modalData?.status == 'active' ?
                              <div onClick={() => handleBlockPost(modalData?._id)}
                                class="bg-red-500 shadow-lg shadow- shadow-red-600 text-white cursor-pointer px-3 py-1 text-center justify-center items-center rounded-xl flex space-x-2 flex-row">
                                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" class="text-xl" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M885.9 490.3c3.6-12 5.4-24.4 5.4-37 0-28.3-9.3-55.5-26.1-77.7 3.6-12 5.4-24.4 5.4-37 0-28.3-9.3-55.5-26.1-77.7 3.6-12 5.4-24.4 5.4-37 0-51.6-30.7-98.1-78.3-118.4a66.1 66.1 0 0 0-26.5-5.4H144c-17.7 0-32 14.3-32 32v364c0 17.7 14.3 32 32 32h129.3l85.8 310.8C372.9 889 418.9 924 470.9 924c29.7 0 57.4-11.8 77.9-33.4 20.5-21.5 31-49.7 29.5-79.4l-6-122.9h239.9c12.1 0 23.9-3.2 34.3-9.3 40.4-23.5 65.5-66.1 65.5-111 0-28.3-9.3-55.5-26.1-77.7zM184 456V172h81v284h-81zm627.2 160.4H496.8l9.6 198.4c.6 11.9-4.7 23.1-14.6 30.5-6.1 4.5-13.6 6.8-21.1 6.7a44.28 44.28 0 0 1-42.2-32.3L329 459.2V172h415.4a56.85 56.85 0 0 1 33.6 51.8c0 9.7-2.3 18.9-6.9 27.3l-13.9 25.4 21.9 19a56.76 56.76 0 0 1 19.6 43c0 9.7-2.3 18.9-6.9 27.3l-13.9 25.4 21.9 19a56.76 56.76 0 0 1 19.6 43c0 9.7-2.3 18.9-6.9 27.3l-14 25.5 21.9 19a56.76 56.76 0 0 1 19.6 43c0 19.1-11 37.5-28.8 48.4z"></path></svg>
                                <span>Block</span>
                              </div>
                              :
                              <div onClick={() => handleUnblockPost(modalData?._id)}
                                class="bg-green-500 shadow-lg shadow- shadow-green-600 text-white cursor-pointer px-3 text-center justify-center items-center py-1 rounded-xl flex space-x-2 flex-row">
                                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" class="text-xl" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M885.9 533.7c16.8-22.2 26.1-49.4 26.1-77.7 0-44.9-25.1-87.4-65.5-111.1a67.67 67.67 0 0 0-34.3-9.3H572.4l6-122.9c1.4-29.7-9.1-57.9-29.5-79.4A106.62 106.62 0 0 0 471 99.9c-52 0-98 35-111.8 85.1l-85.9 311H144c-17.7 0-32 14.3-32 32v364c0 17.7 14.3 32 32 32h601.3c9.2 0 18.2-1.8 26.5-5.4 47.6-20.3 78.3-66.8 78.3-118.4 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7-.2-12.6-2-25.1-5.6-37.1zM184 852V568h81v284h-81zm636.4-353l-21.9 19 13.9 25.4a56.2 56.2 0 0 1 6.9 27.3c0 16.5-7.2 32.2-19.6 43l-21.9 19 13.9 25.4a56.2 56.2 0 0 1 6.9 27.3c0 16.5-7.2 32.2-19.6 43l-21.9 19 13.9 25.4a56.2 56.2 0 0 1 6.9 27.3c0 22.4-13.2 42.6-33.6 51.8H329V564.8l99.5-360.5a44.1 44.1 0 0 1 42.2-32.3c7.6 0 15.1 2.2 21.1 6.7 9.9 7.4 15.2 18.6 14.6 30.5l-9.6 198.4h314.4C829 418.5 840 436.9 840 456c0 16.5-7.2 32.1-19.6 43z"></path></svg>
                                <span>UnBlock</span>
                              </div>
                          }

                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )
      }
    </>
  )
}

export default ReportPost