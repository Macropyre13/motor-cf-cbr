/* eslint-disable */
import { useEffect, useState } from "react";
import NavbarComp from "../components/NavbarComp";

import axios from 'axios';
import CONFIG from "../global/config";

export default function RiwayatPage(){
    const [kasus, setRiwayats] = useState();
    const getRiwayats = async _ => {
        const res = await axios.get(`${CONFIG.BASE_URL}/api/data-kasus`);
        setRiwayats(res.data)
    }

    useEffect(() => {
        getRiwayats()
    },[])
    return (
        <div className="d-flex flex-column">
            <div className="flex-shrink-0">
                <NavbarComp/>
                <header className="py-5 bg-dark">
                    <div className="container px-5">
                        <div className="row justify-content-center">
                            <div className="col-lg-8 col-xxl-6">
                                <div className="text-center my-5">
                                    <h1 className="fw-bolder mb-3" style={{ color: "white" }}>
                                        Riwayat Diagnosa
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <div className="py-3 bg-light">
                    <div className="container px-3">
                        <h1>Riwayat Page</h1>
                        {kasus && kasus.map(k => {
                            <div className="card">
                                <div className="card-body">
                                    <strong>Nama Penyakit: {k.kerusakan}</strong> <br />
                                    <ul className="list-group">
                                        <li>{k.list_kerusakan}</li>
                                    </ul>
                                </div>
                            </div>
                        })}
                        {/* {riwayats && riwayats.map(riwayat => {
                            const result = JSON.parse(riwayat.result)
                            console.log(result)
                            return (
                                <div className="card">
                                    <div className="card-body">
                                        <strong>Nama: {riwayat.nama}</strong> <br/>
                                        <small>{riwayat.tgl.substring(0,10)}</small>
                                        <ul className="list-group">
                                            {result[0].sort((a, b) => b.hasil - a.hasil).slice(0,3).map(list_result => {
                                                console.log(list_result)
                                                return (
                                                    <li className="list-group-item">
                                                        <strong>Kerusakan: {list_result.kerusakan.nama}</strong>
                                                        <br />
                                                         {list_result.hasil} % 
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                </div>

                            )
                        })} */}
                    </div>
                </div>
            </div>
        </div>
    )
}