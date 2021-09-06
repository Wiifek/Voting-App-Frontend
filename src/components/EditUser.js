import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChoosePhotoWidget, ProfileCardWidget } from "./Widgets";

import Profile3 from "../assets/img/team/profile-picture-3.jpg";
import userService from "../services/user.service";
import { useParams } from "react-router-dom";

import moment from "moment-timezone";
import Datetime from "react-datetime";
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card, Form, Button, InputGroup } from '@themesberg/react-bootstrap';
import toastrService from "../services/toastr.service";
// import { useStateWithCallbackLazy } from 'use-state-with-callback';

export default () => {
    // in case we will use the callback method to set values state
    // const [user, setUser] = useStateWithCallbackLazy(null);
    const [user, setUser] = useState(null)

    const [firstNameRequired, setFirstNameRequired] = useState("");
    const [lastNameRequired, setLastNameRequired] = useState("");
    const [roleRequired, setRoleRequired] = useState("");
    const [birthdayRequired, setBirthdayRequired] = useState("");
    const [addressRequired, setAddressRequired] = useState("");
    const [phoneRequired, setPhoneRequired] = useState("");
    const [avatarRequired, setAvatarRequired] = useState("");

    const TIME_NAME = "birthDate"

    const { id } = useParams();

    useEffect(() => {
        loadUser();
    }, [])

    const loadUser = () => {
        userService.getUserById(id)
            .then(response => {
                setUser(response.data);
                //Another method to set state
                // setUser(response.data, (currentUser) => {
                //     setEmail(currentUser.email)
                // });
            }).catch(err => {
                console.log(err)
            });
    }

    const isValidForm = () => {
        if (!user.firstName) {
            setFirstNameRequired('First name is required.')
        } else {
            setFirstNameRequired(null)
        }
        if (!user.lastName) {
            setLastNameRequired('Last name is required.')
        } else {
            setLastNameRequired(null)
        }
        if (user.role == "0") {
            setRoleRequired('Role is required.')
        } else {
            setRoleRequired(null)
        }
        if (!user.birthDate) {
            setBirthdayRequired('Birth date is required.')
        } else {
            setBirthdayRequired(null)
        }
        if (!user.phone) {
            setPhoneRequired('Phone number is required.')
        } else {
            setPhoneRequired(null)
        }
        if (!user.address) {
            setAddressRequired('Address is required.')
        } else {
            setAddressRequired(null)
        }
        if (user.firstName && user.lastName && user.birthDate && user.address && user.phone && user.role)
            return true
        else
            return false
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        setUser({ ...user, [name]: value });
    }

    const handleDateTimeRangePickerChange = (_value) => {
        const name = TIME_NAME;
        setUser({ ...user, [name]: moment(_value._d).format("MM/DD/YYYY") });
    }


    const submitHandler = (e) => {
        console.log(user)
        e.preventDefault();
        if (isValidForm()) {
            console.log(user)
            userService.editUser(id, user)
                .then(response => {
                    toastrService.showSuccessMessage("Your profile has been updated successfully", `Update profile`);
                    loadUser();
                }).catch(err => {
                    toastrService.showErrorMessage("Failed to update your profile", `Update profile`);
                    console.log(err)
                });
        }
    }


    return (
        <>
            <Row>
                <Col xs={12} xl={8}>
                    <Card border="light" className="bg-white shadow-sm mb-4">
                        <Card.Body>
                            <h5 className="mb-4">General information</h5>
                            <Form onSubmit={submitHandler}>
                                <Row>
                                    <Col md={6} className="mb-3">
                                        <Form.Group id="firstName">
                                            <Form.Label>First Name</Form.Label>
                                            <Form.Control name="firstName" value={user ? user.firstName : ""} onChange={handleInputChange} type="text" placeholder="Enter your first name" />
                                            <div className="text-start w-100 d-block invalid-feedback">{firstNameRequired}</div>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <Form.Group id="lastName">
                                            <Form.Label>Last Name</Form.Label>
                                            <Form.Control name="lastName" value={user ? user.lastName : ""} onChange={handleInputChange} type="text" placeholder="Also your last name" />
                                            <div className="text-start w-100 d-block invalid-feedback">{lastNameRequired}</div>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="align-items-center">
                                    <Col md={6} className="mb-3">
                                        <Form.Group id="birthday">
                                            <Form.Label>Birthday</Form.Label>
                                            <Datetime
                                                name={TIME_NAME}
                                                timeFormat={false}
                                                onChange={handleDateTimeRangePickerChange}
                                                initialViewDate={user ? moment(user.birthDate).format("MM/DD/YYYY") : ""}
                                                renderInput={(props, openCalendar) => (
                                                    <InputGroup>
                                                        <InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></InputGroup.Text>
                                                        <Form.Control
                                                            name={TIME_NAME}
                                                            type="text"
                                                            value={user ? moment(user.birthDate).format("MM/DD/YYYY") : ""}
                                                            placeholder="mm/dd/yyyy"
                                                            onFocus={openCalendar}
                                                            onChange={handleDateTimeRangePickerChange} />
                                                    </InputGroup>
                                                )} />
                                            <div className="text-start w-100 d-block invalid-feedback">{birthdayRequired}</div>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <Form.Group id="gender">
                                            <Form.Label>Role</Form.Label>
                                            <Form.Select name="role" value={user ? user.role : "0"} onChange={handleInputChange}>
                                                <option value="0"></option>
                                                <option value="Admin">Admin</option>
                                                <option value="Host">Host</option>
                                                <option value="Customer">Customer</option>
                                            </Form.Select>
                                            <div className="text-start w-100 d-block invalid-feedback">{roleRequired}</div>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6} className="mb-3">
                                        <Form.Group id="emal">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control name="email" value={user ? user.email : ""} disabled type="email" placeholder="name@company.com" />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <Form.Group id="phone">
                                            <Form.Label>Phone</Form.Label>
                                            <Form.Control name="phone" value={user ? user.phone : ""} onChange={handleInputChange} type="number" placeholder="+12-345 678 910" />
                                            <div className="text-start w-100 d-block invalid-feedback">{phoneRequired}</div>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={12} className="mb-3">
                                        <Form.Group id="address">
                                            <Form.Label>Address</Form.Label>
                                            <Form.Control name="address" value={user ? user.address : ""} onChange={handleInputChange} type="text" placeholder="Enter your home address" />
                                            <div className="text-start w-100 d-block invalid-feedback">{addressRequired}</div>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <h5 className="my-4">Profile photo</h5>
                                <Row>
                                    <Col xs={12} xl={4}>
                                        <Col xs={12}>
                                            <ChoosePhotoWidget
                                                title="Select profile photo"
                                                photo={user ? user.avatar : ""}
                                            />
                                        </Col>
                                    </Col>
                                </Row>
                                <div className="mt-3">
                                    <Button variant="primary" type="submit">Save All</Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>


            </Row>
        </>
    );
};
