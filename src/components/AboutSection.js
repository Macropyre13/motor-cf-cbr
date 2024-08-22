export default function AboutSection({idx, nama, deskripsi, gambar}){
    return (
        <>
            <section className={idx % 2 === 0 ? 'py-1 bg-light':'py-1'} id="scroll-target">
                <div className="container px-3">
                    {/* <div class="card" style={{ width: '18rem' }}>
                        <img src={gambar} class="card-img-top" alt="..." />
                        <div class="card-body">
                            <strong>{nama}</strong>
                            <p class="card-text">{deskripsi.slice(0,100)}</p>
                        </div>
                    </div> */}
                    <div className="card p-3">
                    <div className="row gx-3 align-items-center">
                        <div className={idx % 2 === 0 ? 'col-lg-4':'col-lg-4 order-first order-lg-last'}>
                            <img
                                className="img-fluid rounded"
                                // height={200}
                                src={gambar}
                                alt="..."
                            />
                        </div>
                        <div className="col-lg-8">
                            <h2 className="fw-bolder">{nama}</h2>
                            <p className="text-muted mb-0" style={{ textAlign:'justify' }}>
                                {deskripsi.slice(0,150)}...
                            </p>
                        </div>
                    </div>
                    </div>
                </div>
            </section>

        </>
    )
}