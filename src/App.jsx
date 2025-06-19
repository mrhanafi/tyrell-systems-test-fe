import React, { useEffect, useState } from 'react'
import { submitPeople } from '../utils/apiRequest';

const App = () => {
  const [value,setValue] = useState(0);
  const [data,setData] = useState([]);
  const [secondData,setSecondData] = useState([]);
  const [errorMsg,setErrorMsg] = useState('');

  useEffect(() => {
    console.log(data);
    console.log('secondData:',secondData);
    
  },[data])

  const handleSubmit = async () => {
    setData([]);
    setSecondData([]);
    try{
      if(value < 1 || value === null){
        // set error message
        setErrorMsg('Invalid value. Please enter a valid value.')
      }else{
        // set result in data state
        setErrorMsg('')
        const result = await submitPeople(value);
        if(result.data){
          setData(result.data);

          // loop cards, join comma in between items in array, and set in state
          result?.data?.cards?.forEach(function (items){
            const resultString = items.join(",");
            setSecondData(secondData=>[...secondData,resultString]);
          })
        }
      }
    }catch(error){
      console.log("Err Generate", error.response);
    }
  }
  return (
    <div className='p-10 overflow-x-auto w-auto h-screen'>
      {/* header */}
      <div className='sticky'>
        <h1 className='text-xl font-bold text-center'>Shuffle the deck</h1>
        <div className='py-3 items-center flex flex-col gap-2'>
          <h4>How many people wants to play?</h4>
          <p className='text-red-500 italic text-sm'>{errorMsg}</p>
          <div className='flex gap-2'>
            <div>
              <input type="number" step={1} name='people' className='border border-black px-1' onChange={(e) => setValue(e.target.value)} />
            </div>
            <button className='bg-blue-200 rounded-lg px-2' onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </div>

      {/* card */}
      <div className='flex flex-col gap-2'>
        {data?.cards?.length > 0 && data?.cards?.map((items,index) => (
          <div key={index}>
            <h4 className='font-bold'>Player {index + 1}</h4>
            <div className='flex overflow-scroll gap-1 py-2 px-3'>
              {items.map((item,ind) => (
                <div className='h-20 p-2 outline outline-solid block' key={ind}>
                  <p className='text-center truncate'>{item}</p>
                </div>

              ))}
            </div>

          </div>
        ))}
      </div>

        {/* result */}
      <div className='mt-5'>
        {secondData?.length > 0 && secondData?.map((items,index) => (
          <div className='flex' key={index}>
            {items}
          </div>
        ))}
      </div>
    </div>
  )
}

export default App