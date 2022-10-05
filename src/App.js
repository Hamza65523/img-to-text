import { useEffect, useState } from 'react';
import './App.css';
import { createWorker } from 'tesseract.js';
function App() {
 const [selectedImg,setSelectedImg]=useState(null)
 const [textResult,setTextResult]=useState('')
const handlerChange=(e)=>{
  
  setSelectedImg(e.target.files[0])
}
const worker = createWorker();
  const TextGenrator = async()=>{
  await worker.load();
  await worker.loadLanguage('eng');
  await worker.initialize('eng');
  const { data:{text} } = await worker.recognize(selectedImg);
  setTextResult(text)
  await worker.terminate();
  }
  useEffect(()=>{
    TextGenrator()
  },[selectedImg])
  return (
    <div className="App  bg-blue-500">
      <div className=" text-white text-center ">
        <h1 className='text-2xl font-[500] capitalize  pt-8'>Image to  text</h1>

        <div className="relative mt-4 w-[150px] mx-auto my-0 ">
          <input className='text-white bg-red-500 rounded-lg w-[100px] max-w-[250px]' type="file" name="" id="" onChange={(e)=>handlerChange(e)} />
        </div>
       <div className="flex px-8 py-8 items-center gap-4 flex-wrap justify-center">
       {selectedImg&& (
          <div className="mt-4  max-w-[1200px] ">
            <img src={URL.createObjectURL(selectedImg)} className='border-4 max-h-[700px]  max-w-[400px] border-green-300' alt="" />
          </div>
        )}
        {textResult&&(
          <div className="mt-4 max-w-[600px] ">
            <p className='text-white max-h-[700px] md:max-[500px] border-green-400 border-4 px-2 py-2'>{textResult}</p>
          </div>
        )}
       </div>
      </div>
    </div>
  );
}

export default App;
