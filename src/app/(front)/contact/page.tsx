import ContactForm from "./contactForm";

export default function FContactPage() {
    return (
        <section className="contact spad">
            <div className="container">
                <div className="map">
                    <div className="container">
                        <div className="row d-flex justify-content-center">
                            <div className="col-lg-4 col-md-7">
                                <div className="map__inner">
                                    <h6>COlorado</h6>
                                    <ul>
                                        <li>1000 Lakepoint Dr, Frisco, CO 80443, USA</li>
                                        <li>Sweetcake@support.com</li>
                                        <li>+1 800-786-1000</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="map__iframe">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d10784.188505644011!2d19.053119335158936!3d47.48899529453826!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1543907528304" height="300"></iframe>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4">
                        <div className="contact__text">
                            <h3>Contact With us</h3>
                            <ul>
                                <li>Representatives or Advisors are available:</li>
                                <li>Mon-Fri: 5:00am to 9:00pm</li>
                                <li>Sat-Sun: 6:00am to 9:00pm</li>
                            </ul>
                            <img src="img/cake-piece.png" alt="" />
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="contact__form">
                           <ContactForm />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
