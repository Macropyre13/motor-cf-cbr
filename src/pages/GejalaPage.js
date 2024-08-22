import NavbarComp from '../components/NavbarComp';
import AboutSection from '../components/AboutSection';
import FooterComp from '../components/FooterComp';

export default function GejalaPage(){
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

            {[1,2,3].map(i => {
                return (
                    <AboutSection idx={i} />
                )
            })}

            <FooterComp />

        </>
    )
}