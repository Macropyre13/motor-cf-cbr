import NavbarComp from '../components/NavbarComp';
import HeaderComp  from '../components/HeaderComp';
import FooterComp from '../components/FooterComp';

import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="d-flex flex-column h-100">
            <main className="flex-shrink-0">
                <NavbarComp/>
                <HeaderComp/>
                <section className="py-5" id="features">
                    <div className="container px-5 my-5">
                        <div className="row gx-5">
                            <div className="col-lg-8">
                                <div className="row gx-5 row-cols-1 row-cols-md-2">
                                    <div className="col mb-5 h-100">
                                        <Link to={'/data/kerusakan'}>
                                            <button type="button" className="btn btn-success">
                                                <i className="bi bi-archive-fill" />
                                            </button>
                                        </Link>
                                        <h2 className="h5">Data Kerusakan</h2>
                                        <p className="mb-0">
                                            Menampilkan seluruh data kerusakan motor
                                        </p>
                                    </div>
                                    <div className="col mb-5 h-100">
                                        <Link to={'/diagnosa'}>
                                            <button type="button" className="btn btn-success">
                                                <i className="bi bi-archive-fill" />
                                            </button>
                                        </Link>
                                        <h2 className="h5">Diagnosa</h2>
                                        <p className="mb-0">
                                            Melakukan diagnosa terhadap motor
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>        

            </main>
            <FooterComp/>
        </div>
    )
}

export default HomePage;