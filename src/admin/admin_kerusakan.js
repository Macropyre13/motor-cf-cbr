import React, { useState } from 'react';
import Axios from 'axios'
import { Link } from "react-router-dom";
import { Modal } from 'react-bootstrap';
import config from '../global/config';
import AsideComp from '../components/AsideComp';

import FooterComp from '../components/FooterComp';
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

const TableComponent = ({kerusakans, handleDelete}) => {
    return (
        <>
            <div className="card border-0">
                <div className="card-header">
                    <h5 className="card-title">Data Kerusakan Sepeda Motor</h5>
                </div>
                <div className="card-body">
                    <table className="table">
                        <thead>
                            <tr>

                                <th scope="col">Kode</th>
                                <th scope="col">Nama</th>
                                
                                <th scope="col">Solusi</th>
                                <th scope="col">Button</th>

                            </tr>
                        </thead>
                        <tbody>
                            {kerusakans && kerusakans.map(kerusakan => {
                                return (
                                    <tr key={kerusakan.id}>
                                        <th scope="row">{kerusakan.id}</th>
                                        <td>{kerusakan.nama}</td>
                                        <td>
                                            {kerusakan.solusi.slice(0, 10)}
                                        </td>
                                        <td>
                                            <Link to={`/admin-kerusakan-edit/${kerusakan.id}`} className="btn btn-warning btn-sm"><i
                                                className="bi bi-pencil-square"></i></Link>
                                            <button onClick={() => handleDelete(kerusakan.id)} type="button" className="btn btn-danger btn-sm"><i
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

const ModalComponent = ({ show, handleClose, handleChange, handleSubmit }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Tambah Data Kerusakan</h5>
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
                            <label htmlFor="nama" className="form-label">
                                Nama Kerusakan
                            </label>
                            <input type="text" className="form-control" id="nama" name='nama' onChange={handleChange} />
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
                            />
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

export default function AdminKerusakan() {
    const [show, setShow] = React.useState(false);
    const [collapsed, setCollapsed] = React.useState(false);
    const [kerusakans, setKerusakan] = React.useState([]);
    const [addKerusakan, setAddKerusakan] = useState({});

    const handleChange = e => {
        const {value, name} = e.target;
        setAddKerusakan({...addKerusakan, [name]: value})
    }
    const handleSubmit = e => {
        e.preventDefault();
        console.log(addKerusakan)
        Axios({
            method:'POST',
            url: `${config.BASE_URL}/api/kerusakan/`,
            headers: {
                'Content-Type':'application/json'
            },
            data: addKerusakan
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
              Axios.delete(`${config.BASE_URL}/api/kerusakan/${id}`)
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
              window.location.reload(false)
            }
          })
    }
    const getKerusakan = async () => {
        const response = await Axios.get(`${config.BASE_URL}/api/kerusakan`);
        setKerusakan(response.data)
    }
    const toggleCollapsed = _ => {
        setCollapsed(!collapsed);
    }
    const handleClose = _ => setShow(false);
    const handleShow = _ => setShow(true);

    React.useEffect(() => {
        getKerusakan()
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
                                <h4>Admin Kerusakan</h4>
                                <button className="btn btn-secondary mb-3" onClick={handleShow} >
                                    <i className="bi bi-file-earmark-plus-fill"></i>
                                </button>
                            </div>
                            {/* CONTENT */}

                            <ModalComponent show={show} handleClose={handleClose} handleChange={handleChange} handleSubmit={handleSubmit} />
                            <TableComponent kerusakans={kerusakans} handleDelete={handleDelete} />

                        </div>
                    </main>
                    <ThemeTogggleComp />
                    <FooterComp />
                </div>
            </div>
        </>
    )
}