import React, { useEffect, useState } from 'react'
import { getusers, userBlock, userUnBlock } from '../../../Api/AdminUsermanagement'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

function UserManagement() {

  const [status, setStatus] = useState(true)
  const [form, setForm] = useState([])
 


  useEffect(() => {
    const getUse = async () => {
      try {
        const { data } = await getusers()
        console.log(data, 'userdata');
        setForm(data)
      } catch (error) {
        console.log(error, 'error');
      }
    }
    getUse()
  }, [status])


  const blockUser = async (userId) => {
    confirmAlert({
      title: 'Approve Application',
      message: "Are you sure to Approve this Application",
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            const { data } = await userBlock(userId)
            console.log(data, 'responseeeeeeeeeeeee');
            setStatus(!status)
          }
        },
        {
          label: 'No'
        }
      ]
    });

  }

  const unblockuser = async (userId) => {
    const { data } = await userUnBlock(userId)
    console.log(data, 'unblock console');
    setStatus(!status)
  }





  return (

    <>
      <div className="w-full my-2 py-2  px-5 overflow-x-auto sm:-mx-6 sm:px-6 lg:- pr-10 lg:px-8 flex justify-center">
        <div className="w-full align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-6  py-3 border-b-2 border-gray-300 leading-4 text-blue-500 tracking-wider">S.No</th>
                <th className="px-6  py-3 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">Fullname</th>
                <th className="px-6  py-3 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">Email</th>
                <th className="px-6  py-3 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">Phone</th>
                <th className="px-6  py-3 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {form.map((data, index) => {
                console.log(data, 'aasdfghjk');
                return (
                  <tr>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                      <div className="flex items-center">
                        <div>
                          <div className="text-base leading-5 text-black font-medium  text-center">{index + 1}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-center">
                      <div className="font-medium   leading-5 text-slate-900 ">{data.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-slate-900 leading-5 font-medium text-center">{data.email}</td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b text-slate-900 border-gray-500 font-medium  leading-5 text-center">{data.phone}</td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500  leading-5 text-center">
                      {
                        data.status == "active" ?
                          <button type="button" onClick={() => blockUser(data._id)} class="w-32 text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Block</button> :
                          <button type="button" onClick={() => unblockuser(data._id)} class=" w-32  text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">UnBlock</button>}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default UserManagement