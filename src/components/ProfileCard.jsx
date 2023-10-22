import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import {NoProfile} from '../asset';
import {LiaEditSolid} from 'react-icons/lia';
import { updateProfile } from '../redux/userSlics';
import { BsBriefcase, BsGithub, BsLinkedin, BsPersonFillAdd, BsTwitter } from 'react-icons/bs';
import {CiLocationOn} from 'react-icons/ci';
import moment from "moment"

const ProfileCard = ({user}) => {
    const { user: data , edit} = useSelector((state) => state.user);
    const dispatch = useDispatch();
  return (
    <div>
      <div className='w-full bg-primary flex flex-col items-center shadow-sm
      rounded-xl px-6 py-4'>
      <div className='w-full flex items-center justify-between border-b
      pb-5 border-[#66666645]'>
        <Link to={"/profile/" + user?._id} className='flex gap-2'>
            <img src={user?.profileUrl ?? NoProfile} alt ={user?.email } 
                className='w-14 h-14 object-cover'
            />

            <div className='flex flex-col justify-center'>
                <p classname= 'text-lg font-medium text-ascent-1'>
                    {user?.firstName} {user?.lastName}
                </p>

                <span className='text-ascent-2'>
                {user?.profession ?? "No Profession" }</span>
            </div>
        </Link>

        <div className=''>
          {user?._id === data?._id ? ( <LiaEditSolid
            size = {22}
            classname="text-blue cursor-pointer"
            onClick = {() => dispatch(updateProfile(true))}
            /> ) :
            (
              <button className='bg-[0444a430] text-sm text-white p-1 rounded'
              onClick={() => {}}>
                <BsPersonFillAdd size={20} className='text-[#0f52b6]'/>
              </button>
            )
          }
        </div>

         
      </div>
      
      <div className='w-full flex flex-col gap-2 py-4 border-b border-[#66666645]'>
          
      
          <div className='flex gap-2 items-center text-ascent-2'>
            <CiLocationOn className="text-xl text-ascent-1"/>
            <span>{user?.location ?? "Add Location"}</span>
          </div>

          <div className='flex gap-2 items-center text-ascent-2'>
            <BsBriefcase className='text-lg text-ascent-1'/>
            <span>{user?.profession ?? "Add Profession"}</span>
          </div>

      </div>

          <div className='w-full flex flex-col gap-2 py-4 border-b border-[#66666645]'>
            <p className='text-xl text-ascent-1 font-semibold'>
              {user?.friends?.length} Friends
            </p>

            <div className='flex items-center justify-between'>

            <span className='text-ascent-2'>Who Viewed your Profile</span>
            <span className='text-ascent-1 text-lg'>
              {user?.views.length}
            </span>

           


            </div>
              <span className='text-base text-blue'>
                {user?.verified? "Verified Account" : "Not Verified"}
              </span>

              <div className='flex items-center justify-between'>
                <span className='text-ascent-1 text-base'>
                  {moment(user?.createAt).format('LT')}
                </span>
              </div>

          </div>

          <div className='w-full flex flex-col  gap-6 py-4 pb-6'>
            <p className='text-ascent-1 text-lg font-semibold' > 
            Socials -
            </p>

         

          <div className='flex gap-2 items-center text-ascent-2'>
            <a className='flex' href="https://github.com/sachinupadhyay268"><BsGithub className=' text-xl text-ascent-1'/> <span className='font-bold'> GITHUB</span> </a>
            
          </div>

          <div className='flex gap-2 items-center text-ascent-2'>
            <a className='flex' href="https://www.linkedin.com/in/sachin-upadhyay-b91443255/"><BsLinkedin className=' text-xl text-ascent-1'/><span  className='font-bold'> Linkdin</span></a>
            
          </div>

          <div className='flex gap-2 items-center text-ascent-2'>
            <a className='flex ' href="https://twitter.com/SachinUpad24473"><BsTwitter className=' text-xl text-ascent-1'/><span className='font-bold'> Twitter</span></a>
            
          </div>

          </div>

     </div>
   </div>
  )
}

export default ProfileCard
