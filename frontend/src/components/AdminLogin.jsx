import { useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "../styles/Login.css"


const AdminLogin = () => {

    const navigate = useNavigate()

    let username=useRef()
    let password=useRef()

    let submit =(e)=>{
    e.preventDefault()
        let admin ={
            username:"admin",
            password:"123456"
        }
        if ( username.current.value === admin.username && password.current.value === admin.password ) {
            // navigate to admin portal
            navigate('/home')
        } else {
            alert("invaild admin credentials")
            
        }
}

    return ( 
        <div className="adminLogin">
            <center>
            <h2 id="hi">ADMIN LOGIN</h2><br />
            <div className="adminForm">
                <form onSubmit={submit}>
                    <div>
                      Username:  <input className="adminEmail1" ref={username} type="text" placeholder="Enter the user name"  />
                    </div ><br />
                    <div>
                     Password:   <input className="adminEmail1" ref={password} type="password" placeholder="Enter your password"  />
                    </div><br />
                    <div className="loginBtm">
                        <button className="adminEmail">Login</button>
                    </div>
                </form>
            </div>
            </center>
        </div>
     );
}
 
export default AdminLogin;