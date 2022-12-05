import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import { HiMenuAlt2 } from 'react-icons/hi'
import { AiOutlineUsergroupAdd} from 'react-icons/ai'
import { MdOutlineReportGmailerrorred, MdDashboard } from 'react-icons/md'

function AdminSidebar() {

    const navigate = useNavigate()

    useEffect(()=>{
        const token = localStorage.getItem('AdminToken')
        if(!token){
            navigate('/adminlogin')
        }
    })

    const Logout = () => {
        confirmAlert({
            title: 'Approve Application',
            message: "Are you sure to Approve this Application",
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        localStorage.removeItem('AdminToken')
                        navigate('/adminlogin')
    
                    }
    
                },
                {
                    label: 'No'
                }
    
    
            ]
        });
    }


  const menus = [
    { name: "Dashboard", link: '/admindashboard', icon:MdDashboard},
    { name: "User Managemnt", link: '/usermanagement', icon:AiOutlineUsergroupAdd  },
    { name: "Report Post", link: '/reportpost', icon: MdOutlineReportGmailerrorred },
    // { name: "Logoutt", link:'/adminlogin' , icon: MdOutlineReportGmailerrorred },
    
];

const [open, setOpen] = useState(true);




  return (
    <section className={`flex gap-6 ${open ? 'w-72' : 'w-16'}`}>
            <div className={`bg-[#0e0e0e] min-h-screen fixed ${open ? 'w-72' : 'w-16'}
            duration-500 text-gray-100 px-4`}>

                <div className='py-3 flex justify-end'>
                    <HiMenuAlt2
                        size={26} className="cursor-pointer"
                        onClick={() => setOpen(!open)} />
                </div>

                <div className='mt-4 flex flex-col gap-4 relative'>
                    {menus?.map((menu, i) => (
                        <Link
                            to={menu?.link}
                            key={i}
                            className={` ${menu?.margin && "mt-5"
                                } group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 
                             rounded-md`}>

                            <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                            <h2
                                style={{
                                    transitionDelay: `${i + 3}00ms`,
                                }}
                                className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"
                                    } `}>
                                {menu?.name}
                            </h2>
                            <h2
                                className={`${open && "hidden"
                                    } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 
                                rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 
                                group-hover:py-1 group-hover:left-14 group-hover:duration-300 
                                group-hover:w-fit`}>
                                {menu?.name}
                            </h2>
                            {/* {menu.name == 'Logoutt'? <div className="md:text-3xl lg:text-2xl" >onclick={Logout}asdfghbngfdsdfghgfrdefg</div> :null
                           } */}
                            
                        </Link>
                    ))}
                </div>
                <button onClick={Logout} className="bg-red-500 hover:bg-red-900 text-white font-bold py-2 px-4 rounded-full mt-5 mr-14">
                    LogOut
                </button>
            </div>
        </section>
  )
}

export default AdminSidebar