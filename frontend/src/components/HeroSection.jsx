import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='text-center'>
            <div className='flex flex-col gap-5 my-10'>
                {/* Tagline animation */}
                <motion.span 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className='mx-auto px-4 py-2 rounded-full bg-[#FFFDF6] text-[#F83002] font-medium'
                >
                    No. 1 Job Hunt Website
                </motion.span>

                {/* Heading animation */}
                <motion.h1 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className='text-5xl font-bold fontstyle-Roboto'
                >
                    Search, Apply & <br /> Get Your <span className='text-[#6A38C2]'>Dream Jobs</span>
                </motion.h1>

                {/* Paragraph animation */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className='fontstyle-SuseMono'

                >
                    Easily search from thousands of job listings, apply with just a few clicks, and land <br/> your dream job faster than ever before. Your career journey starts here!
                </motion.p>

                {/* Search box animation */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className='flex bg-white w-[40%] p-2 shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'
                >
                    <input
                        type="text"
                        placeholder='Find your dream jobs'
                        onChange={(e) => setQuery(e.target.value)}
                        className='outline-none border-none w-full'
                    />
                    <Button 
                        onClick={searchJobHandler} 
                        className="rounded-r-full h-full  bg-[#6A38C2] hover:bg-[#51279B] transition-colors duration-300"
                    >
                        <Search className='w-5' />
                    </Button>
                </motion.div>
            </div>
        </div>
    )
}

export default HeroSection
