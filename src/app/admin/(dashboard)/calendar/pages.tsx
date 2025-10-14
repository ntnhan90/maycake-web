import { Container } from "react-bootstrap";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calender Page",
  // other metadata
};

export default function AdminCalender(){
    return (
        <Container >
            CalendarBox
        </Container>
    )
}