/* eslint-disable */
import { useEffect, useState } from 'react';
import NavbarComp from '../components/NavbarComp'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../global/config';
import Swal from 'sweetalert2';

import { FaSquarePlus } from "react-icons/fa6";
import CONFIG from '../global/config';

const rumusCBR = (kerusakans, basisPengetahuan, realData) => {
    const result = [];
    for (let idx_kerusakan = 0; idx_kerusakan < kerusakans.length; idx_kerusakan++) {

        let w = []
        let s = 0

        for (let idx_bp = 0; idx_bp < basisPengetahuan.length; idx_bp++) {
            if(basisPengetahuan[idx_bp].kode_kerusakan == kerusakans[idx_kerusakan].id){
                w.push(basisPengetahuan[idx_bp].bobot)
            }
        }

        for (let idx_kb = 0; idx_kb < realData.length; idx_kb++) {
            for (let idx_bp = 0; idx_bp < basisPengetahuan.length; idx_bp++) {
                if(basisPengetahuan[idx_bp].kode_kerusakan == kerusakans[idx_kerusakan].id){
                    if(realData[idx_kb] == basisPengetahuan[idx_bp].kode_gejala){
                        const hitung = 1 * basisPengetahuan[idx_bp].bobot;
                        s = s + hitung
                    }
                }
            }
        }
        const w_sumed = w.reduce((acc, crrt) => acc + crrt, 0)
        console.log(w_sumed)
        result.push({kerusakan: kerusakans[idx_kerusakan], hasil: Math.round((s/w_sumed) * 100)})
    }

    return result;
}
function hitungCf(gejalas) {
    if(gejalas.length > 1){
        const a = gejalas[0].pakar * gejalas[0].user;
        const b = gejalas[1].pakar * gejalas[1].user;

        const cf_combine = a + (b * (1 - a));
        let cf_old = cf_combine;
        for (let i = 2; i < gejalas.length; i++) {
            const kali_user = gejalas[i].pakar * gejalas[i].user;
            const cf_combine2 = cf_old + (kali_user * (1 - cf_old));
            cf_old = cf_combine2
        }

        return cf_old;
    } else if(gejalas.length === 1) {
        const hasil = gejalas[0].pakar *gejalas[0].user;
        return hasil;
    } else {
        return 0;
    }
}
function rumusCf(kerusakans, basisPengetahuan, kasusBaru) {
    const resultCF = [];
    for (let i = 0; i < kerusakans.length; i++) {
        const current_kerusakan = [];
        const hitung_gejala = []
        const gejala_counted = []

        for (let j = 0; j < basisPengetahuan.length; j++) {
            if (kerusakans[i].id == basisPengetahuan[j].kode_kerusakan) {
                current_kerusakan.push(basisPengetahuan[j]);
            }
            
        }
        const sisa_bp = basisPengetahuan.length - current_kerusakan.length;
        for (let s = 0; s < sisa_bp; s++) {
            current_kerusakan.push({ kode_gejala: 0, kode_kerusakan: kerusakans[i].id, bobot: 0 })
        }
        
        for (let cp = 0; cp < current_kerusakan.length; cp++) {
            for (let gfu = 0; gfu < kasusBaru.length; gfu++) {
                if (current_kerusakan[cp].kode_gejala == kasusBaru[gfu].kode_gejala) {
                    gejala_counted.push({...current_kerusakan[cp],user:Number(kasusBaru[gfu].nilai)})
                }
            }
        }

        for (let gc = 0; gc < gejala_counted.length; gc++) {
            hitung_gejala.push({ pakar: gejala_counted[gc].bobot, user: gejala_counted[gc].user });
        }
        // console.log({kerusakan: kerusakans[i], hasil: Math.round(hitungCf(hitung_gejala)*100)})
        resultCF.push({ kerusakan: kerusakans[i], hasil: Math.round(hitungCf(hitung_gejala) * 100) })
    }
    return resultCF;
}

const DiagnosaPage = () => {
    const navigate = useNavigate();
    const [gejalas, setGejalas] = useState([]);
    const [nama, setNama] = useState();
    const [kerusakans, setKerusakans] = useState([]);
    const [basisPengetahuan, setBp] = useState([]);
    const [kasusBaru, setKasusBaru] = useState([]);

    const getGejalas = async _ => {
        const response = await axios.get(`${config.BASE_URL}/api/gejala`);
        setGejalas(response.data)
    }
    const getKerusakan = async _ => {
        const response = await axios.get(`${config.BASE_URL}/api/kerusakan`);
        setKerusakans(response.data)
    }
    const getBp = async _ => {
        const response = await axios.get(`${config.BASE_URL}/api/basis-pengetahuan`);
        setBp(response.data)
    }
    const handleChange = e => {
        const { name, value } = e.target;
        setKasusBaru([...kasusBaru, {kode_gejala:name,nilai:value}]);
    }
    const handleNama = e => {
        const {value} = e.target;
        setNama(value)
    } 
    const handleSubmit = e => {
        localStorage.removeItem('result_cbr')
        localStorage.removeItem('result_cf')
        if(nama == undefined){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Masukan nama!",
              });
        }else{
            localStorage.removeItem('nama_pengguna');
            localStorage.removeItem('gejala_pilihan');
            localStorage.setItem('nama_pengguna', nama);
            const getIdGejala = kasusBaru.map(i => Number(i.kode_gejala))
            const getKerusakanSelected = gejalas.filter(i => getIdGejala.includes(i.id));
            localStorage.setItem('gejala_pilihan', JSON.stringify(getKerusakanSelected));
            const removeData = kasusBaru && getIdGejala.reduce((acc, crrnt) => {
                acc[crrnt] = (acc[crrnt] || 0) + 1;
                return acc;
            }, {});
            const duplicateData = Object.entries(removeData)
                .filter(([key, value]) => value > 1)
                .map(([key]) => Number(key));
            const realData = getIdGejala.filter(kb => {
                return !duplicateData.includes(kb)
            })
    
            const resultCF = rumusCf(kerusakans, basisPengetahuan, kasusBaru);
            const resultCBR = rumusCBR(kerusakans, basisPengetahuan, realData)
        
            localStorage.setItem('result_cbr', JSON.stringify(resultCBR));
            localStorage.setItem('result_cf', JSON.stringify(resultCF));

            var date = new Date()
            const data = {nama: nama, tgl: date.toISOString(), result:`[${JSON.stringify(resultCBR)}, ${JSON.stringify(resultCF)}]`};
            axios.post(`${CONFIG.BASE_URL}/api/riwayat/`, data)
             .then(res => console.log(res.data))
             .catch(e => console.log(e))
    


            const hasilTerbesar = Math.max(...resultCF.map(item => item.hasil))
            // const penyakitPasti = resultCF.filter(item => item.hasil === hasilTerbesar)
            const penyakitPasti = resultCBR.filter(item => item.hasil > 80);
            if(penyakitPasti.length){
                const saveDataKasus = {
                    kerusakan: penyakitPasti[0].kerusakan.id,
                    list_gejala: getIdGejala.toString(),
                    hasil: penyakitPasti[0].hasil
                }
                axios.post(`${CONFIG.BASE_URL}/api/data-kasus/`, saveDataKasus)
                 .then(res => console.log(res.data))
                 .catch(e => console.log(e))
    
                navigate('/hasil')
            }else{
                navigate('/hasil')
            }
        }


    }

    useEffect(() => {
        getGejalas();
        getKerusakan();
        getBp();
    }, [])
    return (
        <div className="d-flex flex-column">
            <div className="flex-shrink-0">
                <NavbarComp />
                {/* Header*/}
                <header className="py-5 bg-dark">
                    <div className="container px-5">
                        <div className="row justify-content-center">
                            <div className="col-lg-8 col-xxl-6">
                                <div className="text-center my-5">
                                    <h1 className="fw-bolder mb-3" style={{ color: "white" }}>
                                        Periksa Motor Anda!
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <section className="py-5 bg-light">
                    <div className="container px-2">
                        {/* Contact form*/}
                        <div className="mb-3">
                            <h4 style={{ textAlign: "center" }}>Data Gejala</h4>
                        </div>
                        {/* Table Element */}
                        <div className="card">
                            <div className="card-header">
                                <h6 className="card-subtitle text-muted">
                                    Masukan Nama
                                </h6>
                            </div>
                            <div className="card-body">
                                <div className="mb-3">
                                    <input onChange={handleNama} type="text" className="form-control" id="exampleFormControlInput1" placeholder="Masukan nama anda.." />
                                </div>

                            </div>
                        </div>
                        <div className="card border-0">
                            <div className="card-header">
                                <h6 className="card-subtitle text-muted">
                                    Pilih Gejala Yang Anda Alami!
                                </h6>
                            </div>
                            <div className="card-body">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Gejala</th>
                                            <th scope="col">Pilih</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {gejalas && gejalas.map(gejala => {
                                            return (
                                                <tr key={gejala.id}>
                                                    <td>{gejala.nama}</td>
                                                    <td>
                                                        <select id={gejala.id} className="form-select" onChange={handleChange} name={gejala.id}>
                                                            <option>Pilih</option>
                                                            <option value={'0.2'}>Tidak Yakin</option>
                                                            <option value={'0.4'}>Mungkin</option>
                                                            <option value={'0.6'}>Kemungkinan Besar</option>
                                                            <option value={'0.8'}>Hampir Pasti</option>
                                                            <option value={'1.0'}>Pasti</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                                <div className="d-flex justify-content-evelny">
                                    <button className="fab" onClick={handleSubmit}>
                                        <FaSquarePlus />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default DiagnosaPage;