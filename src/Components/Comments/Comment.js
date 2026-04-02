import React, { useState } from 'react'
import {v4 as uuidv4} from "uuid";
import {formatDistanceToNow} from "date-fns"


function Comment() {
    const [name,setname] =useState("");
    const [commentval,setcommentval] = useState("");
    const [store,setstore] = useState([])
    const [count,setcount] = useState(0)

    const submitfun=(e)=>{
        e.preventDefault()
        
        const obj ={
            id:uuidv4(),
            Name :name,
            comment :commentval,
            date : new Date(),
            islike :false
        }
        setstore(pre=>[...pre,obj]);
        setcount(pre=>pre+1)
        setcommentval("")
        setname("")
    }

    const deletefun =(id)=>{
       setstore(pre =>pre.filter(val=>val.id!==id))
       setcount(pre=>pre-1)
        console.log("delete function")
    }

  return (
    <>

        <div className="min-h-screen bg-gray-100 flex justify-center items-center p-10">
  <div className="bg-white shadow-xl rounded-lg w-full max-w-5xl p-10">

    <h1 className="text-4xl font-bold text-gray-800 mb-8">Comments</h1>

    <div className="flex gap-10 items-center">

      {/* Left Section */}
      <div className="w-1/2">
        <p className="text-gray-600 mb-4">
          Say something about 4.0 Technologies
        </p>

        <form onSubmit={submitfun} className="space-y-4">

          <input
            type="text"
            name="FullName"
            placeholder="Your Name"
            value={name}
            onChange={e => setname(e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <textarea
            placeholder="Your Comment"
            onChange={e => setcommentval(e.target.value)}
            value={commentval}
            className="w-full border border-gray-300 rounded px-4 py-3 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>

          <button
            type="submit"
            className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700 transition"
          >
            Add Comment
          </button>

        </form>
      </div>

      {/* Right Image */}
      <div className="w-1/2 flex justify-center">
        <img
          src="./image/comment.png"
          alt="not found"
          className="w-80"
        />
      </div>

    </div>

    {/* Result Section */}
    <div className="mt-10 border-t pt-6">
        <p className="text-gray-700 mb-4 flex items-center gap-2">
        <span className="bg-blue-500 text-white text-sm px-3 py-1 rounded">
          {count>0?count:0}
        </span>
        Comments
      </p>

    {store.map(value=>(
    

      
      <div className="bg-gray-50 p-5 rounded shadow-sm" key={value.ID}>
        
        <h3 className="font-semibold text-gray-800 ">
         <span className='mr-1 bg-orange-500 rounded-full px-3 py-1 '>{value.Name?value.Name[0].toUpperCase():null}</span>
          {value.Name}
           <span className='ml-2'>{formatDistanceToNow(new Date(value.date))}</span> 
        </h3>

        <p className="text-gray-600 mt-2 ml-14">
          {value.comment}
        </p>

        <div className="flex items-center gap-2 mt-4 text-gray-500 cursor-pointer hover:text-blue-600">
          {value.islike?<img
            src="./image/dislike.png"
            alt="not found"
            className="w-4 h-4"
            onClick={()=>setstore(pre=> pre.map(each=>(each.id===value.id?{...each,islike:!each.islike}:each)))}
          />:<img
            src="./image/like.png"
            alt="not found"
            className="w-4 h-4"
            onClick={()=>setstore(pre=> pre.map(each=>(each.id===value.id?{...each,islike:!each.islike}:each)))}
          />}
          <span >{value.islike ?"DisLike":"Like"}</span> 
           <button className='ml-auto  text-black px-4 py-2 rounded' onClick={()=>deletefun(value.id)}>
            <img src="./image/dustbin.png" alt="not found"  className="w-4 h-4 " />
           </button>
        </div>
       
        <hr className='shadow-md h-1' />

      </div>))}

    </div>

  </div>
</div>

       
    </>
  )
}

export default Comment
