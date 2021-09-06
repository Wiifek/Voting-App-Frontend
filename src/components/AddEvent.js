import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card, Form, Button, InputGroup } from '@themesberg/react-bootstrap';
import { ChoosePhotoWidget, ProfileCardWidget } from "./Widgets";
import { useHistory } from "react-router-dom";
import toastrService from "../services/toastr.service";
import Select from 'react-select';
import eventService from "../services/event.service";

export default (props) => {
    let history = useHistory();
    const [tagsList, setTagsList] = useState([]);
    const [event, setEvent] = useState({});

    const [name, setEventName] = useState("");
    const [description, setEventDesc] = useState("");
    const [startDateTime, setEventStartDateTime] = useState("");
    const [endDateTime, setEventEndDateTime] = useState("");
    const [location, setEventLocation] = useState("");
    const [price, setEventPrice] = useState("");
    const [availableTicketNumber, setEventTicketsNumber] = useState(0);
    const [eventImage, setEventImage] = useState("");
    const [eventType, setEventType] = useState("");
    const [tags, setEventTags] = useState([]);
    const [author, setEventAuthor] = useState("");

    const [eventNameRequired, setEventNameRequired] = useState("");
    const [eventDescRequired, setEventDescRequired] = useState("");
    const [eventStartDateTimeRequired, setEventStartDateTimeRequired] = useState("");
    const [eventEndDateTimeRequired, setEventEndDateTimeRequired] = useState("");
    const [eventLocationRequired, setEventLocationRequired] = useState("");
    const [eventPriceRequired, setEventPriceRequired] = useState("");
    const [eventTicketsNumberRequired, setEventTicketsNumberRequired] = useState(0);
    const [eventTypeRequired, setEventTypeRequired] = useState("");

    const START_DATE = "startDateTime";
    const END_DATE = "endDateTime";

    useEffect(() => {
        loadTags();
    }, [])

    const loadTags = () => {
        tagService.getAllTags()
            .then(response => {
                setTagsList(response.data);
            }).catch(err => {
                console.log(err)
            });
    }

    const isValidForm = () => {
        if (!name) {
            setEventNameRequired('Event name is required.')
        } else {
            setEventNameRequired(null)
        }
        if (!description) {
            setEventDescRequired('Event description is required.')
        } else {
            setEventDescRequired(null)
        }
        if (!price) {
            setEventPriceRequired('Event price is required.')
        } else {
            setEventPriceRequired(null)
        }
        if (!location) {
            setEventLocationRequired('Event Location is required.')
        } else {
            setEventLocationRequired(null)
        }
        if (!availableTicketNumber) {
            setEventTicketsNumberRequired('Event\'s available tickets number is required.')
        } else {
            setEventTicketsNumberRequired(null)
        }
        if (!startDateTime) {
            setEventStartDateTimeRequired('Event start date and time are required.')
        } else {
            setEventStartDateTimeRequired(null)
        }
        if (!endDateTime) {
            setEventEndDateTimeRequired('Event end date and time are required.')
        } else {
            setEventEndDateTimeRequired(null)
        }
        if (!eventType) {
            setEventTypeRequired('Event type is required.')
        } else {
            setEventTypeRequired(null)
        }
        if (name && description && location && price && endDateTime && startDateTime)
            return true
        else
            return false
    }

    const handleDateTimeRangePickerChange = (_value) => {
        const name = START_DATE;
        setEvent({ ...event, [name]: moment(_value._d).format("MM/DD/YYYY h:mm") });
    }
    const submitHandler = (e) => {
        e.preventDefault();
        if (isValidForm()) {
            setEvent({ ...event, name, description, startDateTime, endDateTime, location, price, author, tags, eventImage, eventType, availableTicketNumber })
            console.log(event)
            // eventService.addEvent(event)
            //     .then(response => {
            //         toastrService.showSuccessMessage("Event created successfully", `Create event`);
            //         history.push("/events");
            //     }).catch(err => {
            //         toastrService.showErrorMessage("Failed creating event", `Create event`);
            //         console.log(err)
            //     });
        }
    }

    return (
        <>
            <Row>
                <Col xs={12} xl={8}>
                    <Card border="light" className="bg-white shadow-sm mb-4">
                        <Card.Body>
                            <h5 className="mb-4">Create Event</h5>
                            <Form onSubmit={submitHandler}>
                                <Row>
                                    <Col md={6} className="mb-3">
                                        <Form.Group id="firstName">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control value={name} onChange={e => setEventName(e.target.value)} type="text" placeholder="Enter the event name" />
                                            <div className="text-start w-100 d-block invalid-feedback">{eventNameRequired}</div>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <Form.Group id="lastName">
                                            <Form.Label>Location</Form.Label>
                                            <Form.Control value={location} onChange={e => setEventLocation(e.target.value)} type="text" placeholder="Enter the event location" />
                                            <div className="text-start w-100 d-block invalid-feedback">{eventLocationRequired}</div>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={12} className="mb-3">
                                        <Form.Group id="address">
                                            <Form.Label>Description</Form.Label>
                                            <Form.Control value={description} onChange={e => setEventDesc(e.target.value)} type="text" placeholder="Enter the event description" />
                                            <div className="text-start w-100 d-block invalid-feedback">{eventDescRequired}</div>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6} className="mb-3">
                                        <Form.Group id="firstName">
                                            <Form.Label>Price</Form.Label>
                                            <Form.Control value={price} onChange={e => setEventPrice(e.target.value)} type="number" placeholder="Enter the event price" />
                                            <div className="text-start w-100 d-block invalid-feedback">{eventPriceRequired}</div>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <Form.Group id="lastName">
                                            <Form.Label>Available tickets number</Form.Label>
                                            <Form.Control value={availableTicketNumber} onChange={e => setEventTicketsNumber(e.target.value)} type="number" />
                                            <div className="text-start w-100 d-block invalid-feedback">{eventTicketsNumberRequired}</div>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                
                                <Row>
                                    <Col md={6} className="mb-3">
                                        <Form.Group id="Type">
                                            <Form.Label>Type</Form.Label>
                                            <Form.Select value={eventType} onChange={e => setEventType(e.target.value)}>
                                                <option value="0"></option>
                                                <option value="Admin">Admin</option>
                                                <option value="Host">Host</option>
                                                <option value="Customer">Customer</option>
                                            </Form.Select>
                                            <div className="text-start w-100 d-block invalid-feedback">{eventTypeRequired}</div>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <Form.Group id="Author">
                                            <Form.Label>Author</Form.Label>
                                            <Form.Control value={`${author.firstName} ${author.lastName}`} disabled type="text" placeholder="Enter the event location" />

                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col sm={12} className="mb-3">
                                        <Form.Group id="tags">
                                            <Form.Label>Tags</Form.Label>
                                            <Select
                                                isMulti
                                                name="tags"
                                                options={tagsList}
                                                className="basic-multi-select"
                                                classNamePrefix="select"
                                                value={tags}
                                                onChange={e => setEventTags(e.target.value)}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <h5 className="my-4">Event image</h5>
                                <Row>
                                    <Col xs={12} xl={4}>
                                        <Col xs={12}>
                                            <ChoosePhotoWidget
                                                title="Select profile photo"
                                                photo={""}
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
}