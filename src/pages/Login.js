import React from 'react';
import {Link} from 'react-router-dom'
import './css/Login.css';

export function Login() {



    function pass(e){
        const regex=/^[a-zA-Z0-9]*$/
        if(regex.test(e.target.value) && e.target.value.length>=3){
            e.target.style.border='1px solid green'
            e.target.style.outlineColor='green'
        }else{
            e.target.style.border='1px solid red'
            e.target.style.outlineColor='red'
        }
    }
    function check(e){
        const regex=/^[a-zA-Z0-9]*$/
        if(regex.test(e.target.value) && e.target.value.length>=8 && /(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9]+/.test(e.target.value)){
            e.target.style.border='1px solid green'
            e.target.style.outlineColor='green'
        }else{
            e.target.style.border='1px solid red'
            e.target.style.outlineColor='red'
        }
    }
  return (
    <div className="Login">
      <div className='signHolder'>
    <div className='signIn'>
    <h2 className='title'>Welcome Back Origami~~Chan <br/>Please Login Again</h2>
      <form className='signIn' method="POST" action='/signIn'>
        <label htmlFor='use'>Enter Username</label>
          <input type='text' id='use' name='use' pattern="^[a-zA-Z0-9]*$"   minLength={3} maxLength={15} onChange={pass}  required/>
          <label htmlFor='pass'>Enter Password</label>
          <input type='password' name='pass' id='pass' pattern="^[a-zA-Z0-9]*$"   minLength={8} maxLength={15}onChange={check} required/>
          <input type='submit'/>
      </form>
    </div>
    <Link  reloadDocument className='backAgain' to='/'>Maybe You Are Lost???</Link>
    </div>
</div>
  );
}


