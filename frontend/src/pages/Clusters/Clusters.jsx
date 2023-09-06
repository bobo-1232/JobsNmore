import React, { useEffect, useState, useRef } from "react";
import { Card, Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import MainLayout from "../../components/Layout/MainLayout";
import Sorting from "../../components/Sorting/Sorting";





function Clusters() {
  const [clusters, setClusters] = useState();
  const order = useRef();
  const sort = useRef();
  const search_term = useRef();
  const search_by = useRef();

  const sort_values = [
    { id: "Code", name: "Code" },
    { id: "Group", name: "Group" },
    { id: "Median_wage", name: "Median Wage" },
  ];
  
  const search_values = sort_values.slice(0, 2);

  useEffect(() => {
    fetch("/api/clusters")
      .then((res) => res.json())
      .then((data) => {
        setClusters(data.Clusters);
        // console.log(data)
      })
      .catch((err) => console.log(err));
  }, []);

  const sortPage = (sort, order, search_term, search_by, e) => {
    e.preventDefault();
    // console.log(sort.current.value, order.current.value, search_term.current.value, search_by.current.value)
    fetch(
      `/api/clusters?&sort_by=${sort.current.value}&order=${order.current.value}&search=${search_term.current.value.trim()}&search_by=${search_by.current.value}`
    )
      .then((res) => res.json())
      .then((data) => {
        setClusters(data.Clusters);
      });
  };



  return (
    <MainLayout>
      {/* <h1 className="text-center py-5">Career Clusters</h1> */}
      {clusters && (
        <Sorting
          page_name={"Clusters"}
          page={clusters}
          handler={sortPage}
          sort_values={sort_values}
          search_values={search_values}
          order={order}
          sort={sort}
          search_term={search_term}
          search_by={search_by}
        />
      )}

      <Container className="min-vh-100">
        <Row className="row row-cols-1 row-cols-md-3 py-4 gy-4">
          {clusters && clusters.length > 0 ?(
            clusters.map((cluster) => (
              <Col md={4} key={cluster.Code} className="my-3">
                <Card>
                  <Card.Body>
                    <Card.Title>{cluster.Group}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {cluster.Code}
                    </Card.Subtitle>
                    <Card.Text>
                      <Link
                        to={`/Clusters/${cluster.Code}`}
                        className="btn btn-info mx-2"
                      >
                        Cluster Info
                      </Link>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ):(
            clusters && (
              <Container style={{ height: "50vh" }}>
                <h2 className="text-center fw-lighter text-muted">No Results</h2>
              </Container>
            )
          )
            }
        </Row>
      </Container>
    </MainLayout>
  );
}

export default Clusters;
