import React, { useEffect, useState } from 'react'

const MainArea = () => {
    
    const[task,setTask]=useState("");
    const[fid,setfid]=useState(5)
    const[newlist,setNewlist]=useState([]);
    const[flag,setFlag]=useState(false);
    const[sid,setSid]=useState(null);
    useEffect(()=>{
        let list=JSON.parse(localStorage.getItem("notelist"));
        setNewlist(list);
    },[fid]);
    const handleAddTask=()=>{
        if(task!=null && task!=""){
            let tempdata={
                id:Math.random(),
                text:task
            }
            let list=JSON.parse(localStorage.getItem("notelist"));
            list=[tempdata,...list];
            localStorage.setItem("notelist",JSON.stringify(list));
            setTask("");
            setfid(Math.random());
        }
    }

    const handleDelete=(id)=>{
        let list=JSON.parse(localStorage.getItem("notelist"));
        let newArr=list.filter((data)=>data.id!==id)
        localStorage.setItem("notelist",JSON.stringify(newArr));
        setfid(Math.random());
    }

   const handleUpdateTask=()=>{
    if(task!=null && task!=""){
        let tempdata={
            id:sid,
            text:task
        }
        let list=JSON.parse(localStorage.getItem("notelist"));
        list=[tempdata,...list];
        localStorage.setItem("notelist",JSON.stringify(list));
        setTask("");
        setSid(null);
        setFlag(false)
        setfid(Math.random());
    }
}

    const handleEdit=(id)=>{
        setFlag(true)
        let list=JSON.parse(localStorage.getItem("notelist"));
            let tempdata=list.find((data)=>data.id===id)
            setTask(tempdata.text);
            setSid(tempdata.id)
            handleDelete(id);
            setfid(Math.random());
            
    }

  return (
    <>
    <div className='d-flex justify-content-center mb-3'>
        <div className='card' style={{width:"350px"}}>
            <div className='card-header text-center'>
                <h4>Keep Noting 📝</h4>
            </div>
            <div className='card-body '>
                <input className='form-control borders' value={task} onChange={(e)=>setTask(e.target.value)} type="text" placeholder='Take a note...' /><br/>
                {flag?<button className='btn btn-outline-info ' onClick={handleUpdateTask}>Update Task</button>:
                <button className='btn btn-outline-success' onClick={handleAddTask}>➕ Task</button>
                }
            </div>
        </div>
        </div>
        <div className='row'>
        {  
            newlist.map((data)=>{
                return(<div className='col-md-4 my-2'>
                    <div className='card note ' key={data.id} style={{width:"350px"}}>
                <div className='card-body'>
                    <h5 className='card-text text-white'>{data.text}</h5>
                    <div className='d-flex justify-content-between mt-5'>
                        <button className='btn btn-danger' onClick={()=>handleDelete(data.id)}>🗑</button>
                        <button className='btn btn-warning' onClick={()=>handleEdit(data.id)}>✏</button>
                    </div>
                </div>
            </div>
                </div>
                
           )
            })
        }
        </div>
    </>
  )
}

export default MainArea