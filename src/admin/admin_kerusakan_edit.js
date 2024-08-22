/* eslint-disable */
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from "react-router-dom";
import {Modal} from 'react-bootstrap';

import FooterComp from '../components/FooterComp';
import CONFIG from '../global/config';
import AsideComp  from '../components/AsideComp';

// const AsideComp = ({isCollapsed}) => {
//     return (
//         <aside id="sidebar" className={`js-sidebar  ${isCollapsed ? 'collapsed':''} `}>
//             {/* Content For Sidebar */}
//             <div className="h-100">
//                 <div className="sidebar-logo">
//                     <Link to={'/'}>
//                         <i className="fa-solid fa-motorcycle m-2" /> Pakar Motor
//                     </Link>
//                 </div>
//                 <ul className="sidebar-nav">
//                     <li className="sidebar-item">
//                         <Link to={'/admin'} className="sidebar-link">
//                             <i className="fa-solid fa-list pe-2" />
//                             Dashboard
//                         </Link>
//                     </li>
//                     <li className="sidebar-item">
//                         <a
//                             className="sidebar-link collapsed"
//                             data-bs-target="#pages"
//                             data-bs-toggle="collapse"
//                             aria-expanded="false"
//                         >
//                             <i className="fa-solid fa-file-lines pe-2" />
//                             Data
//                         </a>
//                         <ul
//                             id="pages"
//                             className="sidebar-dropdown list-unstyled collapse"
//                             data-bs-parent="#sidebar"
//                         >
//                             <li className="sidebar-item">
//                                 <Link to={'/admin-gejala'} className="sidebar-link">
//                                     Data Gejala
//                                 </Link>
//                             </li>
//                             <li className="sidebar-item">
//                                 <Link to={'/admin-kerusakan'} className="sidebar-link">
//                                     Data Kerusakan
//                                 </Link>
//                             </li>
//                             <li className="sidebar-item">
//                                 <Link to={'/admin-data-pakar'} className="sidebar-link">
//                                     Basis Pengetahuan
//                                 </Link>
//                             </li>
//                         </ul>
//                     </li>
//                     <li className="sidebar-item">
//                         <a
//                             className="sidebar-link collapsed"
//                             data-bs-target="#posts"
//                             data-bs-toggle="collapse"
//                             aria-expanded="false"
//                         >
//                             <i className="fa-solid fa-sliders pe-2" />
//                             Metode Sistem Pakar
//                         </a>
//                         <ul
//                             id="posts"
//                             className="sidebar-dropdown list-unstyled collapse"
//                             data-bs-parent="#sidebar"
//                         >
//                             <li className="sidebar-item">
//                                 <Link to={'/admin-cf'} className="sidebar-link">
//                                     Certainty Factor
//                                 </Link>
//                             </li>
//                             <li className="sidebar-item">
//                                 <Link to={'/admin-cbr'} className="sidebar-link">
//                                     Case Based Reasoning
//                                 </Link>
//                             </li>
//                         </ul>
//                     </li>
//                 </ul>
//             </div>
//         </aside>

//     )
// }

const ThemeTogggleComp = _ => {
    return (
        <a className="theme-toggle">
            <i className="fa-regular fa-moon" />
            <i className="fa-regular fa-sun" />
        </a>
    )
}

const AdminNavbar = ({toggleBtn}) => {

    return (
        <nav className="navbar navbar-expand px-3 border-bottom">
                <button className="btn" id="sidebar-toggle" type="button" onClick={toggleBtn}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="navbar-collapse navbar">
                    <ul className="navbar-nav">
                        <li className="nav-item dropdown">
                            <a data-bs-toggle="dropdown" className="nav-icon pe-md-0">
                                <i className="bi bi-person-circle"></i>
                            </a>
                            <div className="dropdown-menu dropdown-menu-end">
                                <Link to={'/login'} className="dropdown-item">Logout</Link>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
    )
}

const FormComponent = ({gejala, handleChange, handleSubmit}) => {
    return (
        <>
            <div className="card border-0">
                <div className="card-header">
                    <h5 className="card-title">Kerusakan Sepeda Motor</h5>
                </div>
                <div className="card-body">
                    <form action="">
                        <div className="mb-3">
                            <label htmlFor="nama" className="form-label">Nama Gejala</label>
                            <input type="text" name="nama" id="nama" className="form-control" onChange={handleChange} placeholder={gejala.nama} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="keterangan" className="form-label">
                                Keterangan
                            </label>
                            <textarea
                                className="form-control"
                                id="keterangan"
                                rows={3}
                                defaultValue={""}
                                name='definisi'
                                onChange={handleChange}
                                placeholder={gejala.definisi}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="solusi" className="form-label">
                                Solusi
                            </label>
                            <textarea
                                className="form-control"
                                id="solusi"
                                rows={3}
                                defaultValue={""}
                                name='solusi'
                                onChange={handleChange}
                                placeholder={gejala.solusi}
                            />
                        </div>
                        <div className="mb-3">
                            <button onClick={handleSubmit} className="btn btn-warning">Ubah Kerusakan</button>
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}


export default function AdminKerusakanEdit() {
    const {kerusakanId} = useParams();
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = React.useState(false);
    const [gejala, setGejala] = React.useState({});
    const [addKerusakan, setAddKerusakan] =  React.useState({});

    const handleChange = e => {
        const {value, name} = e.target;
        setAddKerusakan({...addKerusakan, [name]: value});
    }
    const handleSubmit = e => {
        e.preventDefault();
        console.log(addKerusakan);
        axios.put(`${CONFIG.BASE_URL}/api/kerusakan/${kerusakanId}`, addKerusakan)
         .then(res => {
            console.log(res);
            navigate('/admin-kerusakan', {replace:true})
         })
         .catch(e => console.log(e))
    }
    const getKerusakan = async () => {
        const response = await axios.get(`${CONFIG.BASE_URL}/api/kerusakan/${kerusakanId}`);
        setGejala(response.data)
    }
    const toggleCollapsed = _ => {
        setCollapsed(!collapsed);
    }

    React.useEffect(() => {
        getKerusakan()
    },[])
    return (
        <>
            <div className="wrapper">
                <AsideComp isCollapsed={collapsed}/>
                <div className="main">
                    <AdminNavbar toggleBtn={toggleCollapsed}/>
                    <main className="content px-3 py-2">
                        <div className="container-fluid">
                            <div className="mb-3">
                                <h4>Admin Kerusakan</h4>
                            </div>
                            {/* CONTENT */}
                            <FormComponent gejala={gejala} handleChange={handleChange} handleSubmit={handleSubmit} />

                        </div>
                    </main>
                    <ThemeTogggleComp/>
                    <FooterComp/>   
                </div>
            </div>
        </>
    )
}