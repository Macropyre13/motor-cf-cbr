import NavbarComp from '../components/NavbarComp';
import AboutSection from '../components/AboutSection';
import FooterComp from '../components/FooterComp';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CONFIG from '.././global/config';

export default function KerusakanPage(){
    const [kerusakans, setKerusakans] = useState([]);
    const getKerusakan = async () => {
        const res = await axios.get(`${CONFIG.BASE_URL}/api/kerusakan/`);
        setKerusakans(res.data)
    }

    useEffect(() => {
        getKerusakan()
    },[])
    return (
        <>
            <NavbarComp/>
            <header className="py-3 bg-dark">
                <div className="container px-3">
                <div className="row justify-content-center">
                    <div className="col-lg-8 col-xxl-6">
                    <div className="text-center my-5">
                        <h1 className="fw-bolder mb-3" style={{ color: "white" }}>
                        Data Kerusakan
                        </h1>
                    </div>
                    </div>
                </div>
                </div>
            </header>
                {kerusakans && kerusakans.map(i => {
                    return (
                            <AboutSection key={i.id} idx={i} nama={i.nama} deskripsi={i.deskripsi} gambar={`${CONFIG.BASE_URL}${i.gambar}`} />
                    )
                })}

            <FooterComp />

        </>
    )
}