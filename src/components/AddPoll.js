import React, { useEffect, useState } from "react";
import { Col, Row, Card, Form, Button, InputGroup } from '@themesberg/react-bootstrap';
import pollService from "../services/poll.service";
import { useHistory } from "react-router-dom";
import toastrService from "../services/toastr.service";
import authService from "../services/auth.service";

export default (props) => {
    let history = useHistory();

    const options = [{"option":"Yes"},{"option":"No"}];
    const token = localStorage.getItem('token');
    const userId = authService.currentUser(token); 

    const [pollTitle, setPollTitle] = useState("");
    const [pollDesc, setPollDesc] = useState("");

    const [pollTitleRequired, setPollTitleRequired] = useState("");
    const [pollDescRequired, setPollDescRequired] = useState("");

    const isValidForm = () => {
        if (!pollTitle) {
            setPollTitleRequired('Poll Title is required.')
        } else {
            setPollTitleRequired(null)
        }
        if (!pollDesc) {
            setPollDescRequired('Poll description is required.')
        } else {
            setPollDescRequired(null)
        }
        if (pollTitle && pollDesc)
            return true
        else return false
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if (isValidForm()) {
            pollService.addPoll({ title: pollTitle, description: pollDesc, options, user: userId })
                .then(response => {
                    toastrService.showSuccessMessage("Poll created successfully", `Create poll`);
                    //history.push("/polls");
                }).catch(err => {
                    toastrService.showErrorMessage("Failed creating poll", `Create poll`);
                    console.log(err)
                });
        }
    }

    return (
        <Card border="light" className="bg-white shadow-sm mb-4">
            <Card.Body>
                <h5 className="mb-4">Add Poll</h5>
                <Form onSubmit={submitHandler}>
                    <Row>
                        <Col md={9} className="mb-3">
                            <Form.Group id="title">
                                <Form.Label>Title</Form.Label>
                                <Form.Control value={pollTitle} onChange={e => setPollTitle(e.target.value)} type="text" placeholder="Enter the poll Title" />
                                <div className="text-start w-100 d-block invalid-feedback">{pollTitleRequired}</div>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={9} className="mb-3">
                            <Form.Group id="description">
                                <Form.Label>Description</Form.Label>
                                <Form.Control value={pollDesc} onChange={e => setPollDesc(e.target.value)} type="text" placeholder="Enter the poll description" />
                                <div className="text-start w-100 d-block invalid-feedback">{pollDescRequired}</div>
                            </Form.Group>
                        </Col>
                    </Row>
                    <div className="mt-3">
                        <Button variant="primary" type="submit">Create poll</Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    )

}