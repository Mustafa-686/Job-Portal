// import React from 'react'
// import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
// import { Button } from '../ui/button'
// import { Avatar, AvatarImage } from '../ui/avatar'
// import { LogOut, User2 } from 'lucide-react'
// import { Link, useNavigate } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'
// import axios from 'axios'
// import { USER_API_END_POINT } from '@/utils/constant'
// import { setUser } from '@/redux/authSlice'
// import { toast } from 'sonner'

// const Navbar = () => {
//     const { user } = useSelector(store => store.auth);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const logoutHandler = async () => {
//         try {
//             const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
//             if (res.data.success) {
//                 dispatch(setUser(null));
//                 navigate("/");
//                 toast.success(res.data.message);
//             }
//         } catch (error) {
//             console.log(error);
//             toast.error(error.response.data.message);
//         }
//     }
//     return (
//         <div className='bg-white'>
//             <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
//                 {/* <div>
//                     <h1 className='text-2xl font-bold'>Job<span className='text-[#F83002]'>Portal</span></h1>
//                 </div> */}
//                 <div>
//   <h1 className='text-2xl font-bold'>
//     Job <span className='text-[#2563EB]'>Portal</span>
//   </h1>
// </div>

//                 <div className='flex items-center gap-12'>
//                     <ul className='flex font-medium items-center gap-5'>
//                         {
//                             user && user.role === 'recruiter' ? (
//                                 <>
//                                     <li><Link to="/admin/companies">Companies</Link></li>
//                                     <li><Link to="/admin/jobs">Jobs</Link></li>
//                                 </>
//                             ) : (
//                                 <>
//                                     <li><Link to="/">Home</Link></li>
//                                     <li><Link to="/jobs">Jobs</Link></li>
//                                     <li><Link to="/browse">Browse</Link></li>
//                                 </>
//                             )
//                         }


//                     </ul>
//                     {
//                         !user ? (
//                             <div className='flex items-center gap-2'>
//                                 <Link to="/login"><Button variant="outline">Login</Button></Link>
//                                 <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">Signup</Button></Link>
//                             </div>
//                         ) : (
//                             <Popover>
//                                 <PopoverTrigger asChild>
//                                     <Avatar className="cursor-pointer">
//                                         <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
//                                     </Avatar>
//                                 </PopoverTrigger>
//                                 <PopoverContent className="w-80">
//                                     <div className=''>
//                                         <div className='flex gap-2 space-y-2'>
//                                             <Avatar className="cursor-pointer">
//                                                 <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
//                                             </Avatar>
//                                             <div>
//                                                 <h4 className='font-medium'>{user?.fullname}</h4>
//                                                 <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
//                                             </div>
//                                         </div>
//                                         <div className='flex flex-col my-2 text-gray-600'>
//                                             {
//                                                 user && user.role === 'student' && (
//                                                     <div className='flex w-fit items-center gap-2 cursor-pointer'>
//                                                         <User2 />
//                                                         <Button variant="link"> <Link to="/profile">View Profile</Link></Button>
//                                                     </div>
//                                                 )
//                                             }

//                                             <div className='flex w-fit items-center gap-2 cursor-pointer'>
//                                                 <LogOut />
//                                                 <Button onClick={logoutHandler} variant="link">Logout</Button>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </PopoverContent>
//                             </Popover>
//                         )
//                     }

//                 </div>
//             </div>

//         </div>
//     )
// }

// export default Navbar



import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { LogOut, User2 } from 'lucide-react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const Navbar = () => {
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  }

  const navLinkStyle = ({ isActive }) =>
    isActive ? "text-blue-600 font-semibold transition-all" : "hover:text-blue-600 transition-all";

  return (
    <header className='bg-[#FFFDF6] shadow-sm border-b sticky top-0 z-50'>
      <div className='flex items-center justify-between max-w-7xl mx-auto h-16 px-4'>
        {/* Logo */}
        <Link to="/" className='text-2xl font-extrabold tracking-tight text-gray-900'>
          Job <span className='text-blue-600'>Portal</span>
        </Link>

        {/* Navigation Links */}
        <nav className='flex items-center gap-10'>
          <ul className='flex font-medium items-center gap-6 text-gray-700'>
            {
              user && user.role === 'recruiter' ? (
                <>
                  <li><NavLink to="/admin/companies" className={navLinkStyle}>Companies</NavLink></li>
                  <li><NavLink to="/admin/jobs" className={navLinkStyle}>Jobs</NavLink></li>
                </>
              ) : (
                <>
                  <li><NavLink to="/" className={navLinkStyle}>Home</NavLink></li>
                  <li><NavLink to="/jobs" className={navLinkStyle}>Jobs</NavLink></li>
                  <li><NavLink to="/browse" className={navLinkStyle}>Browse</NavLink></li>
                </>
              )
            }
          </ul>

          {/* User Area */}
          {
            !user ? (
              <div className='flex items-center gap-3'>
                <Link to="/login">
                  <Button variant="ghost" className='hover:text-blue-600 transition-all'>Login</Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white transition-all">Signup</Button>
                </Link>
              </div>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                    <AvatarFallback>{user?.fullname?.[0]}</AvatarFallback>
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className='space-y-2'>
                    <div className='flex gap-3 items-center'>
                      <Avatar>
                        <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                        <AvatarFallback>{user?.fullname?.[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className='font-medium'>{user?.fullname}</h4>
                        <p className='text-sm text-muted-foreground'>{user?.profile?.bio || "No bio available"}</p>
                      </div>
                    </div>

                    <div className='flex flex-col gap-2 text-gray-700 mt-3'>
                      {
                        user.role === 'student' && (
                          <Link to="/profile" className='flex items-center gap-2 hover:text-blue-600 transition-all'>
                            <User2 size={18} />
                            <span>View Profile</span>
                          </Link>
                        )
                      }

                      <button
                        onClick={logoutHandler}
                        className='flex items-center gap-2 text-left hover:text-red-600 transition-all'
                      >
                        <LogOut size={18} />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            )
          }
        </nav>
      </div>
    </header>
  )
}

export default Navbar
