/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import FooterComp from '../components/FooterComp';
import AsideComp  from '../components/AsideComp';

// import { TbMedicineSyrup } from "react-icons/tb";
// import { LuClipboardList } from "react-icons/lu";
// import { FaBook } from "react-icons/fa";
// import { FaList } from "react-icons/fa6";
// import Logo  from '../assets/Logo.png';

import axios from 'axios';
import CONFIG from '../global/config';

// const AsideComp = ({ isCollapsed }) => {
//     return (
//         <aside id="sidebar" className={`js-sidebar  ${isCollapsed ? 'collapsed' : ''} `}>
//             {/* Content For Sidebar */}
//             <div className="h-100">
//                 <div className="sidebar-logo">
//                     <Link to={'/'} style={{ textDecoration: 'none' }}>
//                         <img src={Logo} alt="log" className='' height={'35px'} /> Pakar Motor
//                     </Link>
//                 </div>
//                 <ul className="sidebar-nav">
//                     <li className="sidebar-item">
//                         <Link to={'/admin'} className="sidebar-link" style={{ textDecoration: 'none' }}>
//                         <FaList className='me-2' />
//                             Dashboard
//                         </Link>
//                     </li>
//                     <li className="sidebar-item">
//                         <Link to={'/admin-gejala'} className="sidebar-link" style={{ textDecoration: 'none' }}>
//                             <TbMedicineSyrup className='me-2'/>
//                             Data Gejala
//                         </Link>
//                     </li>
//                     <li className="sidebar-item">
//                         <Link to={'/admin-kerusakan'} className="sidebar-link" style={{ textDecoration: 'none' }}>
//                          <LuClipboardList className='me-2'/>
//                             Data Kerusakan
//                         </Link>
//                     </li>
//                     <li className="sidebar-item">
//                         <Link to={'/admin-data-pakar'} className="sidebar-link" style={{ textDecoration: 'none' }}>
//                         <FaBook className='me-2'/>
//                             Basis Pengetahuan
//                         </Link>
//                     </li>
//                 </ul>
//             </div>
//         </aside>

//     )
// }

const ThemeTogggleComp = _ => {
    return (
        <a href="#" className="theme-toggle">
            <i className="fa-regular fa-moon" />
            <i className="fa-regular fa-sun" />
        </a>
    )
}

const AdminNavbar = ({ toggleBtn }) => {

    return (
        <nav className="navbar navbar-expand px-3 border-bottom">
            <button className="btn" id="sidebar-toggle" type="button" onClick={toggleBtn}>
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="navbar-collapse navbar">
                <ul className="navbar-nav">
                    <li className="nav-item dropdown">
                        <a href="#" data-bs-toggle="dropdown" className="nav-icon pe-md-0">
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

export default function Dashboard() {
    const [collapsed, setCollapsed] = React.useState(false);
    const [gejalas, setGejalas] = useState([])
    const [kerusakans, setKerusakans] = useState([])
    const [bp, setBp] = useState([])
    const [kasus, setKasus] = useState([])
    const [riwayat, setRiwayat] = useState([])

    const getData = async _ => {
        const resGejala = await axios.get(`${CONFIG.BASE_URL}/api/gejala`);
        const resKerusakan = await axios.get(`${CONFIG.BASE_URL}/api/kerusakan`);
        const resBp = await axios.get(`${CONFIG.BASE_URL}/api/basis-pengetahuan`);
        const resKasus = await axios.get(`${CONFIG.BASE_URL}/api/data-kasus`);
        const resRiwayat = await axios.get(`${CONFIG.BASE_URL}/api/riwayat`);
        
        console.log(resKasus.data)

        setGejalas(resGejala.data);
        setKerusakans(resKerusakan.data);
        setBp(resBp.data);
        setKasus(resKasus.data)
        setRiwayat(resRiwayat.data)
    }

    const toggleCollapsed = _ => {
        setCollapsed(!collapsed);
    }

    useEffect(() => {
        getData()
    },[])
    return (
        <>
            <div className="wrapper">
                <AsideComp isCollapsed={collapsed} />
                <div className="main">
                    <AdminNavbar toggleBtn={toggleCollapsed} />
                    <main className="content px-3 py-2">
                        <div className="container-fluid">
                            <div className="mb-3">
                                <h4>Admin Dashboard</h4>
                            </div>
                            <div className="row">
                                <div className="col-12 col-md-6 d-flex">
                                    <div className="card flex-fill border-0 illustration">
                                        <div className="card-body p-0 d-flex flex-fill">
                                            <div className="row g-0 w-100">
                                                <div className="col-12">
                                                    <div className="p-3 m-1">
                                                        <h4>Selamat Datang</h4>
                                                        <p className="mb-0">
                                                            selamat datang di sistem pakar sepeda motor
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="col-6 align-self-end text-end">
                                                    <img
                                                        src="image/customer-support.jpg"
                                                        className="img-fluid illustration-img"
                                                        alt=""
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 d-flex">
                                    <div className="card flex-fill border-0">
                                        <div className="card-body py-4">
                                            <div className="d-flex align-items-start">
                                                <div className="flex-grow-1">
                                                    <h4 className="mb-2">{gejalas && gejalas.length}</h4>
                                                    <p className="mb-2">Total Gejala</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 d-flex">
                                    <div className="card flex-fill border-0">
                                        <div className="card-body py-4">
                                            <div className="d-flex align-items-start">
                                                <div className="flex-grow-1">
                                                    <h4 className="mb-2">{kerusakans && kerusakans.length}</h4>
                                                    <p className="mb-2">Total Kerusakan</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 d-flex">
                                    <div className="card flex-fill border-0">
                                        <div className="card-body py-4">
                                            <div className="d-flex align-items-start">
                                                <div className="flex-grow-1">
                                                    <h4 className="mb-2">{bp && bp.length}</h4>
                                                    <p className="mb-2">Basis Pengetahuan</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 d-flex">
                                    <div className="card flex-fill border-0">
                                        <div className="card-body py-4">
                                            <div className="d-flex align-items-start">
                                                <div className="flex-grow-1">
                                                    <h4 className="mb-2">{riwayat && riwayat.length}</h4>
                                                    <p className="mb-2">Riwayat Diagnosa</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="col-12 col-md-6 d-flex">
                                    <div className="card flex-fill border-0">
                                        <div className="card-body py-4">
                                            <div className="d-flex align-items-start">
                                                <div className="flex-grow-1">
                                                    <h4 className="mb-2">{kasus && kasus.length}</h4>
                                                    <p className="mb-2">Data Kasus</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </main>
                    <ThemeTogggleComp />
                    <FooterComp />
                </div>
            </div>
        </>
    )
}