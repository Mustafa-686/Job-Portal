import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();

    return (
        <motion.div
            onClick={() => navigate(`/description/${job._id}`)}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.03, boxShadow: "0px 8px 24px rgba(0,0,0,0.15)" }}
            whileTap={{ scale: 0.98 }}
            className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer'
        >
            <div>
                <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                <p className='text-sm text-gray-500'>{job?.company?.location}</p>
            </div>

            <div>
                <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600 line-clamp-2'>{job?.description}</p>
            </div>

            <div className='flex items-center gap-2 mt-4 flex-wrap'>
                <Badge className={'text-blue-700 font-bold'} variant="ghost">
                    {job?.position} Positions
                </Badge>
                <Badge className={'text-[#F83002] font-bold'} variant="ghost">
                    {job?.jobType}
                </Badge>
                <Badge className={'text-[#7209b7] font-bold'} variant="ghost">
                    {job?.salary} Pkr
                </Badge>
            </div>
        </motion.div>
    )
}

export default LatestJobCards
