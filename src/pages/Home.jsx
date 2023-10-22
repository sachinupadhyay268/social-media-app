import React, { useState } from 'react'
import {  useSelector } from 'react-redux'; 
import { TopBar,ProfileCard, CustomButton, TextInput, Loading } from '../components';
import {FriendsCard,PostCard}  from "../components"
import { suggest, requests, posts} from "../asset/data"
import { NoProfile } from '../asset';
import { Link } from 'react-router-dom';
import { BsFiletypeGif, BsPersonFillAdd } from 'react-icons/bs';
import {useForm} from "react-hook-form"
import { BiImages, BiSolidVideo } from 'react-icons/bi';



const Home = () => {
    const {user} = useSelector((state) => state.user)
    const [friendRequest,setFriendRequest] = useState(requests);
    const [suggestedFriends,setSuggestedFriends] = useState(suggest);

    const [errMsg , setErrMsg] = useState("")
    const [file,setFile] = useState(null);
    const [posting , setPosting] = useState(false);
    const [loading , setLoading] = useState(false);
    
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();

    const handlePostSubmit = async(data) => {}
   
    return(<div className='home w-full px-0 lg:px-10 pb-20 2xl:px-40 bg-bgColor
    lg:rounded-lg h-screen overflow-hidden '>
         <TopBar/>

         <div className='w-full flex gap-2 lg:gap-4 pt-5 pb-10 h-full'>
        
        
         {/* left */}
         <div className='hidden w-1/3 lg:w-1/4 h-full md:flex flex-col gap-6
         overflow-y-auto'>
            <ProfileCard user={user}/>
            <FriendsCard friends={user?.friends}/>
         </div>
        
        
        {/*center */}
         <div className='flex-1 h-full bg-primary px-4 flex flex-col gap-6
         overflow-y-auto rounded-lg'>

         <form
         
         onSubmit={handleSubmit(handlePostSubmit)}

          className='bg-primary px-4 rounded-lg'>

            <div className='w-full flex items-center gap-2 py-2 border-b border-[#66666645] '>

            <img
                src={user?.profileUrl ?? NoProfile}
                alt='User Image'
                className='w-14 h-14 rounded-full object-cover'
            />

            <TextInput
                styles ="w-full rounded-full py-5"
                placeholder = "Share your thoughts..."
                name = "description"
                register = {register("description", {
                    required : "Write something about your post",
                })}

                error = {errors.description ? errors.description.message : ""}
            />

            </div>

            {errMsg?.message && (
                <span 
                role='alert'
                className={`text-sm ${
                    errMsg?.status === "failed"
                    ? "text-[#f64949fe]"
                    : "text-[#2ba150fe]"
                } mt-0.5` }
                >
                {errMsg?.message}
                </span>
            )}

            <div className='flex items-center justify-between puy-4'>
            <label
             htmlFor="imgUpload"
             className='flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer'
             >
              
              <input 
              type='file'
              onChange={(e) =>setFile(e.target.files[0])}
              className='hidden'
              id='imgUpload'
              data-max-size = '5120'
              accept='.jpg, .png , .jpeg'
              />
             <BiImages/>
             <span>Image</span>

             </label>


                    {/* for uploading videos */}
            <label
             className='flex items-center gap-1 text-base text-ascent-2
             hover:text-ascent-1 cursor-pointer'
             htmlFor='videoUpload'
             >

             <input
              type='file'
              data-max-size='5120'
              onChange={(e) => setFile(e.target.files[0])}
              className='hidden'
              id='videoUpload'
              accept='.mp4, .wav'
              />
              <BiSolidVideo/>
              <span>Video</span>   
            </label>

                    {/* fir gif upload */}
            <label
             className='flex items-center gap-1 text-base text-ascent-2
             hover:text-ascent-1 cursor-pointer'
             htmlFor='vgifUpload'
             >

             <input
              type='file'
              data-max-size='5120'
              onChange={(e) => setFile(e.target.files[0])}
              className='hidden'
              id='vgifUpload'
              accept='.gif'
              />
              <BsFiletypeGif/>
              <span>Gif</span>   
            </label>

            <div>
            {posting ?  (
                <Loading/>
            ) : (
                <CustomButton
                    type='submit'
                    title = 'Post'
                    containerStyles= 'bg-[#0444a4] text-white py-1 px-6  rounded-full font-semibold text-sm'
                   
                />
            )}
            </div>
            </div>
         </form>

         <div>
            {loading ? (<Loading/>) : posts?. length > 0 ? (
                posts?.map((post) => (
                    <PostCard key={post?._id} post = {post}

                        user={user}
                        delete={() => {}}
                        likePost = {() => {}}
                    />
                ))

            ) : (
                <div className='flex w-full h-full items-center justify-center'>
                    <p className='text-lg text-ascent-2'>No Post Available</p>
                </div>
            )}
         </div>
         </div>
         
         {/*right */}
         <div className='hidden w-1/4 h-full lg:flex flex-col gap-8
         overflow-y-auto'>

            {/*friend request */}
            <div className='w-full bg-primary shadow-sm rounded-lg px-6 py-5 '>

                <div className='flex items-center justify-between text-xl text-ascent-1
                pb-2 border-b border-[#66666650]'>

                <span>Friend Request</span>
                <span>{friendRequest?.length}</span>

                </div>

                <div className='w-full flex flex-col gap-4 pt-4'>
                {friendRequest &&
                
                friendRequest.map((request) => (
                    
                    <div key={request?._id} className="flex items-center justify-between">
                
                    <Link to={`/profile/${request?.from?._id}`} className="w-full flex gap-4 items-center cursor-pointer">
                
                        <img src={request?.from?.profileUrl ?? NoProfile} alt={request?.from?.firstName} className="w-10 h-10 object-cover rounded-full" />
                
                        <div className='flex-1'>
                
                        <p className='text-base font-medium text-ascent-1'>
                
                            {request?.from?.firstName} {request?.from?.lastName}
                
                        </p>
                
                        <span className='text-sm text-ascent-2'>
                
                            {request?.from?.profession ?? "Software Developer"}
                
                        </span>
                        </div>
                
                    </Link>
                
                    <div className='flex gap-1'>
                        <CustomButton
                        title='Accept'
                        containerStyles="bg-[#0444a4] text-xs text-white px-1.5 rounded-full py-1"
                        />
                        <CustomButton
                        title='Deny'
                        containerStyles="bg-[#555560] text-xs text-white px-1.5 rounded-full py-1"
                        />
                    </div>
                    </div>
                ))}



                </div>
            </div>

            {/* friends suggestion */}
            <div className='w-full bg-primary shadow-sm rounded-lg px-5 py-5'>
                <div className='flex items-center justify-between text-lg text-ascent-1 border-b border-[#55555555]'>
                    <span>Suggestions</span>
                </div>

                <div className='w-full flex flex-col gap-4 pt-4 '>
                    {
                        suggestedFriends?.map((friend) =>(
                            <div className='flex items-center justify-between'
                            key={friend._id}
                            >
                                
                                <Link
                                to={"/profile/" + friend?._id}
                                key={friend?._id}
                                className='w-full flex gap-4 items-center cursor-pointer'
                                >
                                <img
                                    src={friend?.profileUrl ?? NoProfile}
                                    alt={friend?.firstName}
                                    className='w-10 h-10 object-cover rounded-full'
                                />

                                <div className='flex-1'>
                                    <p className='text-base font-medium text-ascent-1'>
                                        {friend?.firstName} {friend?.lastName}
                                    </p>
                                    <span className='text-sm text-ascent-2'>
                                        {friend?.profession ?? "Data Scientist"}
                                    </span>
                                </div>
                                </Link>

                                {/* BUTTON */}

                                <div className='flex gap-1'>
                                    <button
                                    className='bg-[#0444a430] text-sm text-white p-1 rounded'
                                    onClick={() =>{}}
                                    >
                                    <BsPersonFillAdd size ={20} className='text-[#0f52b6]'/>    
                                    </button>
                                </div>
                            </div>
                        ) )
                    }
                </div>

            </div>
         </div>

      </div>
    </div>
)}

export default Home
