import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import MainLayout from "../../components/Layout/MainLayout";
import Logo from "../../images/logos/png/logo-no-slogan.png";
import AboutCard from "./AboutCard";
import Spinner from "../../components/Spinner/Spinner";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

function About() {
  /*   lazy initial state, runs only once, once we have our data in session storage this
  will be the way we get our gitlab data */

  const [data, setData] = useState(() => {
    const cached = sessionStorage.getItem("about");
    return cached ? JSON.parse(cached) : null;
  });
  const [test, setTest] = useState([]);

  // fetch data from backend and store in state and cache
  useEffect(() => {
    if (!data) {
      fetch("/api/about")
        .then((res) => res.json())
        .then((gitlab) => {
          setData(gitlab);
          sessionStorage.setItem("about", JSON.stringify(gitlab));
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const runTests = () => {
    fetch("/api/test")
      .then((res) => res.text())
      .then((data) => {
        setTest(data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <MainLayout>
      <Container fluid className="h-50 bg-gradient2">
        <Container className="align-items-center py-5">
          <Row>
            <Col>
              <Image src={Logo} className="img-fluid" />
            </Col>
            <Col>
              <h1 className="py-4">Simple and informative.</h1>
              <p>
                JobsNMore is your one-stop shop for job search and career
                advancement. The website tracks the latest job listing from
                multiple sources, the statistics on the occupations, and
                recommended online courses to become a more competitive applicant.
              </p>
            </Col>
          </Row>
        </Container>
      </Container>
      <h1 className="text-center py-5">Unit Testing</h1>
      <Container className="justify-content-center">
        <Row>
          <Col className="text-center">
            <Button variant="primary" onClick={runTests} className="mx-auto">
            <FontAwesomeIcon icon={faPlay} className="mx-2" />
              Unit Tests
            </Button>
          </Col>
          <Col className="text-center">
            <p>{test && test}</p>
          </Col>
        </Row>
      </Container>

      {!data ? <Spinner /> : <AboutCard data={data} />}
    </MainLayout>
  );
}

export default About;
