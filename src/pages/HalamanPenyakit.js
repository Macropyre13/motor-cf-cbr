/* eslint-disable */
import {useState, useEffect} from 'react';
import { Link, useParams} from 'react-router-dom'
import axios from 'axios';
import NavbarComp from '../components/NavbarComp';
import FooterComp from '../components/FooterComp';
import CONFIG  from '../global/config';
import { FaCircleArrowLeft } from 'react-icons/fa6';

export default function HalamanPenyakit(){
    const {penyakitId} = useParams();
    const [penyakit,setPenyakit] = useState();

    const getPenyakit = async () => {
        const res = await axios.get(`${CONFIG.BASE_URL}/api/kerusakan/${penyakitId}`);
        console.log(res.data)
        setPenyakit(res.data)
    }

    // eslint-disable-next-line no-use-before-define
    useEffect(() => {
        getPenyakit();
    },[])
    return (
        <>
            <NavbarComp/>
            <header className="py-5 bg-dark">
                <div className="container px-5">
                <div className="row justify-content-center">
                    <div className="col-lg-8 col-xxl-6">
                    <div className="text-center my-5">
                        <h1 className="fw-bolder mb-3" style={{ color: "white" }}>
                        DATA GEJALA
                        </h1>
                    </div>
                    </div>
                </div>
                </div>
            </header>

            <div className="container">
                        <Link to={'/hasil'} className="btn btn-dark mb-3 mt-2">
                            <FaCircleArrowLeft /> Kembali
                        </Link>
                <div className="card" >
                    <img src={`${CONFIG.BASE_URL}${penyakit && penyakit.gambar}`}className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h3>{penyakit && penyakit.nama}</h3>
                        <p className="card-text">{penyakit && penyakit.deskripsi}</p>
                        <strong>Solusi:</strong>
                        <p className="card-text">{penyakit && penyakit.solusi}</p>
                    </div>
                </div>
            </div>

            <FooterComp />

        </>
    )
}