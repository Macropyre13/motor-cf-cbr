import { Link } from 'react-router-dom';
import MotorJumbotron from '../assets/Beranda.png'

const HeaderComp = () => {
    return (
        <header className="bg-dark py-5">
            <div className="container px-5">
                <div className="row gx-5 align-items-center justify-content-center">
                    <div className="col-lg-8 col-xl-7 col-xxl-6">
                        <div className="my-2 text-center text-xl-start">
                        <img
                            className="img-fluid rounded-3"
                            src={MotorJumbotron}
                            alt="..."
                        />
                            <h1 className="display-5 fw-bolder text-white mb-2 mt-2">
                                Selamat Datang Di Pakar Motor
                            </h1>
                            <p className="text-white-50 mb-4" style={{ textAlign:'justify' }}>
                               Pakar Motor Matic Honda, Periksa Gejala Kerusakan Anda Sekarang Juga!!
                            </p>
                            <div className="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xl-start">
                                <Link className="btn btn-primary btn-lg px-4 me-sm-3" to={'/diagnosa'}>
                                    Mulai Diagnosa
                                </Link>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </header>

    )
}

export default HeaderComp;