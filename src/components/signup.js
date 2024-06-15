import React, { useState } from 'react'

import { json } from 'react-router-dom';
import { useNavigate} from'react-router-dom';

const Signup = (props) => {
  const Host= "http://localhost:5000"
  let history = useNavigate();

  const onChange = (e) => {
    setcradensital({...cradensital,[e.target.name]: e.target.value });
    }
  const [cradensital,setcradensital] = useState({email:"",password:"",cpassword:"",name:""});
   const handlesumit = async(e) => {
    e.preventDefault();
    // props.login(e.target.email.value,e.target.password.value)
  
    // const response = await fetch(`${Host}/api/auth/createuser`, {
      const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: "POST",  
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name:cradensital.name,email:cradensital.email,password:cradensital.password}), 
    });
    props.setProgress(10)

    const json = await response.json();
    props.setProgress(30)

    console.log(json);
    if (json.success) {
      localStorage.setItem('token',json.authtoken);
      props.setProgress(60)

      history("/login");
      props.setProgress(100)

      props.showalert("successfuly crerate account","success")
  }else{
    // alert(json.message) 
    props.showalert("email already in use","danger");
    history("/Signup")
  }
}

  return (
    <div>
 
        <form onSubmit={handlesumit}>

        <div className="mb-3">
    <label htmlFor="name" className="form-label text_u">name</label>
    <input type="text" className="form-control" name='name' value={cradensital.name} onChange={onChange} id="name" />
    <div id="nameHelp" className="form-text">USERNAME</div>
  </div>  
    
  <div className="mb-3">
    <label htmlFor=" " className="form-label text_u">Email address</label>
    <input type="email" className="form-control" onChange={onChange} value={cradensital.email} name='email' id="email1" aria-describedby="emailHelp"/>
    {/* <div id="emailHelp" className="form-text text_u">We'll never share your email with anyone else.</div> */}
  </div>

  <div className="mb-3">
    <label htmlFor="" className="form-label text_u">Password</label>
    <input type="password" className="form-control" name='password'  value={cradensital.password} placeholder="6 letter must contain" onChange={onChange}id="Password"/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1"  className="form-label text_u">conform Password</label>
    <input type="text" className="form-control" name='cpassword' value={cradensital.cpassword} onChange={onChange} id="cPassword"/>
  </div>
 
  <button type="submit" className="btn btn-primary text_u">Sign-up</button>
</form>
      
    </div>
  )
}

export default Signup