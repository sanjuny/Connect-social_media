import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { Signup } from '../../../Api/UserRequest';
import image from '../../../Images/logowhite.png'

function UserSignup() {

  const intialValues = {name:'', email:'', phone:'', password:'', confirmpassword:''};
  const [formvalues, setformvalues] = useState(intialValues);
  const navigate = useNavigate()

  const handlechange = (e) =>{
    const{name, value} = e.target;
    setformvalues({...formvalues,[name]: value})
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
      const {data} = await Signup(formvalues)
      console.log(data);
      navigate('/login')
    } catch (error) {
      console.log(error,'error');
    }   
}


  return (
    <body>
      <section class="min-h-screen flex items-stretch text-white ">
        <div class="lg:flex w-1/2 bg-black bg-no-repeat bg-cover relative flex justify-center items-center">
          <div class="absolute opacity-60 inset-0 z-0"></div>
          <div>
            <img src={image} style={{ height: '200px' }}></img>
          </div>
        </div>
        <div class="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0" style={{ backgroundColor: "black" }} >
          <div class="absolute lg:hidden z-10 inset-0 bg-gray-500 bg-no-repeat bg-cover items-center"  >
            <div class="absolute bg-black opacity-60 inset-0 z-0"></div>
          </div>
          <div class="w-full py-6 z-20">
            <p class="text-gray-100 text-3xl ">
              SIGNUP FORM
            </p>
            <br/>
            <form class="sm:w-2/3 w-full px-4 lg:px-0 mx-auto" onSubmit={handleSubmit}>
              <div class="pb-2 pt-4  mb-2">
                <input type="name" name="name" id="name" placeholder="Name" class=" border-b border-b-white focus:outline-none block w-full p-4 text-lg rounded-sm bg-black" value={formvalues.name} onChange={handlechange} />
              </div>
              <div class="pb-2 pt-4  mb-2">
                <input type="email" name="email" id="email" placeholder="Email" class=" border-b border-b-white focus:outline-none block w-full p-4 text-lg rounded-smborder-4 bg-black " value={formvalues.email} onChange={handlechange} />
              </div>
              <div class="pb-2 pt-4   mb-2">
                <input type="number" name="phone" id="phone" placeholder="Phone" class=" border-b border-b-white focus:outline-none block w-full p-4 text-lg rounded-sm bg-black" value={formvalues.phone} onChange={handlechange} />
              </div>
              <div class="pb-2  pt-4  mb-2">
                <input type="text" name="password" id="password" placeholder="Password" class=" border-b border-b-white focus:outline-none block w-full p-4 text-lg rounded-sm bg-black" value={formvalues.password} onChange={handlechange} />
              </div>
              <div class="pb-2 pt-4  mb-2">
                <input type="text" name="confirmpassword" id="confirm Password" placeholder="Confirm Password" class=" border-b border-b-white focus:outline-none block w-full p-4 text-lg rounded-sm bg-black" value={formvalues.confirmpassword} onChange={handlechange} />
              </div>
              <div class="px-4 pb-2 pt-4 ">
                <button class="uppercase block w-full p-4 text-lg rounded-full bg-indigo-500 hover:bg-indigo-600 focus:outline-none">sign up</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </body>
  )
}

export default UserSignup