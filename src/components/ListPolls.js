import React, { useEffect, useState } from "react";
import { Card, Table } from "@themesberg/react-bootstrap"
import { Button } from '@themesberg/react-bootstrap';
import showDeleteConfirmation from "../services/sweetAlert.service";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Routes } from "../routes";
import pollService from "../services/poll.service";
import userService from "../services/user.service";
import authService from "../services/auth.service";


export default (props) => {
    const [polls, setPolls] = useState([]);

    const token = localStorage.getItem('token');
    const userId = authService.currentUser(token);

    useEffect(() => {
        refreshPollsList();
    }, [])

    const refreshPollsList = () => {
        userService.getUserCreatedPolls(userId)
            .then(response => {
                setPolls(response.data);
            }).catch(err => {
                console.log(err)
            });
    }

    const deleteHandler = (id) => {
        showDeleteConfirmation("poll")
            .then((result) => {
                if (result.isConfirmed) {
                    pollService.deletePoll(id)
                        .then(response => {
                            console.log(response);
                            refreshPollsList();
                        }).catch(err => {
                            console.log(err)
                        })
                }
            }).catch(err => {
                console.log(err)
            });
    }
    return (
        <div>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                <Button as={Link} to={Routes.AddPoll.path} variant="secondary" className="text-dark me-2">
                    <FontAwesomeIcon icon={faPlus} className="me-2" />
                    <span>New</span>
                </Button> 
            </div>
            <Card border="light" className="shadow-sm mb-4">
                <Card.Body className="pb-0">
                <h5 className="mb-4">Polls list</h5>
                    <Table responsive className="table-centered table-nowrap rounded mb-0">
                        <thead className="thead-light">
                            <tr>
                                <th className="border-0">#</th>
                                <th className="border-0">Title</th>
                                <th className="border-0">Votes</th>
                                <th className="border-0">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {polls.map((poll, index) =>
                                <tr key={index}>
                                    <td>{index}</td>
                                    <td>{poll.title}</td>
                                    <td>Yes: {poll.options[0].votes} No: {poll.options[1].votes}</td>
                                    <td><Button as={Link} to={`/polls/${poll._id}`} variant="warning">Edit</Button>{' '}
                                        <Button onClick={() => deleteHandler(poll._id)} variant="danger">Delete</Button>
                                    </td>

                                </tr>)}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </div>
    )
}