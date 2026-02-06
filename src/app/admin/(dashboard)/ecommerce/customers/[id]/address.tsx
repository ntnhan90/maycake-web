import { Card, CardBody , CardTitle, CardHeader, Button, Form} from "react-bootstrap";

export default function AddressModal(){
    return(
        <Card className="mt-4">
                    <CardHeader>
                        <CardTitle>
                            Addresses   
                        </CardTitle>
                        <div className="card-actions">
                            <button className="btn   btn-trigger-add-address" type="button">
                            New address
                            </button>
                        </div>
                    </CardHeader>
                </Card>
    )
}