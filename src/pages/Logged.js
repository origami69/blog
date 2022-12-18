import React,{ useEffect, useState} from 'react';
import {debounce} from 'lodash'
import {Link} from 'react-router-dom'
import './css/Log.css';
import gfl from './assets/1855611.jpg'
import gfl2 from './assets/f63bb113d18b8c6a4e376c195a072479.webp'
import gfl3 from './assets/thumb-1920-935918.jpg'
export function Logged() {
let [curr, setCurr]= useState(0)
let [previous, setPrev]=useState(0)
let [obj, setObj] = useState([])
  const  plusSlides = ( n =>{
    let anew=curr
    setPrev(anew)
    if(n.target.className==='next'){
      if(curr===2){
        let help=0
        setCurr(help)
      }else{
        let num=curr+1
        setCurr(num)
      }
    }else if(n.target.className==='prev'){
      if(curr===0){
        const d=2
        setCurr(d)
      }else{
        let num=curr-1
        setCurr(num)
      }
    }
    document.querySelector(`.mySlides${previous}`).style.display = "none";
    document.querySelector(`.mySlides${curr}`).style.display = "block";
  })

  useEffect(() => {
    async function caller(){
      try{
     const getApi = await fetch('/serveMe', {method:'GET'})
        const arrs = await getApi.json()
      if(getApi.ok){
        setObj([...arrs])
      }
      }catch(err){
        console.log(err)
      }
    }
    caller() 
  }, []);

  useEffect(()=>{
    const pos= sessionStorage.getItem('scrollPosition')
    if(pos){document.documentElement.scrollTop=(sessionStorage.getItem('scrollPosition'))}
  })
  const updateValue = debounce(val => {
    sessionStorage.setItem('scrollPosition',val)
  }, 100);

    document.addEventListener('scroll',(event)=>{
      updateValue(Math.abs(document.body.getBoundingClientRect().top))
})

function handleBlog(){
  if( document.querySelector('.holdBlog').style.display === 'none'){
    document.querySelector('.holdBlog').style.display='flex'
  }else{
    document.querySelector('.holdBlog').style.display='none'
  }
}
  return (

    <div className="Logged">
    <h1 tabIndex={0} className='origami'>Origamis Blog</h1>
    <h2 tabIndex={0} className='story'>A Story Of Origamis Way Through The Odin Project</h2>

    <div className="slideshow-container">
<div className="mySlides0 fade" id='0'>
    <div className="numbertext">1 / 3</div>
    <img className='cute' src={gfl}  alt=''></img>
</div>

<div className="mySlides1 fade" id='1'>
    <div className="numbertext">2 / 3</div>
    <img className='cute' src={gfl2}  alt=''></img>
</div>

<div className="mySlides2 fade" id='2'>
    <div className="numbertext">3 / 3</div>
    <img className='cute' src={gfl3}  alt=''></img>
</div>
<div className="prev" onClick={plusSlides}><svg pointerEvents='none'  viewBox="0 0 24 24">
    <path fill="currentColor" d="M20,9V15H12V19.84L4.16,12L12,4.16V9H20Z" />
</svg></div>
<div className="next" onClick={plusSlides}><svg pointerEvents='none' viewBox="0 0 24 24">
    <path fill="currentColor" d="M4,15V9H12V4.16L19.84,12L12,19.84V15H4Z" />
</svg></div>
</div>
<button className='startBlog' onClick={handleBlog}>Start a Blog!!!</button>
<Link className='master' to='Login' reloadDocument>Click To Login Admin</Link>
<div className='holdBlog'>
<form className='createBlog' method="POST" action='/sendMessage' encType="multipart/form-data">
        <label htmlFor="blogName">Input a blog name</label>
        <input type="text" id='blogName' name='blogName' required />
        <label htmlFor="blogDescrip">Enter a description of blog</label>
        <input type="text" id='blogDescrip' name='blogDescrip' required />
        <label htmlFor='blogText'>Enter the blog text</label>
        <input type={'text'} id='blogText' name='blogText' required />
        <label htmlFor='blogGithub'>Enter the github link</label>
        <input htmlFor='text' id='blogGithub' name='blogGithub' required />
        <label htmlFor='blogImage'>Enter the blog image</label>
        <input type='file' accept='image/png, image/jpeg' id='blogImage' alt='Enter Image' src='' name='blogImage' required />
        <input type='submit'/>
</form>

</div>
    <h3 className="projects" tabIndex={0}>Featured Odin Projects</h3>
    <div className="Article">
      <div className="projectHold">
        {obj.map((thing)=>{
          return(
          <div className="project">
          <div className="projectDetail">
              <div className="imgPlace"><img className='imgPlace' src={thing.imgPath} alt=''/></div>
              <div className="imgDescrip">
                  <div className="hold">
                  <h4 className="projectName" tabIndex={0} >{thing.blogName}</h4>
                  <div className="ic">
                      
                  <a href={thing.blogLink}><svg viewBox="0 0 128 128" className='icon'>
          <g fill="#181616"><path  d="M64 5.103c-33.347 0-60.388 27.035-60.388 60.388 0 26.682 17.303 49.317 41.297 57.303 3.017.56 4.125-1.31 4.125-2.905 0-1.44-.056-6.197-.082-11.243-16.8 3.653-20.345-7.125-20.345-7.125-2.747-6.98-6.705-8.836-6.705-8.836-5.48-3.748.413-3.67.413-3.67 6.063.425 9.257 6.223 9.257 6.223 5.386 9.23 14.127 6.562 17.573 5.02.542-3.903 2.107-6.568 3.834-8.076-13.413-1.525-27.514-6.704-27.514-29.843 0-6.593 2.36-11.98 6.223-16.21-.628-1.52-2.695-7.662.584-15.98 0 0 5.07-1.623 16.61 6.19C53.7 35 58.867 34.327 64 34.304c5.13.023 10.3.694 15.127 2.033 11.526-7.813 16.59-6.19 16.59-6.19 3.287 8.317 1.22 14.46.593 15.98 3.872 4.23 6.215 9.617 6.215 16.21 0 23.194-14.127 28.3-27.574 29.796 2.167 1.874 4.097 5.55 4.097 11.183 0 8.08-.07 14.583-.07 16.572 0 1.607 1.088 3.49 4.148 2.897 23.98-7.994 41.263-30.622 41.263-57.294C124.388 32.14 97.35 5.104 64 5.104z"></path><path d="M26.484 91.806c-.133.3-.605.39-1.035.185-.44-.196-.685-.605-.543-.906.13-.31.603-.395 1.04-.188.44.197.69.61.537.91zm2.446 2.729c-.287.267-.85.143-1.232-.28-.396-.42-.47-.983-.177-1.254.298-.266.844-.14 1.24.28.394.426.472.984.17 1.255zM31.312 98.012c-.37.258-.976.017-1.35-.52-.37-.538-.37-1.183.01-1.44.373-.258.97-.025 1.35.507.368.545.368 1.19-.01 1.452zm3.261 3.361c-.33.365-1.036.267-1.552-.23-.527-.487-.674-1.18-.343-1.544.336-.366 1.045-.264 1.564.23.527.486.686 1.18.333 1.543zm4.5 1.951c-.147.473-.825.688-1.51.486-.683-.207-1.13-.76-.99-1.238.14-.477.823-.7 1.512-.485.683.206 1.13.756.988 1.237zm4.943.361c.017.498-.563.91-1.28.92-.723.017-1.308-.387-1.315-.877 0-.503.568-.91 1.29-.924.717-.013 1.306.387 1.306.88zm4.598-.782c.086.485-.413.984-1.126 1.117-.7.13-1.35-.172-1.44-.653-.086-.498.422-.997 1.122-1.126.714-.123 1.354.17 1.444.663zm0 0"></path></g>
          </svg></a>
                  </div>
                  </div>
                  <p className="projDes" tabIndex={0}>{thing.textD}</p>
         
                  <Link reloadDocument tabIndex={0} to={`/Blog/${thing.blogName}`} className='readNow'>Read Now!</Link>
                  
              </div>
          </div>
      </div>

)}) }
       
      </div>
    </div>

   
    </div>

  );
}


