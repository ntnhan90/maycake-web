import { Metadata } from 'next'
import { Card, CardBody, Form } from 'react-bootstrap';
export const metadata: Metadata = {
    title: 'Payments',
    description: 'The best restaurant in the world'
}
export default function PaymentsPage() {
    return (
        <div className="row">
            <div className="col-12 col-md-3">
                <h2>Payment methods</h2>
                <p className="text-muted">Setup payment methods for website</p>
            </div>
            <div className="col-12 col-md-9">
                <Card>
                    <CardBody>
                        <div className="mb-3 position-relative">
                            <label className="form-label">
                                Default payment method
                            </label>
                            <Form.Select className="form-select" aria-label="Default select example">
                                <option value="cod" selected>Cash on delivery (COD)</option>
                                <option value="bank_transfer">Bank Transfer</option>
                                <option value="paypal">Paypal</option>
                            </Form.Select>
                            
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}