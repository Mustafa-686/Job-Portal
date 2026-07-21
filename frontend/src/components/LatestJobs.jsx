import React from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job);

    // Variants for staggered animation
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2, // ek ek card 0.2s delay se animate hoga
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <div className='max-w-7xl mx-auto my-20'>
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className='text-4xl font-bold text-center md:text-left'
            >
                <span className='text-[#6A38C2]'>Latest & Top </span> Job Openings
            </motion.h1>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-8'
            >
                {
                    allJobs.length <= 0 ? (
                        <span>No Job Available</span>
                    ) : (
                        allJobs?.slice(0, 6).map((job) => (
                            <motion.div key={job._id} variants={cardVariants}>
                                <LatestJobCards job={job} />
                            </motion.div>
                        ))
                    )
                }
            </motion.div>
        </div>
    )
}

export default LatestJobs
