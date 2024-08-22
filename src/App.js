import {Routes, Route, BrowserRouter} from 'react-router-dom';

import HomePage from './pages/HomePage';
import DiagnosaPage from './pages/DiagnosaPage';
import GejalaPage from './pages/GejalaPage';
import KerusakanPage from './pages/KerusakanPage';
import LoginPage from './pages/LoginPage';
import HasilPage from './pages/HasilPage';
import Dashboard from './admin/dashboard';
import AdminGejala from './admin/admin_gejala';
import AdminKerusakan from './admin/admin_kerusakan';
import AdminPakar from './admin/admin_pakar';
import AdminGejalaEdit from './admin/admin_gejala_edit';
import AdminKerusakanEdit from './admin/admin_kerusakan_edit';
import AdminBpEdit from './admin/admin_bp_edit';
import HalamanPenyakit from './pages/HalamanPenyakit';
import RiwayatPage from './pages/RiwayatPage';
import AdminRiwayat from './admin/admin_riwayat';
import AdminKasus from './admin/admin_kasus';
import AdminDataKasus from './admin/admin_data_kasus';

function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/diagnosa' element={<DiagnosaPage/>} />
        <Route path='/hasil' element={<HasilPage/>} />
        <Route path='/data/gejala'  element={<GejalaPage/>} />
        <Route path='/data/kerusakan' element={<KerusakanPage/>} />
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/riwayat' element={<RiwayatPage/>} />
        <Route path='/penyakit/:penyakitId' element={<HalamanPenyakit/>} />

        <Route path='/admin' element={<Dashboard/>} />
        <Route path='/admin-gejala' element={<AdminGejala/>} />
        <Route path='/admin-gejala-edit/:gejalaId' element={<AdminGejalaEdit/>} />
        <Route path='/admin-kerusakan' element={<AdminKerusakan/>} />
        <Route path='/admin-kerusakan-edit/:kerusakanId' element={<AdminKerusakanEdit/>} />
        <Route path='/admin-data-pakar' element={<AdminPakar/>} />
        <Route path='/admin-bp-edit/:bpId' element={<AdminBpEdit/>} />
        <Route path='/admin-riwayat' element={<AdminRiwayat/>} />
        <Route path='/admin-kasus' element={<AdminKasus/>} />
        <Route path='/admin-data-kasus' element={<AdminDataKasus/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;