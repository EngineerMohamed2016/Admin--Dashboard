import React, { useEffect } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { login, setEmail, setErrorMsg, setSuccessMsg, setPassword } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';

export default function Login() {

    const { email, password, successMsg, errorMsg, isAuth } = useSelector(state => state.authSlice);
    const dispatch = useDispatch();
    const navigateTo = useNavigate();

    useEffect(() => {
        if (isAuth)
            navigateTo('/');
    }, [isAuth]);

    // reset success, error messages
    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(setSuccessMsg(''));
            dispatch(setErrorMsg(''));
        }, 5000);
        return () => clearTimeout(timer);
    }, [successMsg, errorMsg]);

    const handleEmail = (e) => dispatch(setEmail(e.target.value));
    const handlePassword = (e) => dispatch(setPassword(e.target.value));

    const handleLogin = async (e) => {
        e.preventDefault();
        dispatch(setErrorMsg(''));

        if (!email && !password)
            return dispatch(setErrorMsg('Please provide your email and password.'));

        if (!email)
            return dispatch(setErrorMsg('Please provide your email.'));

        if (!password)
            return dispatch(setErrorMsg('Please provide your password.'));

        dispatch(login({ email, password }))
    }

    return (
        <main className='vh-100 d-flex justify-content-center align-items-center text-white'>
            <Form className='bg-slate-900 w-350px w-sm-400px p-5 rounded rou'>
                <h1 className='text-center'>Sign In</h1>
                <h6 className='text-center text-white-50 mb-4'>Only admin can sign in.</h6>

                <Row className="mb-4">
                    <Form.Group as={Col} controlId="validationCustom02">
                        <Form.Label className='mb-1'>Email</Form.Label>
                        <Form.Control
                            onChange={handleEmail}
                            value={email}
                            className='px-3 py-1'
                            required
                            type="email"
                            placeholder="Email"
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                </Row>

                <Row className='mb-4 mt-1'>
                    <Form.Group as={Col} controlId="validationCustom02">
                        <Form.Label className='mb-1'>Password</Form.Label>
                        <Form.Control
                            onChange={handlePassword}
                            value={password}
                            className='px-3 py-1'
                            required
                            type="password"
                            placeholder="Password"
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                </Row>

                <div className='mt-2'>
                    {
                        errorMsg && <p className='text-danger text-center'>{errorMsg}</p>
                    }
                    {
                        successMsg && <p className='text-grdanger text-center'>{successMsg}</p>
                    }
                </div>

                <Row>
                    <Button onClick={handleLogin} className='px-3 py-1 mt-2 mx-auto' type="submit">Login</Button>
                </Row>
            </Form>
        </main>
    );
}    