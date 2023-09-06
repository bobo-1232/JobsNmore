import React, { useEffect, useState, useRef } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import MainLayout from "../../components/Layout/MainLayout";
import Sorting from "../../components/Sorting/Sorting";
import PaginationBar from "../../components/Pagination/Pagination";
import { getPageData } from "../../components/Pagination/PaginationHelper";


function Occupations() {
  const [page, setPage] = useState();
  const [occupations, setOccupations] = useState();
  const order = useRef();
  const sort = useRef();
  const items_per_page = useRef(10);
  const search_term = useRef();
  const search_by = useRef();

  const sort_values = [
    { id: "onetCode", name: "Onet Code" },
    { id: "cluster", name: "Cluster" },
    { id: "title", name: "Job Title" },
    { id: "outlook", name: "Outlook" },
    { id: "median_wage", name: "Median Wage" },
    { id: "pct90_wage", name: "90th Wage" },
    { id: "curr_employment", name: "Current Employment" },
    { id: "proj_openings", name: "Projected Openings" },
    { id: "percent_change", name: "Percent Change in Employment" },
  ];
  
  const search_values = sort_values.slice(0, 3);
  

  useEffect(() => {
    fetch("/api/occupations")
      .then((res) => res.json())
      .then((data) => {
        setOccupations(data["Occupations"]);
        setPage(data["Page"]);
        // console.log(data)
      })
      .catch((err) => console.log(err));
  }, []);

  const ChangePage = (action) => {
    const url = `/api/occupations?sort_by=${
      sort.current.value
    }&search=${search_term.current.value.trim()}&search_by=${
      search_by.current.value
    }&order=${order.current.value}&per_page=${
      items_per_page.current.value
    }&page=`;
    getPageData(action, url, page).then((data) => {
      setOccupations(data["Occupations"]);
      setPage(data["Page"]);
      // console.log(data["Page"][0]);
    });
  };

  const ShowPerPage = (items_per_page, search_term, search_by, e) => {
    e.preventDefault();
    {
      // console.log(items_per_page.current.value)
      fetch(
        `/api/occupations?page=1&sort_by=${
          sort.current.value
        }&search=${search_term.current.value.trim()}&search_by=${
          search_by.current.value
        }&order=${order.current.value}&per_page=${items_per_page.current.value}`
      )
        .then((res) => res.json())
        .then((data) => {
          setOccupations(data["Occupations"]);
          setPage(data["Page"]);
        });
    }
  };

  const sortPage = (sort, order, search_term, search_by, e) => {
    e.preventDefault();
    fetch(
      `/api/occupations?page=${
        page[0].current_page
      }&search=${search_term.current.value.trim()}&search_by=${
        search_by.current.value
      }&per_page=${items_per_page.current.value}&sort_by=${
        sort.current.value
      }&order=${order.current.value}`
    )
      .then((res) => res.json())
      .then((data) => {
        setOccupations(data["Occupations"]);
        setPage(data["Page"]);
      });
  };

  return (
    <MainLayout>
      {/* <h1 className="text-center py-5">Occupations</h1> */}
      {page && (
        <Sorting
          page_name={"Occupations"}
          page={page}
          handler={sortPage}
          sort_values={sort_values}
          search_values={search_values}
          order={order}
          sort={sort}
          show_handler={ShowPerPage}
          items_per_page={items_per_page}
          max_items={30}
          search_term={search_term}
          search_by={search_by}
        />
      )}
      <Container>
        <Row className="row row-cols-1 row-cols-md-3 py-4 gy-4">
          {occupations && occupations.length > 0 ? (
            occupations.map((occupation) => (
              <Col key={occupation.onetCode}>
                <Card className="m-3">
                  <Card.Body>
                    <Card.Title>{occupation.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {occupation.cluster}
                    </Card.Subtitle>

                    {/* <Card.Text>{occupation["description"]}</Card.Text> */}
                    {/* <Card.Text>
        Median Wage: {occupation["median_wage"]}
      </Card.Text>
      <Card.Text>90th Wage: {occupation["pct90_wage"]}</Card.Text>
      <Card.Text>Outlook: {occupation["outlook"]}</Card.Text>
      <Card.Text>
        Outlook Category: {occupation["outlook_category"]}
      </Card.Text>
      <Card.Text>
        Current Employment: {occupation["curr_employment"]}
      </Card.Text>
      <Card.Text>
        Projected Employment: {occupation["proj_openings"]}
      </Card.Text>
      <Card.Text>
        Percent Change: {occupation["percent_change"]}
      </Card.Text>
      <Card.Text>
        <a
          href={occupation["bls"]}
          target="_blank"
          rel="noopener noreferrer"
        >
          BLS
        </a>
      </Card.Text> */}
                    {/* <Link to={`/jobs/occupation/${occupation.OnetCode}`} className="btn btn-primary mx-2">
      Find Jobs
    </Link> */}
                    <Link
                      to={`/Occupations/${occupation.onetCode}`}
                      className="btn btn-primary mx-2"
                    >
                      Info
                    </Link>
                    <Link
                      to={`/Clusters/${occupation.cluster}`}
                      className="btn btn-info mx-2"
                    >
                      Cluster Info
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (occupations && (
            <Container style={{ height: "50vh" }}>
              <h2 className="text-center fw-lighter text-muted">No Results</h2>
            </Container>
          )
          )}
        </Row>
      </Container>
      <Container className="d-flex justify-content-center">
        {occupations && (
          <PaginationBar
            change={ChangePage}
            total_pages={page[0].total}
            current_page={page[0].current_page}
          />
        )}
      </Container>
    </MainLayout>
  );
}

export default Occupations;
