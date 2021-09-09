
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCashRegister, faThumbsUp, faThumbsDown, faChartLine, faVoteYea, faPlus, faRocket, faTasks, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Button, Dropdown, ButtonGroup, Card, Table } from '@themesberg/react-bootstrap';

import { CounterWidget, CircleChartWidget, BarChartWidget, TeamMembersWidget, ProgressTrackWidget, RankingWidget, SalesValueWidget, SalesValueWidgetPhone, AcquisitionWidget } from "../../components/Widgets";
import { PageVisitsTable } from "../../components/Tables";
import { trafficShares, totalOrders } from "../../data/charts";
import { Routes } from "../../routes";
import pollService from "../../services/poll.service";
import userService from "../../services/user.service";
import authService from "../../services/auth.service";
import { Link } from "react-router-dom";

export default () => {
  const [pollsNumber, setPollsNumber] = useState(0);
  const [pollsVoted, setPollsVoted] = useState(0);
  const [polls, setPolls] = useState([]);
  const token = localStorage.getItem('token');
  const userId = authService.currentUser(token);

  useEffect(() => {
    loadData();
  }, [pollsNumber, pollsVoted])

  const loadData = () => {
    userService.getUserById(userId)
      .then(response => {
        setPollsNumber((response.data.pollsTopics).length);
        setPollsVoted((response.data.pollsVoted).length);
      }).catch(err => {
        console.log(err)
      });

      pollService.getAllPolls()
        .then(response => {
          setPolls(response.data);
        }).catch(err => {
          console.log(err)
        });
  }

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">

        <Button as={Link} to={Routes.AddPoll.path} variant="primary" size="sm" className="me-2">
          <FontAwesomeIcon icon={faPlus} className="me-2" />Create New Poll
        </Button>

      </div>

      <Row className="justify-content-md-center">

        <Col xs={12} sm={6} xl={6} className="mb-4">
          <CounterWidget
            category="Created Polls"
            title={pollsNumber}
            icon={faChartLine}
            iconColor="shape-secondary"
          />
        </Col>

        <Col xs={12} sm={6} xl={6} className="mb-4">
          <CounterWidget
            category="Voted Polls"
            title={pollsVoted}
            icon={faVoteYea}
            iconColor="shape-tertiary"
          />
        </Col>
      </Row>

      <Row>
        <Col xs={12} xl={12} className="mb-4">
          <Row>
            <Col xs={12} xl={12} className="mb-4">
              <Row>
                <Col xs={12} className="mb-4">
                  <Card border="light" className="shadow-sm mb-4">
                    <Card.Body className="pb-0">
                      <h5 className="mb-4">Polls list</h5>
                      <Table responsive className="table-centered table-nowrap rounded mb-0">
                        <thead className="thead-light">
                          <tr>
                            <th className="border-0">#</th>
                            <th className="border-0">Title</th>
                            <th className="border-0">Votes</th>
                            <th className="border-0"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {polls.map((poll, index) =>
                            <tr key={index}>
                              <td>{index}</td>
                              <td>{poll.title}</td>
                              <td><FontAwesomeIcon icon={faThumbsUp} className={`text-success me-3`} />
                               {poll.options[0].votes==0? `0`: ((poll.options[0].votes / poll.voted.length)*100).toFixed(2)} % {`  `}
                               <FontAwesomeIcon icon={faThumbsDown} className={`text-danger me-3`} />
                               {poll.options[1].votes==0? `0`: ((poll.options[1].votes / poll.voted.length)*100).toFixed(2)} % </td>
                              <td><Button as={Link} to={`/polls/view-poll/${poll._id}`} variant="info">View</Button>
                              </td>

                            </tr>)}
                        </tbody>
                      </Table>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};
