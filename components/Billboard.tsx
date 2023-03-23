import useBillboard from '@/hooks/useBillboard';
import React from 'react';

import { AiOutlineInfoCircle } from 'react-icons/ai';

const Billboard = () => {
  const { data } = useBillboard();
  return (
    <div className='relative pb-16 min-h-[80%]'>
      <img
        className="absolute w-full h-full -z-10 opacity-80 saturate-150 object-cover brightness-[60%]"
        src={data?.thumbnailUrl}
        alt={data?.title}
      />
      <div className='ml-5 pt-44 md:ml-16'>
        <p className='text-white text-xl md:text-5xl h-full lg:text-6xl font-bold drop-shadow-xl w-[70%]'>
          {data?.title}
        </p>
        <p className='text-white text-sm md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[70%]  drop-shadow-xl' dangerouslySetInnerHTML={{__html: data?.description}}>
        </p>
        <p className='text-white text-sm md:text-lg mt-1 md:mt-4 w-[90%] md:w-[80%] lg:w-[70%]  drop-shadow-xl'>
          <span className='text-bold'>Genre:</span> {data?.genres}
        </p>
        <p className='text-white text-sm md:text-lg mt-1 md:mt-4 mb-8 w-[90%] md:w-[80%] lg:w-[70%]  drop-shadow-xl'>
          <span className='text-bold'>Duration:</span> {data?.duration}
        </p>
        <div className='flex flex-row items-center gap-3 mt-3 md:mt-4'>
          <button className='flex flex-row items-center w-auto px-2 py-1 text-xs font-semibold text-white transition bg-white rounded bg-opacity-30 md:py-2 md:px-4 lg:text-lg hover:bg-opacity-20'>
            <AiOutlineInfoCircle className='mr-1' />
            More Info
          </button>
        </div>
      </div>
    </div>
  )
}

export default Billboard;