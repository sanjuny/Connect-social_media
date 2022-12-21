import React, { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addfollow, findSearch, getSuggestionUser } from '../../../Api/UserApi/UserRequest'
import dummy from '../../../Images/dummy.jpg'
import { UserUpdation } from '../../../UserContext/userContext'


function RightBar() {

  /* ---------------------------- current userdata ---------------------------- */
  const userData = useSelector(state => state.user)
  console.log(userData, 'userdataaavgvhgavd');
  /* ---------------------------- current userdata ---------------------------- */

  const { profileUpdate, setProfileUpdate } = useContext(UserUpdation)
  const { feedsUpdate, setfeedsUpdate } = useContext(UserUpdation)


  /* ----------------------------- user Suggestion ---------------------------- */

  const [Sugge, setSugge] = useState([])
  const [State, setState] = useState(false)


  useEffect(() => {
    const getuser = async (e) => {
      try {
        const { data } = await getSuggestionUser()
        console.log(data, 'suggestion user');
        setSugge(data)
      } catch (error) {
        console.log(error, 'catch error');
      }
    }
    getuser()
  }, [State, profileUpdate])

  /* ----------------------------- user Suggestion ---------------------------- */

  /* ------------------------------ SEARCH USERS ------------------------------ */

  const [serachUser, setSearchUser] = useState([])

  const handleSearch = async (e) => {
    const val = e.target.value
    if (val == '') {
      setSearchUser([])
    }
    try {
      const { data } = await findSearch(val)
      console.log(data, 'jjjjjj');
      setSearchUser(data)
    } catch (error) {
      console.log(error);
    }
  }

  /* ------------------------------- follow user ------------------------------ */


  const follow = async (id) => {
    console.log("reached");
    try {
      const { data } = await addfollow(userData._id, id)
      console.log(data, 'follow log');
      setState(!State)
      setfeedsUpdate(!feedsUpdate)
    } catch (error) {
      console.log(error, 'catch error');
    }
  }

  /* ------------------------------- follow user ------------------------------ */



  return (
    <>
      <div class="relative text-gray-600 flex justify-center ">
        <input type="search" name="search" onChange={handleSearch} placeholder="Search" class="bg-[#16181c] h-10 px-5 pr-10 w-full rounded-full text-sm focus:outline-none" required />
      </div>
      {serachUser.length !== 0 ?
        serachUser.map((user) => (
          <div>
            <Link to={`/profile/${user.username}`}>
              <a class="flex items-center px-3 py-2 text-sm transition duration-150  ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none">
                <img class="object-cover w-10 h-10 rounded-full"
                // src={user?.profilePic? PF+user.profilePic :profile} alt="username"
                />
                <div class="w-full pb-2">
                  <div class="flex justify-between">
                    <span class="block ml-2 font-semibold text-gray-600">{user.username}</span>
                  </div>
                  {/* <span class="block ml-2 text-sm text-gray-400">{user.accountType}</span> */}
                </div>
              </a></Link>

          </div>
        ))
        : null}
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
                        <Link to={`/profile/${obj.username}`} className="flex-1 ">
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
                        </Link>
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