
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { Col, Row, Form, Card, Button, FormCheck, Container, InputGroup } from '@themesberg/react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

import { Routes } from "../../routes";
import BgImage from "../../assets/img/illustrations/signin.svg";
import authService from "../../services/auth.service";
import toastrService from "../../services/toastr.service";


export default () => {
  let history = useHistory();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState("")
  
  const [firstNameRequired, setFirstNameRequired] = useState(null);
  const [lastNameRequired, setLastNameRequired] = useState(null);
  const [emailRequired, setEmailRequired] = useState(null);
  const [passwordRequired, setPasswordRequired] = useState(null);
  const [passwordConfirmationRequired, setPasswordConfirmationRequired] = useState(null);

  const isValidForm =()=>{
    if (!firstName){
      setFirstNameRequired('First name is required.')
    }
    else{
      setFirstNameRequired(null)
    }
    if (!lastName){
      setLastNameRequired('Last name is required.')
    }
    else{
      setLastNameRequired(null)
    }
    if (!email){
      setEmailRequired('Email address is required.')
    }
    else{
      setEmailRequired(null)
    }
    if (!password){
      setPasswordRequired('Password is required.')
    }
    else{
      setPasswordRequired(null)
    }
    if (!passwordConfirmation){
      setPasswordConfirmationRequired('Password confirmation is required.')
    }
    else if (password !== passwordConfirmation){
      setPasswordConfirmationRequired("Passwords does not match!")
    }
    else{
      setPasswordConfirmationRequired(null)
    }
    if(firstName && lastName && email && password && passwordConfirmation && password === passwordConfirmation){
      return true
    }
    else return false
  }

  const submitHandler = (e) => {
    e.preventDefault();
    if (isValidForm()){
    authService.register({ firstName, lastName, email, password })
      .then(response => {
        toastrService.showSuccessMessage("Please sign in", `Sign up successfully`)
        localStorage.setItem('token', response.data.token);
        history.push("/sign-in")
      }).catch(err => {
        toastrService.showErrorMessage("Email already exists", `Sign up failed`)
        console.log(err)
      });
    }
  }
  return (
    <main>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <Row className="justify-content-center form-bg-image" style={{ backgroundImage: `url(${BgImage})` }}>
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="mb-4 mb-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Create an account</h3>
                </div>
                <Form className="mt-4" onSubmit={submitHandler}>
                <Form.Group id="firstName" className="mb-4">
                    <Form.Label>Your First Name</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUser} />
                      </InputGroup.Text>
                      <Form.Control autoFocus type="text" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="First Name" />
                      <div className="text-start w-100 d-block invalid-feedback">{firstNameRequired}</div>
                    </InputGroup>
                  </Form.Group>
                  <Form.Group id="lastName" className="mb-4">
                    <Form.Label>Your Last Name</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUser} />
                      </InputGroup.Text>
                      <Form.Control type="text" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Last Name" />
                      <div className="text-start w-100 d-block invalid-feedback">{lastNameRequired}</div>
                    </InputGroup>
                  </Form.Group>
                  <Form.Group id="email" className="mb-4">
                    <Form.Label>Your Email</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroup.Text>
                      <Form.Control autoFocus type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="example@company.com" />
                      <div className="text-start w-100 d-block invalid-feedback">{emailRequired}</div>
                    </InputGroup>
                  </Form.Group>
                  <Form.Group id="password" className="mb-4">
                    <Form.Label>Your Password</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUnlockAlt} />
                      </InputGroup.Text>
                      <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
                      <div className="text-start w-100 d-block invalid-feedback">{passwordRequired}</div>
                    </InputGroup>
                  </Form.Group>
                  <Form.Group id="confirmPassword" className="mb-4">
                    <Form.Label>Confirm Password</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUnlockAlt} />
                      </InputGroup.Text>
                      <Form.Control type="password" value={passwordConfirmation} onChange={e => setPasswordConfirmation(e.target.value)} placeholder="Confirm Password" />
                      <div className="text-start w-100 d-block invalid-feedback">{passwordConfirmationRequired}</div>
                    </InputGroup>
                  </Form.Group>
                  <FormCheck type="checkbox" className="d-flex mb-4">
                    <FormCheck.Input id="terms" className="me-2" />
                    <FormCheck.Label htmlFor="terms">
                      I agree to the <Card.Link>terms and conditions</Card.Link>
                    </FormCheck.Label>
                  </FormCheck>

                  <Button variant="primary" type="submit" className="w-100">
                    Sign up
                  </Button>
                </Form>

                <div className="mt-3 mb-4 text-center">
                  <span className="fw-normal">or</span>
                </div>
                <div className="d-flex justify-content-center my-4">
                  <Button variant="outline-light" className="btn-icon-only btn-pill text-facebook me-2">
                    <FontAwesomeIcon icon={faFacebookF} />
                  </Button>
                  <Button variant="outline-light" className="btn-icon-only btn-pill text-twitter me-2">
                    <FontAwesomeIcon icon={faTwitter} />
                  </Button>
                  <Button variant="outline-light" className="btn-icon-only btn-pil text-dark">
                    <FontAwesomeIcon icon={faGithub} />
                  </Button>
                </div>
                <div className="d-flex justify-content-center align-items-center mt-4">
                  <span className="fw-normal">
                    Already have an account?
                    <Card.Link as={Link} to={Routes.Signin.path} className="fw-bold">
                      {` Login here `}
                    </Card.Link>
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};
