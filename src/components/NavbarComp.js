import { Link } from "react-router-dom";
import { GoGear } from "react-icons/go";

const NavbarComp = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <div className="container px-5">
                <Link className="navbar-brand fw-semibold" to='/'>
                <GoGear className="me-3"/>
                    PAKAR MOTOR
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to='/'>
                                Beranda
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/diagnosa'>
                                Diagnosa
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/data/kerusakan'>
                                Data Kerusakan
                            </Link>
                        </li>
                        {/* <li className="nav-item">
                            <Link className="nav-link" to={'/riwayat'}>
                                Riwayat
                            </Link>
                        </li> */}
                        <li className="nav-item">
                            <Link className="nav-link" to='/login'>
                                Login Admin
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    )
}

export default NavbarComp;