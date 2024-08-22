/* eslint-disable */
import React, { useState } from 'react';
import Axios from 'axios';
import { Link } from "react-router-dom";
import {Modal} from 'react-bootstrap';

import FooterComp from '../components/FooterComp';
import Swal from 'sweetalert2';
import AsideComp from '../components/AsideComp';
import axios from 'axios';

import CONFIG  from '../global/config';

const ThemeTogggleComp = _ => {
    return (
        <a href="#" className="theme-toggle">
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

const TableComponent = ({gejalas, handleDelete}) => {
    return (
        <>
            <div className="card border-0">
                <div className="card-header">
                    <h5 className="card-title">Riwayat Diagnosa User</h5>
                </div>
                <div className="card-body">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Kode Gejala</th>
                                <th scope="col">Nama Gejala</th>
                                <th scope="col">Button</th>
                            </tr>
                        </thead>
                        <tbody>
                            {gejalas && gejalas.map(gejala => {
                                return (
                                    <tr key={gejala.id}>
                                        <th scope="row">{gejala.id}</th>
                                        <td>{gejala.nama}</td>
                                        <td>
                                            <button onClick={() => handleDelete(gejala.id)} type="button" className="btn btn-danger btn-sm">
                                                <i className="bi bi-trash" />
                                            </button>
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

const ModalComponent = ({show, handleClose, handleChange, handleSubmit}) => {
    return (
        <Modal show={show} onHide={handleClose}>
                <div className="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Tambah Gejala</h5>
                        </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">
                                    Nama Gejala
                                </label>
                                <input type="text" className="form-control" id="" name='nama' onChange={handleChange} />
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

export default function AdminDataKasus() {
    const [show, setShow] = React.useState(false);
    const [riwayats, setRiwayats] = useState([])
    const [collapsed, setCollapsed] = React.useState(false);
    const [dataKasus, setDataKasus] = React.useState([]);
    const [gejalas, setGejalas] = React.useState([]);
    const [penyakits, setPenyakits] = React.useState([]);
    const [addGejala, setAddGejala] =  React.useState({});

    const handleChange = e => {
        const {value, name} = e.target;
        setAddGejala({...addGejala, [name]: value});
    }
    const handleSubmit = e => {
        e.preventDefault();
        // postData()
        Axios({
            method:'POST',
            url: `${CONFIG.BASE_URL}/api/data-kasus/`,
            headers: {
                'Content-Type':'application/json'
            },
            data: addGejala
        })
         .then((res) => {
            console.log(res);
            setDataKasus(prevState => {
                return [res.data, ...prevState]
            });
            handleClose();
            window.location.reload(false)
         })
         .catch(e => {
            console.log(e)
         })

    }
    const getRiwayat = async () => {
        const response = await Axios.get(`${CONFIG.BASE_URL}/api/data-kasus`);
        setRiwayats(response.data)
    }
    const getGejala = async () => {
        const res = await axios.get(`${CONFIG.BASE_URL}/api/gejala`)
        setGejalas(res.data)
    }
    const getPenyakit = async () => {
        const res = await axios.get(`${CONFIG.BASE_URL}/api/kerusakan`);
        setPenyakits(res.data)
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
              Axios.delete(`${CONFIG.BASE_URL}/api/riwayat/${id}`)
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

    React.useEffect(() => {
        getRiwayat()
        getGejala()
        getPenyakit()
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
                                <h4>Admin Kasus</h4>
                            </div>
                            {/* CONTENT */}

                            <ModalComponent show={show} handleClose={handleClose} handleChange={handleChange} handleSubmit={handleSubmit} />
                            {/* <TableComponent gejalas={gejalas} handleDelete={handleDelete}/> */}
                            {riwayats && riwayats.map(riwayat => {
                                const gejala_array = riwayat.list_gejala.split(',')
                                const id_gejala = gejala_array.map(Number);
                                const list_gejala = gejalas.filter(gejala => id_gejala.includes(gejala.id));
                                const kerusakan = penyakits.filter(p => p.id === riwayat.kerusakan);
                                // console.log(penyakits)
                                return (
                                    <div className="card">
                                        <div className="card-body">
                                            <strong>Kerusakan: {kerusakan[0] && kerusakan[0].nama}</strong> <br />
                                            <strong>Hasil: {riwayat.hasil} %</strong> <br />
                                            <strong>Daftar Gejala:</strong> <br />
                                            <ul className='list-group'>
                                                {list_gejala && list_gejala.map(i => {
                                                    return (
                                                        <li className='list-group-item'>{i.nama}</li>
                                                    )
                                                })}
                                            </ul>
                                        </div>
                                    </div>

                                )
                            })}

                        </div>
                    </main>
                    <ThemeTogggleComp />
                    <FooterComp/>   
                </div>
            </div>
        </>
    )
}