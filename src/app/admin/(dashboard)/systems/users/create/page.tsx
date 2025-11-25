import { Card , Container , Nav} from 'react-bootstrap';
import UserForm from '../userForm';
import UserFormWrapper from './action';

export default function CreateUserPage() {
    return (
        <Container>
            <Card className="mb-4">
                <UserFormWrapper  />
            </Card>
        </Container>
    );
}