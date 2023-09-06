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
} from "react-bootstrap";
import { Link } from "react-router-dom";
import MainLayout from "../../components/Layout/MainLayout";

function ViewOccupation() {
  const { id } = useParams();
  const [occupation, setOccupation] = useState();
  const formatter_dollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const formatter_comma = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
  });
  useEffect(() => {
    fetch(`/api/occupations/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setOccupation(data.Occupation);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      {occupation && (
        <MainLayout>
          <h1 className="text-center py-5">Occupation Details</h1>
          <Container className="min-vh-100">
            <Row>
              <Card>
                <Card.Header className="text-center">
                  {occupation.title}
                </Card.Header>
                <Card.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item className="my-2">
                      {occupation.description}
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
                <Card.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item className="my-2">
                      Median: {formatter_dollar.format(occupation.median_wage)}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Top 10%:{" "}
                      {occupation.pct90_wage == 208000
                        ? `${formatter_dollar.format(occupation.pct90_wage)} or more`
                        : `${formatter_dollar.format(occupation.pct90_wage)}`}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Outlook: {occupation.outlook}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Outlook Category: {occupation.outlook_category}
                    </ListGroup.Item>
                    <ListGroupItem>
                      Workforce:{" "}
                      {formatter_comma.format(occupation.curr_employment)}
                    </ListGroupItem>
                    <ListGroupItem>
                      Projected Openings:{" "}
                      {formatter_comma.format(occupation.proj_openings)}
                    </ListGroupItem>
                    <ListGroupItem>
                      BLS Info:
                      <a
                        className="mx-2"
                        href={occupation.bls}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Link
                      </a>
                    </ListGroupItem>
                    <ListGroupItem>
                      <Link
                        to={`/Jobs/occupation/${occupation.onetCode}`}
                        className="btn btn-primary mx-2"
                      >
                        Find Jobs
                      </Link>
                    </ListGroupItem>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Row>
          </Container>
        </MainLayout>
      )}
    </>
  );
}

export default ViewOccupation;
