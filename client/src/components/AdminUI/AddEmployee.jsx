import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom'
import GoBackHeading from '../GoBackHeading';
import { toast } from 'react-toastify';

const AddEmployee = () => {
    const history = useHistory();

    const [branches, setBranches] = useState([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [chosenBranch, setChosenBranch] = useState("");

    useEffect(() => {
        const asyncFetch = async () => {
            try {
                const { data } = await axios("http://localhost:1000/api/auth");
                setBranches(data.branches);
            } catch (error) {
                console.log(error);
            }
        };

        asyncFetch();
    }, []);

    const goBackHandler = () => history.push('/');

    const submitHandler = async e => {
        e.preventDefault();

        try {
            const body = {
                firstName,
                lastName,
                email,
                branch: chosenBranch
            };

            const { data } = await axios.post('http://localhost:1000/api/employees', body, {
                headers: {
                    'authorization': `${localStorage.token}`
                }
            });

            if (data && data.error === false) {
                toast.success(`עובד נוסף בהצלחה`, { autoClose: 2000 });
                setFirstName("");
                setLastName("");
                setEmail("");
                setChosenBranch("");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <GoBackHeading title="הוספת עובד" buttonHandler={goBackHandler} />

            <Form dir="rtl" className="text-right w-50 mx-auto" onSubmit={e => submitHandler(e)}>
                <Form.Group>
                    <Form.Label>שם פרטי</Form.Label>
                    <Form.Control
                        value={firstName}
                        type="text"
                        placeholder="שם פרטי"
                        onChange={e => setFirstName(e.target.value)}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>שם משפחה</Form.Label>
                    <Form.Control
                        value={lastName}
                        type="text"
                        placeholder="שם משפחה"
                        onChange={e => setLastName(e.target.value)}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>אימייל</Form.Label>
                    <Form.Control
                        value={email}
                        type="email"
                        placeholder="אימייל"
                        onChange={e => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Text className="text-muted">
                    נשלח על ידי:
                </Form.Text>
                <Form.Control
                    dir="rtl"
                    as="select"
                    custom
                    value={chosenBranch}
                    onChange={e => setChosenBranch(e.target.value)}
                >
                    <option disabled value="">בחר סניף</option>
                    {branches.length > 0 && branches.map(branch => <option key={branch._id} value={branch._id}>{branch.name}</option>)}
                </Form.Control>

                <Button type="submit" className="mt-5 w-100" variant="info">הוספת עובד</Button>
            </Form>
        </>
    );
};

export default AddEmployee;
