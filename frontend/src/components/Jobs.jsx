import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);

    useEffect(() => {
        if (searchedQuery) {
            const filteredJobs = allJobs.filter((job) => {
                return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchedQuery.toLowerCase())
            })
            setFilterJobs(filteredJobs)
        } else {
            setFilterJobs(allJobs)
        }
    }, [allJobs, searchedQuery]);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.15 } // jobs ek ek karke appear honge
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 40 },
        show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
        exit: { opacity: 0, y: -40, transition: { duration: 0.3 } }
    };

    return (
        <div className='p-5'>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-5'>
                <div className='flex gap-5'>
                    {/* Sidebar */}
                    <div className='w-[20%]'>
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <FilterCard />
                        </motion.div>
                    </div>

                    {/* Job Listings */}
                    {
                        filterJobs.length <= 0 ? (
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-gray-600 text-lg"
                            >
                                Job not found
                            </motion.span>
                        ) : (
                            <motion.div
                                className='flex-1 h-[88vh] overflow-y-auto pb-5'
                                variants={containerVariants}
                                initial="hidden"
                                animate="show"
                            >
                                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                                    {
                                        filterJobs.map((job) => (
                                            <motion.div
                                                key={job?._id}
                                                variants={cardVariants}
                                                whileHover={{ scale: 1.03, boxShadow: "0px 8px 24px rgba(0,0,0,0.12)" }}
                                                whileTap={{ scale: 0.97 }}
                                            >
                                                <Job job={job} />
                                            </motion.div>
                                        ))
                                    }
                                </div>
                            </motion.div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Jobs
