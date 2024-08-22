/* eslint-disable */

import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Modal } from 'react-bootstrap';

import AsideComp from '../components/AsideComp';
import axios from 'axios';

import FooterComp from '../components/FooterComp';
import CONFIG from '../global/config';
import Swal from 'sweetalert2';

// const AsideComp = ({ isCollapsed }) => {
//     return (
//         <aside id="sidebar" className={`js-sidebar  ${isCollapsed ? 'collapsed' : ''} `}>
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

const AdminNavbar = ({ toggleBtn }) => {

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

const TableComponent = ({ bp, handleDelete }) => {
    return (
        <>
            <div className="card border-0">
                <div className="card-header">
                    <h5 className="card-title">Data Basis Pengetahuan</h5>
                </div>
                <div className="card-body">
                    <table className="table">
                        <thead>
                            <tr>

                                <th scope="col">Kode Gejala</th>
                                <th scope="col">Kode Kerusakan</th>
                                <th scope="col">Bobot</th>
                                <th scope="col">Button</th>

                            </tr>
                        </thead>
                        <tbody>
                            {bp.map(i => {
                                return (
                                    <tr key={i.id}>
                                        <td>{i.kode_gejala}</td>
                                        <td>{i.kode_kerusakan}</td>
                                        <td>{i.bobot}</td>
                                        <td>
                                            <Link to={`/admin-bp-edit/${i.id}`} className="btn btn-warning btn-sm"><i
                                                className="bi bi-pencil-square"></i></Link>
                                            <button onClick={() => handleDelete(i.id)} type="button" className="btn btn-danger btn-sm"><i
                                                className="bi bi-trash"></i></button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

        </>
    )
}

const ModalComponent = ({ show, handleClose, gejalas, kerusakans, handleSubmit, handleChange }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Tambah Data Pakar</h5>
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    />
                </div>
                <div className="modal-body">
                    <form>
                        <div className="mb-3">
                            <label htmlFor="" className="form-label">
                                Kode Gejala
                            </label>
                            <select id="" className="form-select" name='kode_gejala' onChange={handleChange}>
                                {gejalas && gejalas.map(i => {
                                    return (
                                        <option value={i.id}>{i.nama}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="" className="form-label">
                                Kode Kerusakan
                            </label>
                            <select id="" className="form-select" name='kode_kerusakan' onChange={handleChange}>
                                {kerusakans && kerusakans.map(i => {
                                    return (

                                        <option value={i.id}>{i.nama}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="bobot" className="form-label">
                                Bobot
                            </label>
                            <input type="text" className="form-control" id="bobot" name='bobot' onChange={handleChange} />
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleClose}
                    >
                        Batal
                    </button>
                    <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                        Simpan
                    </button>
                </div>
            </div>
        </Modal>

    )
}

export default function AdminPakar() {
    const [show, setShow] = React.useState(false);
    const [collapsed, setCollapsed] = React.useState(false);
    const [bp, setBp] = useState([]);
    const [gejalas, setGejalas] = useState([]);
    const [kerusakans, setKerusakans] = useState([]);
    const [addBp, setAddBp] = useState({});

    const getGejalas = async () => {
        const res = await axios.get(`${CONFIG.BASE_URL}/api/gejala`);
        setGejalas(res.data)
    }
    const getKerusakan = async () => {
        const res = await axios.get(`${CONFIG.BASE_URL}/api/kerusakan`);
        setKerusakans(res.data)
    }
    const getBp = async () => {
        const res = await axios.get(`${CONFIG.BASE_URL}/api/basis-pengetahuan`);
        setBp(res.data)
    }
    const handleChange = e => {
        const { value, name } = e.target;
        setAddBp({ ...addBp, [name]: value });
    }
    const handleSubmit = e => {
        e.preventDefault();
        const newAddData = {
            bobot: parseFloat(addBp.bobot),
            kode_gejala: parseInt(addBp.kode_gejala),
            kode_kerusakan: parseInt(addBp.kode_kerusakan)
        }
        console.log(newAddData)
        axios({
            method:'POST',
            url: `${CONFIG.BASE_URL}/api/basis-pengetahuan/`,
            headers: {
                'Content-Type':'application/json'
            },
            data: newAddData
        })
         .then((res) => {
            console.log(res);
            handleClose();
            window.location.reload(false)
         })
         .catch(e => {
            console.log(e)
         })
    }
    const handleDelete = id => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
              axios.delete(`${CONFIG.BASE_URL}/api/basis-pengetahuan/${id}`)
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
              window.location.reload(false)
            }
          })
    }
    const toggleCollapsed = _ => {
        setCollapsed(!collapsed);
    }
    const handleClose = _ => setShow(false);
    const handleShow = _ => setShow(true);

    useEffect(() => {
        getBp();
        getGejalas();
        getKerusakan();
    }, [])
    return (
        <>
            <div className="wrapper">
                <AsideComp isCollapsed={collapsed} />
                <div className="main">
                    <AdminNavbar toggleBtn={toggleCollapsed} />
                    <main className="content px-3 py-2">
                        <div className="container-fluid">
                            <div className="mb-3">
                                <h4>Basis Pengetahuan</h4>
                                <button className="btn btn-secondary mb-3" onClick={handleShow} >
                                    <i className="bi bi-file-earmark-plus-fill"></i>
                                </button>
                            </div>
                            {/* CONTENT */}

                            <ModalComponent show={show} handleClose={handleClose} kerusakans={kerusakans} gejalas={gejalas} handleSubmit={handleSubmit} handleChange={handleChange} />
                            <TableComponent handleDelete={handleDelete} bp={bp} />

                        </div>
                    </main>
                    <ThemeTogggleComp />
                    <FooterComp />
                </div>
            </div>
        </>
    )
}