import React, { useState } from 'react'
import { json } from 'react-router-dom';
import { useNavigate} from'react-router-dom';
const Login = (props) => {

  let history = useNavigate();
  const Host= "http://localhost:5000"
  const [cradensital,setcradensital] = useState({email:"",password:"",});
    // const [password,setpassword] = useState("");
    const handlesumit = async(e) => {
      e.preventDefault();
      props.setProgress(10)
      // props.login(e.target.email.value,e.target.password.value)
      const response = await fetch(`${Host}/api/auth/login`, {
        method: "POST",  
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email:cradensital.email,password:cradensital.password}), 
      });
      props.setProgress(50)

      
      const json = await response.json();
        console.log(json);
        if (json.success) {
          localStorage.setItem('token',json.authtoken);
          history("/home");
          props.setProgress(100)

      props.showalert("successfuly login","success")
      setTimeout(() => {
        window.location.reload();
      }, 500);
        }
        else {
          props.showalert("invalid credenstials","danger")
          history("/login")
        }
      }
      const onChange = (e) => {
        setcradensital({...cradensital,[e.target.name]: e.target.value });
        
      }
    
  return (

  <>
  <form onSubmit={handlesumit}>
  <div className="mb-3">

                    <label htmlFor="email" className="form-label text_u">Email address</label>

                    <input type="email" className="form-control text_u" value={cradensital.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />

                    {/* <div id="emailHelp" className="form-text text_u">We'll never share your email with anyone else.</div> */}
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label text_u">Password</label>
    <input type="password" className="form-control" value={cradensital.password} onChange ={onChange} name='password'  id="exampleInputPassword1"/>
  </div>

  <button type="submit" className="btn btn-primary" onSubmit={handlesumit}>sign in</button>
</form>
        </>
  )
}

export default Login
