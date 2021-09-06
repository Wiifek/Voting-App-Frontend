import React, { useEffect, useState } from "react";
import { Card, Table } from "@themesberg/react-bootstrap"
import { Button } from '@themesberg/react-bootstrap';
import userService from "../services/user.service";
import showDeleteConfirmation from "../services/sweetAlert.service";
import { Link } from "react-router-dom";


export default (props) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        refreshList();
    }, [])

    const refreshList = () => {
        userService.getAllUsers()
            .then(response => {
                setUsers(response.data);
            }).catch(err => {
                console.log(err)
            });
    }

    const deleteHandler = (id) => {
        showDeleteConfirmation("user")
            .then((result) => {
                if (result.isConfirmed) {
                    userService.deleteUserById(id)
                        .then(response => {
                            refreshList();
                        }).catch(err => {
                            console.log(err)
                        })
                }
            }).catch(err => {
                console.log(err)
            });
    }
    return (
        <Card border="light" className="shadow-sm mb-4">
            <Card.Body className="pb-0">
            <h5 className="mb-4">Users list</h5>
                <Table responsive className="table-centered table-nowrap rounded mb-0">
                    <thead className="thead-light">
                        <tr>
                            <th className="border-0">#</th>
                            <th className="border-0">First Name</th>
                            <th className="border-0">Last Name</th>
                            <th className="border-0">Role</th>
                            <th className="border-0">E-mail</th>
                            <th className="border-0">Phone</th>
                            <th className="border-0">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) =>
                            <tr key={index}>
                                <td>{index}</td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.role}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td><Button as={Link} to={`/users/${user._id}`} variant="warning">Edit</Button>{' '}
                                    <Button onClick={()=>deleteHandler(user._id)} variant="danger">Delete</Button>
                                </td>

                            </tr>)}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    )
}