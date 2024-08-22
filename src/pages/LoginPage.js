import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Swal  from 'sweetalert2';
import { MdArrowBackIos } from "react-icons/md";

export default function LoginPage() {
  const [dataUser, setDataUser] = useState({});
  const navigate = useNavigate();

  const handleChange = e => {
    const {value, name} = e.target;
    setDataUser({...dataUser,[name]: value});
  }
  const handleSubmit = e => {
    e.preventDefault();
    if(dataUser.username === 'admin' && dataUser.password === 'admin'){
      navigate('/admin')
    }else {
      Swal.fire({
        icon: "error",
        // title: "Oops...",
        text: "Username atau Password Salah!",
      });
    }
  }
  return (

    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="row border rounded-5 p-3 bg-dark shadow box-area justify-content-center mx-2">
        {/* <div class="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box" style="background: #103cbe;">
             </div>  */}
        <div className="col-md-6 right-box">
          <Link to={'/'} className='btn btn-outline-dark'>
            {/* <FaCircleArrowLeft color='white' size={30} /> */}
            <MdArrowBackIos color='white' size={20} />
          </Link>
          <div className="row align-items-center mt-3">
            <div className="header-text mb-4" style={{ color: "white", textAlign:'center' }}>
              <h2>Selamat Datang</h2>
              <p>Login Sebagai Admin.</p>
            </div>
            <div className="input-group mb-3">
              <input
                name='username'
                onChange={handleChange}
                type="text"
                className="form-control form-control-lg bg-light fs-6"
                placeholder="Username"
              />
            </div>
            <div className="input-group mb-1">
              <input
                name='password'
                onChange={handleChange}
                type="password"
                className="form-control form-control-lg bg-light fs-6"
                placeholder="Password"
              />
            </div>
            <div className="input-group mb-3">
              <button onClick={handleSubmit} className="btn btn-lg btn-primary w-100 fs-6 mt-2">Login</button>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}