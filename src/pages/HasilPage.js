/* eslint-disable */
import { useEffect, useState } from "react";
import NavbarComp from "../components/NavbarComp";
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import { FaCircleArrowLeft } from "react-icons/fa6";

export default function HasilPage() {
    const [metode, setMetode] = useState("CBR");
    const [resultCBR, setResultCBR] = useState([]);
    const [resultCF, setResultCF] = useState([]);
    const [namaPengguna, setNamaPengguna] = useState();
    const [gejalaPengguna, setNamaGejalaPengguna] = useState();

    const changeMethod = method => {
        setMetode(method);
    }
    const getDataFromLocalStorage = _ => {
        setResultCBR(JSON.parse(localStorage.getItem('result_cbr')));
        setResultCF(JSON.parse(localStorage.getItem('result_cf')));
    }

    useEffect(() => {
        getDataFromLocalStorage();
        setNamaPengguna(localStorage.getItem('nama_pengguna'));
        setNamaGejalaPengguna(JSON.parse(localStorage.getItem('gejala_pilihan')))
    }, [])
    return (
        <div className="d-flex flex-column">
            <div className="flex-shrink-0">
                <NavbarComp />
                <header className="py-5 bg-dark">
                    <div className="container px-5">
                        <div className="row justify-content-center">
                            <div className="col-lg-8 col-xxl-6">
                                <div className="text-center my-5">
                                    <h1 className="fw-bolder mb-3" style={{ color: "white" }}>
                                        Hasil Diagnosa Gejala Anda
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <section className="py-3 bg-light">
                    <div className="container px-3">
                        <Link to={'/diagnosa'} className="btn btn-dark mb-3">
                            <FaCircleArrowLeft /> Kembali
                        </Link>
                        {/* Contact form*/}
                        <div className="mb-3">
                            <div className="card">
                                <div className="card-header">
                                    <h6 className="card-subtitile text-muted">Info Pengguna</h6>
                                </div>
                                <div className="card-body">
                                    <strong>Nama: {namaPengguna && namaPengguna}</strong>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <td>No</td>
                                                <td>Gejala</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            
                                            {gejalaPengguna && gejalaPengguna.map((i,index) => {
                                                return (
                                                    <tr>
                                                        <td>{index + 1}</td>
                                                        <td>{i.nama}</td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                    {/* <ul>
                                        {gejalaPengguna && gejalaPengguna.map(i => {
                                            return (
                                                <li>{i.nama}</li>
                                            )
                                        })}
                                    </ul> */}
                                </div>
                            </div>
                            {/* <ul className="nav justify-content-center">
                                <li className="nav-item">
                                    <button className="nav-link" onClick={_ => changeMethod('CF')} >
                                        Certainty Factor
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link" onClick={_ => changeMethod('CBR')}>
                                        Case Based Reasoning
                                    </button>
                                </li>
                            </ul> */}
                            <Nav variant="tabs" defaultActiveKey="/home">
                                <Nav.Item>
                                    <a className={`nav-link ${metode == 'CBR' ? '':'active'}`} onClick={_ => changeMethod('CF')} >CF</a>
                                </Nav.Item>
                                <Nav.Item>
                                    <a className={`nav-link ${metode == 'CBR' ? 'active':''}`} onClick={_ => changeMethod('CBR')} >CBR</a>
                                </Nav.Item>
                            </Nav>
                            <div className="card border-0">
                                <div className="card-header">
                                    <h6 className="card-subtitle text-muted">
                                        Hasil Perhitungan
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">No</th>
                                                <th scope="col">Kerusakan</th>
                                                <th scope="col">Persentase</th>
                                            </tr>
                                        </thead>
                                        {metode === 'CF' ?
                                            <tbody>
                                                {/* {resultCF && resultCF.map(i => {
                                                    if(i.hasil){
                                                        return (
                                                        <tr>
                                                            <th scope="row">{i.kerusakan.id}</th>
                                                            <td>{i.kerusakan.nama}</td>
                                                            <td>{i.hasil}%</td>
                                                        </tr>
                                                        )
                                                    }
                                                })} */}
                                                {resultCF && resultCF.sort((a, b) => b.hasil - a.hasil).slice(0,5).map((i,idx) => {
                                                    if (i.hasil !== 0) {
                                                        return (
                                                            <tr>
                                                                <th scope="row">{idx+1}</th>
                                                                <td>
                                                                    <Link style={{ color: 'black', textDecoration: 'none' }} to={`/penyakit/${i.kerusakan.id}`}>
                                                                        {i.kerusakan.nama}
                                                                    </Link>
                                                                </td>
                                                                <td>{i.hasil}%</td>
                                                            </tr>
                                                        )
                                                    }
                                                })}
                                            </tbody> :
                                            <tbody>
                                                {resultCBR && resultCBR.sort((a, b) => b.hasil - a.hasil).slice(0,5).map((i,idx) => {
                                                    if (i.hasil !== 0) {
                                                        return (
                                                            <tr>
                                                                <th scope="row">{idx+1}</th>
                                                                <td>
                                                                    <Link style={{ color: 'black', textDecoration: 'none' }} to={`/penyakit/${i.kerusakan.id}`}>
                                                                        {i.kerusakan.nama}
                                                                    </Link>
                                                                </td>
                                                                <td>{i.hasil}%</td>
                                                            </tr>
                                                        )
                                                    }
                                                })}
                                            </tbody>
                                        }
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    )
}