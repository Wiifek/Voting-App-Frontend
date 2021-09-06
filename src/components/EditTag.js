import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Col, Row, Card, Form, Button } from '@themesberg/react-bootstrap';
import toastrService from "../services/toastr.service";


export default () => {
    const [tag, setTag] = useState({});

    const [tagNameRequired, setTagNameRequired] = useState("");
    const [tagDescRequired, setTagDescRequired] = useState("");

    const isValidForm = () => {
        if (!tag.name) {
            setTagNameRequired('Tag name is required.')
        } else {
            setTagNameRequired(null)
        }
        if (!tag.description) {
            setTagDescRequired('Tag description is required.')
        } else {
            setTagDescRequired(null)
        }
        if (tag.name && tag.description)
            return true
        else return false
    }
    const { id } = useParams();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTag({ ...tag, [name]: value });
    }

    useEffect(() => {
        loadTag();
    }, [])

    const loadTag = () => {
        // tagService.getTagById(id)
        //     .then(response => {
        //         console.log(response.data)
        //         setTag(response.data);
        //     }).catch(err => {
        //         console.log(err)
        //     });
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if (isValidForm()) {
            console.log(tag)
            // tagService.editTag(id, tag)
            //     .then(response => {
            //         toastrService.showSuccessMessage("The tag has been updated successfully", `Update Tag`);
            //     }).catch(err => {
            //         toastrService.showErrorMessage("Failed to update the tag", `Update tag`);
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
                            <h5 className="mb-4">Update tag</h5>
                            <Form onSubmit={submitHandler}>
                                <Row>
                                    <Col md={9} className="mb-3">
                                        <Form.Group id="firstName">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control name="name" value={tag ? tag.name : ""} onChange={handleInputChange} type="text" placeholder="Enter the tag name" />
                                            <div className="text-start w-100 d-block invalid-feedback">{tagNameRequired}</div>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={9} className="mb-3">
                                        <Form.Group id="lastName">
                                            <Form.Label>Description</Form.Label>
                                            <Form.Control name="description" value={tag ? tag.description : ""} onChange={handleInputChange} type="text" placeholder="Enter the tag description" />
                                            <div className="text-start w-100 d-block invalid-feedback">{tagDescRequired}</div>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <div className="mt-3">
                                    <Button variant="primary" type="submit">Update tag</Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>


            </Row>
        </>
    );
};
