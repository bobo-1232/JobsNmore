import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ListGroup,
  ListGroupItem,
  Tab,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import MainLayout from "../../components/Layout/MainLayout";

function ViewJob() {
  const { id } = useParams();
  const [data, setData] = useState();
  const [courses, setCourses] = useState();
  const formatter_dollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const formatter_comma = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
  });

  useEffect(() => {
    fetch(`/api/jobs/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data["Job Info"]);
        setCourses(data["Courses"]);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {data && (
        <MainLayout>
          <h1 className="text-center py-5">Job Details</h1>

          <Container>
            <Row>
              <Col>
                <Card>
                  <Card.Header className="text-center">
                    Job Information
                  </Card.Header>
                  <Card.Body className="text-center">
                    <Card.Title>{data["JobTitle"]}</Card.Title>
                    {data["Company"]}
                    <Link
                      to={`/locations/${data.JCityID}`}
                      className="btn btn-primary mx-2 my-2"
                    >
                      View {data["JobLocation"]}
                    </Link>
                  </Card.Body>
                  <Card.Body>
                    <Card.Title>Job Description</Card.Title>
                    <Card.Text>{data["description"]}</Card.Text>
                    <Button
                      variant="info"
                      href={data["Url"]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mx-4"
                    >
                      View Job
                    </Button>
                  </Card.Body>
                  <Card.Footer className="text-muted">
                    Posted on : {data["DatePosted"]}
                  </Card.Footer>
                </Card>
              </Col>
              <Col>
                <Card>
                  <Card.Header className="text-center">
                    Occupation Outlook
                  </Card.Header>
                  <Card.Body>
                    <Card.Title className="text-center">
                      {data["title"]}
                    </Card.Title>
                    <ListGroup variant="flush">
                      <ListGroup.Item className="my-2">
                        Median: {formatter_dollar.format(data.median_wage)}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        Top 10%:{" "}
                        {data.pct90_wage == 208000
                        ? `${formatter_dollar.format(data.pct90_wage)} or more`
                        : `${formatter_dollar.format(data.pct90_wage)}`}
                      </ListGroup.Item>
                      <ListGroup.Item>Outlook: {data.outlook}</ListGroup.Item>
                      <ListGroup.Item>
                        Outlook Category: {data.outlook_category}
                      </ListGroup.Item>
                      <ListGroupItem>
                        Workforce:{" "}
                        {formatter_comma.format(data.curr_employment)}
                      </ListGroupItem>
                      <ListGroupItem>
                        Projected Openings:{" "}
                        {formatter_comma.format(data.proj_openings)}
                      </ListGroupItem>
                      <ListGroupItem>
                        BLS Info:
                        <a
                          className="mx-2"
                          href={data.bls}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Link
                        </a>
                      </ListGroupItem>
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col>
                <Card>
                  <Card.Header className="text-center">
                    Courses Available
                  </Card.Header>
                  <Card.Body>
                    <Tab.Container
                      id="list-group-tabs-example"
                      defaultActiveKey="#link1"
                    >
                      <Row>
                        <Col sm={4}>
                          <ListGroup>
                            {courses.map((course) => (
                              <ListGroup.Item
                                action
                                href={`#link${course.Id}`}
                                key={course.Id}
                              >
                                {course.Name}
                              </ListGroup.Item>
                            ))}
                          </ListGroup>
                        </Col>
                        <Col sm={8}>
                          <Tab.Content>
                            {courses.map((course) => (
                              <Tab.Pane
                                eventKey={`#link${course.Id}`}
                                key={course.Id}
                              >
                                <Card.Title>{course.Name}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">
                                  {course.Provider}
                                </Card.Subtitle>
                                <Card.Text>{course.Description}</Card.Text>
                                <Card.Text>Type: {course.Type}</Card.Text>
                                <Card.Link href={course.Url}>
                                  Take Course
                                </Card.Link>
                              </Tab.Pane>
                            ))}
                          </Tab.Content>
                        </Col>
                      </Row>
                    </Tab.Container>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </MainLayout>
      )}
    </>
  );
}

export default ViewJob;
