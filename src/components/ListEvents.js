import React, { useEffect, useState } from "react";
import { Card, Table } from "@themesberg/react-bootstrap"
import { Button } from '@themesberg/react-bootstrap';
import eventService from "../services/event.service";
import showDeleteConfirmation from "../services/sweetAlert.service";
import { Link } from "react-router-dom";
import moment from "moment-timezone";
import { Routes } from "../routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";


export default (props) => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        refreshEventsList();
    }, [])

    const refreshEventsList = () => {
        eventService.getAllEvents()
            .then(response => {
                setEvents(response.data);
            }).catch(err => {
                console.log(err)
            });
    }

    const deleteHandler = (id) => {
        showDeleteConfirmation("event")
            .then((result) => {
                if (result.isConfirmed) {
                    eventService.deleteEventById(id)
                        .then(response => {
                            refreshEventsList();
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
                <Button as={Link} to={Routes.AddEvent.path} variant="secondary" className="text-dark me-2">
                    <FontAwesomeIcon icon={faPlus} className="me-2" />
                    <span>New event</span>
                </Button>
            </div>
            <Card border="light" className="shadow-sm mb-4">
                <Card.Body className="pb-0">
                    <h5 className="mb-4">Events list</h5>
                    <Table responsive className="table-centered table-nowrap rounded mb-0">
                        <thead className="thead-light">
                            <tr>
                                <th className="border-0">#</th>
                                <th className="border-0">Name</th>
                                <th className="border-0">Location</th>
                                <th className="border-0">Price</th>
                                <th className="border-0">N° Available tickets</th>
                                <th className="border-0">Start date</th>
                                <th className="border-0">End date</th>
                                <th className="border-0">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {events.map((event, index) =>
                                <tr key={index}>
                                    <td>{index}</td>
                                    <td>{event.name}</td>
                                    <td>{event.location}</td>
                                    <td>{event.price}</td>
                                    <td>{event.availableTicketNumber}</td>
                                    <td>{moment(event.startDateTime).format("DD/MM/YYYY h:mm")}</td>
                                    <td>{moment(event.endDateTime).format("DD/MM/YYYY h:mm")}</td>
                                    <td><Button as={Link} to={`/events/${event._id}`} variant="warning">Edit</Button>{' '}
                                        <Button onClick={() => deleteHandler(event._id)} variant="danger">Delete</Button>
                                    </td>

                                </tr>)}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </div>
    )
}