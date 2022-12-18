import React,{ useEffect, useState} from "react";
import {Link} from 'react-router-dom'
import { useParams } from 'react-router-dom'
import './Blogo.css'

export function Blog() {
let [objs, setObjs] = useState([]);
const {name} = useParams();
useEffect(()=>{
  async function callers(){
    try{
   const user = await fetch(`/bruh/${name}`, {method:'GET'})
   const bruh = await user.json()
    if(user.ok){
      setObjs([...bruh])
    }
    }catch(err){
      console.log(err)
    }
  }
  callers() 
},[name])
  return (
    <div className="contains">
  { objs.map((item)=>{
  return(
    <div className='Blog'>
    <h1 className='miniTitle'>{item.blogName}</h1>
    <div className='miniMessageHold'>
            <p className='miniWords'>{item.textB}</p>
            <Link className="blogChange" reloadDocument to = '/'>Go Back To Main Page?</Link>
            
    </div>
    </div>
  )
})

}

</div>
  );
}
