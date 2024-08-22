import { Link } from "react-router-dom";
import Logo from '../assets/Logo.png';
import { TbMedicineSyrup } from "react-icons/tb";
import { LuClipboardList } from "react-icons/lu";
import { FaBook } from "react-icons/fa";
import { FaList } from "react-icons/fa6";
import { MdOutlineWorkHistory } from "react-icons/md";

const AsideComp = ({ isCollapsed }) => {
    return (
        <aside id="sidebar" className={`js-sidebar  ${isCollapsed ? 'collapsed' : ''} `}>
            {/* Content For Sidebar */}
            <div className="h-100">
                <div className="sidebar-logo">
                    <Link to={'/'} style={{ textDecoration: 'none' }}>
                        <img src={Logo} alt="log" className='' height={'35px'} /> Pakar Motor
                    </Link>
                </div>
                <ul className="sidebar-nav">
                    <li className="sidebar-item">
                        <Link to={'/admin'} className="sidebar-link" style={{ textDecoration: 'none' }}>
                        <FaList className='me-2' />
                            Dashboard
                        </Link>
                    </li>
                    <li className="sidebar-item">
                        <Link to={'/admin-gejala'} className="sidebar-link" style={{ textDecoration: 'none' }}>
                            <TbMedicineSyrup className='me-2'/>
                            Data Gejala
                        </Link>
                    </li>
                    <li className="sidebar-item">
                        <Link to={'/admin-kerusakan'} className="sidebar-link" style={{ textDecoration: 'none' }}>
                         <LuClipboardList className='me-2'/>
                            Data Kerusakan
                        </Link>
                    </li>
                    <li className="sidebar-item">
                        <Link to={'/admin-data-pakar'} className="sidebar-link" style={{ textDecoration: 'none' }}>
                        <FaBook className='me-2'/>
                            Basis Pengetahuan
                        </Link>
                    </li>
                    <li className="sidebar-item">
                        <Link to={'/admin-riwayat'} className="sidebar-link" style={{ textDecoration: 'none' }}>
                        <MdOutlineWorkHistory className="me-2" />
                            Riwayat Diagnosa
                        </Link>
                    </li>
                    {/* <li className="sidebar-item">
                        <Link to={'/admin-data-kasus'} className="sidebar-link" style={{ textDecoration: 'none' }}>
                        <MdOutlineWorkHistory className="me-2" />
                            Data Kasus
                        </Link>
                    </li> */}
                    {/* <li className="sidebar-item">
                        <Link to={'/admin-kasus'} className="sidebar-link" style={{ textDecoration: 'none' }}>
                        <HiOutlineClipboardDocumentList className="me-2"/>
                            Data Kasus
                        </Link>
                    </li> */}
                </ul>
            </div>
        </aside>

    )
}

export default AsideComp;