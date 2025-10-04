//import node modules libraries
import { Container } from "react-bootstrap";

//import custom components

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="d-flex flex-column justify-content-center vh-100">
        <section>
            <Container>{children}</Container>
        </section>
        <div className='custom-container text-center mt-4'>
            <span className='me-1'>Theme distributed by - </span>
            <a href='https://www.dotsgrowth.com/' target='_blank' rel='noopener '>
            Dotsgrowth
            </a>
        </div>
    </div>
  );
};

export default AuthLayout;