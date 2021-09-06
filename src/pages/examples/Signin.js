
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { Col, Row, Form, Card, Button, FormCheck, Container, InputGroup } from '@themesberg/react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import authService from "../../services/auth.service";

import { Routes } from "../../routes";
import BgImage from "../../assets/img/illustrations/signin.svg";

//Toastr
import toastrService from "../../services/toastr.service";

export default () => {
  let history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailRequired, setEmailRequired] = useState(null);
  const [passwordRequired, setPasswordRequired] = useState(null);

  const isValidForm =()=>{
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
    if(email && password){
      return true
    }
    else return false
  }

  const submitHandler = (e) => {
    e.preventDefault();
    if (isValidForm()){
    authService.login({ email, password })
      .then(response => {
        toastrService.showSuccessMessage("Welcome to your access panel", `Sign in successful`)
        localStorage.setItem('token', response.data.token);
        history.push("/")
      }).catch(err => {
        toastrService.showErrorMessage("You have entered an invalid username or password", `Sign in failed`)
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
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Sign in to our platform</h3>
                </div>
                <Form className="mt-4" onSubmit={submitHandler}>
                  <Form.Group id="email" className="mb-4">
                    <Form.Label>Your Email</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroup.Text>
                      <Form.Control autoFocus value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="example@company.com" />
                      <div className="text-start w-100 d-block invalid-feedback">{emailRequired}</div>
                    </InputGroup>
                  </Form.Group>
                  <Form.Group>
                    <Form.Group id="password" className="mb-4">
                      <Form.Label>Your Password</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faUnlockAlt} />
                        </InputGroup.Text>
                        <Form.Control value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" />
                        <div className="text-start w-100 d-block invalid-feedback">{passwordRequired}</div>
                      </InputGroup>
                    </Form.Group>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <Form.Check type="checkbox">
                        <FormCheck.Input id="defaultCheck5" className="me-2" />
                        <FormCheck.Label htmlFor="defaultCheck5" className="mb-0">Remember me</FormCheck.Label>
                      </Form.Check>
                      {/* <Card.Link as={Link} to={Routes.ForgotPassword.path} className="small text-end">Lost password?</Card.Link> */}
                    </div>
                  </Form.Group>
                  <Button variant="primary" type="submit" className="w-100">
                    Sign in
                  </Button>
                </Form>

                <div className="mt-3 mb-4 text-center">
                  <span className="fw-normal">or login with</span>
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
                    Not registered?
                    <Card.Link as={Link} to={Routes.Signup.path} className="fw-bold">
                      {` Create account `}
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
