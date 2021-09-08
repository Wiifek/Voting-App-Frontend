import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Col, Row, Card, Form, Button } from '@themesberg/react-bootstrap';
import toastrService from "../services/toastr.service";
import pollService from "../services/poll.service";
import userService from "../services/user.service";
import authService from "../services/auth.service";


export default () => {
    const [poll, setPoll] = useState({});
    const [user, setUser] = useState({});
    const { id } = useParams();
    const token = localStorage.getItem('token');
    const userId = authService.currentUser(token);
    const [percentage, setPercentage] = useState(null);
    const [yes, setYes] = useState(null);
    const [no, setNo] = useState(null);
    const [vote, setVote] = useState(null);

    useEffect(() => {
        loadPoll();

    }, [])

    const loadPoll = () => {
        pollService.getPollById(id)
            .then(response => {
                setPoll(response.data);
                setPercentage((response.data.voted).length);
                setYes(response.data.options[0].votes);
                setNo(response.data.options[1].votes);
                userService.getUserById(response.data.user)
                    .then(response => {
                        setUser(response.data);
                    }).catch(err => {
                        console.log(err)
                    });
            }).catch(err => {
                console.log(err)
            });
    }

    const submitHandler = (e) => {
        e.preventDefault();
        userService.votePoll(userId, id, { vote })
            .then(response => {
                toastrService.showSuccessMessage("The Vote has been saved successfully", `Vote Poll`);
                loadPoll();
            }).catch(err => {
                toastrService.showErrorMessage("Failed to save your vote", `Vote Poll`);
                console.log(err)
            });
    }


    return (
        <>
            <Row>
                <Col xs={12} xl={8}>
                    <Card border="light" className="bg-white shadow-sm mb-4">
                        <Card.Body>
                            <h5 className="mb-4">View Poll</h5>
                            <Form onSubmit={submitHandler}>
                                <Row>
                                    <Col md={6} className="mb-3">
                                        <Form.Group id="title">
                                            <Form.Label>Title</Form.Label>
                                            <Form.Control name="title" disabled value={poll ? poll.title : ""} type="text" />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <Form.Group id="user">
                                            <Form.Label>Author</Form.Label>
                                            <Form.Control name="author" disabled value={user ? user.firstName + ` ` + user.lastName : ""} type="text" />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12} className="mb-3">
                                        <Form.Group id="description">
                                            <Form.Label>Description</Form.Label>
                                            <Form.Control name="description" disabled value={poll ? poll.description : ""} type="text" />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12} className="mb-3">
                                        <Form.Group id="Votes">
                                            <Form.Label>Votes Percentage</Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>Yes : {percentage != 0 ? ((yes / percentage) * 100).toFixed(2) : "0"} % </Form.Label> {`  `}
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>No : {percentage != 0 ? ((no / percentage) * 100).toFixed(2) : "0"} %</Form.Label>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <div className="mt-3">
                                    <Button variant="success" type="submit" onClick={e => { setVote("Yes") }}>Yes</Button> {`  `}
                                    <Button variant="danger" type="submit" onClick={e => { setVote("No") }}>No</Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>


            </Row>
        </>
    );
};
