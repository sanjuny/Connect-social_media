import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { addfollow, getSuggestionUser } from '../../../Api/UserApi/UserRequest'
import dummy from '../../../Images/dummy.jpg'


function RightBar() {

  /* ---------------------------- current userdata ---------------------------- */
  const userData = useSelector(state => state.user)
  console.log(userData, 'userdataaavgvhgavd');
  /* ---------------------------- current userdata ---------------------------- */


  /* ----------------------------- user Suggestion ---------------------------- */

  const [Sugge, setSugge] = useState([])
  const [State, setState] = useState(false)

  useEffect(() => {
    const getuser = async (e) => {
      // e.preventDefault()
      try {
        const { data } = await getSuggestionUser()
        console.log(data, 'suggestion user');
        setSugge(data)
      } catch (error) {
        console.log(error, 'catch error');
      }
    }
    getuser()
  }, [State])

  /* ----------------------------- user Suggestion ---------------------------- */

  /* ------------------------------- follow user ------------------------------ */


  const follow = async (id) => {
    // e.preventDefault()
    console.log("reached");
    try {
      const { data } = await addfollow(userData._id, id)
      console.log(data, 'follow log');
      setState(!State)
    } catch (error) {
      console.log(error, 'catch error');
    }
  }

  /* ------------------------------- follow user ------------------------------ */

  /* ------------------------------ unfollow user ----------------------------- */

  // const unfollow = async (id) => {
  //   try {
  //     const { data } = await unfollow(userData._id, id)
  //     console.log(data, 'unfollow log');
  //     setState(!State)
  //   } catch (error) {
  //     console.log(error, 'catch error errrr');

  //   }
  // }

  /* ------------------------------ unfollow user ----------------------------- */

  return (
    <>
      <div class="relative text-gray-600 flex justify-center ">
        <input  type="search" name="serch" placeholder="Search" class="bg-[#16181c] h-10 px-5 pr-10 w-full rounded-full text-sm focus:outline-none" />
      </div>
      <div className="w-2/5 h-12 position-relative ">
        <div style={{ maxWidth: '350px' }}>
          <div className="overflow-y-auto fixed  h-screen ">
            <div className="max-w-sm rounded-lg  bg-dim-700 overflow-hidden shadow-lg m-4 bg-[#1dbjc4n]">
              <div className="flex">
                <div className="flex-1 m-2">
                  <h2 className="px-4 py-2 text-xl w-48 font-semibold text-white">Who to follow
                  </h2>
                </div>
              </div>
              <hr className="border-gray-800" />
              {Sugge.map((obj) => {
                return (
                  userData._id !== obj._id &&
                  <div>
                    {!obj.followers.includes(userData._id) ?
                      <div className="flex flex-shrink-0">
                        <div className="flex-1 ">
                          <div className="flex items-center w-48">
                            <div>
                              <img className="inline-block h-10 w-auto rounded-full ml-4 mt-2"
                                src={dummy}
                                alt="" />
                            </div>
                            <div className="ml-3 mt-3">
                              <p className="text-base leading-6 font-medium text-white">
                                {obj.name}
                              </p>
                              <p
                                className="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                                @{obj.username}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex-1 px-4 py-2 m-2">
                          {obj.followers.includes(userData._id) ?
                            <button
                              className="bg-transparent hover:bg-gray-800 text-white font-semibold hover:text-white py-2 px-4 border border-white hover:border-transparent rounded-full"
                              onClick={() => follow(obj._id)}>
                              UnFollow
                            </button>

                            : <button
                              className="bg-transparent hover:bg-gray-800 text-white font-semibold hover:text-white py-2 px-4 border border-white hover:border-transparent rounded-full"
                              onClick={() => follow(obj._id)}
                            >
                              Follow
                            </button>
                          }
                        </div>
                      </div>

                      : ''
                    }
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </>



  )
}

export default RightBar