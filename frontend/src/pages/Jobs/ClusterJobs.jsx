import React, { useEffect, useState, useRef } from "react";
import { getPageData } from "../../components/Pagination/PaginationHelper";
import Container from "react-bootstrap/esm/Container";
import Card from "react-bootstrap/Card";
import { Link, useParams } from "react-router-dom";
import MainLayout from "../../components/Layout/MainLayout";
import Button from "react-bootstrap/esm/Button";
import PaginationBar from "../../components/Pagination/Pagination";
import Sorting from "../../components/Sorting/Sorting";



function ClusterJobs() {
  const { id } = useParams();
  const [jobs, setJobs] = useState();
  const [page, setPage] = useState();
  const [cluster, setCluster] = useState();
  const order = useRef();
  const sort = useRef();
  const items_per_page = useRef(10);
  const search_term = useRef();
  const search_by = useRef();

  const sort_values = [
    { id: "Company", name: "Company" },
    { id: "JobLocation", name: "Job Location" },
    { id: "JobTitle", name: "Job Title" },
    { id: "OnetCode", name: "Occupation Code" },
    { id: "DatePosted", name: "Date Posted" },
  
  ];
  
  const search_values = sort_values.slice(0, 4);

  useEffect(() => {
    fetch(`/api/jobs/cluster/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setJobs(data["Jobs"]);
        setPage(data["Page"]);
        setCluster(data["Cluster"]);
      })
      .catch((err) => console.log(err));
  }, []);

  const ChangePage = (action) => {
    const url = `/api/jobs/cluster/${id}?sort_by=${
      sort.current.value
    }&search=${search_term.current.value.trim()}&search_by=${
      search_by.current.value
    }&order=${order.current.value}&per_page=${
      items_per_page.current.value
    }&page=`;
    getPageData(action, url, page).then((data) => {
      setJobs(data["Jobs"]);
      setPage(data["Page"]);
    });
  };

  const ShowPerPage = (items_per_page, search_term, search_by, e) => {
    e.preventDefault();
    {
      // console.log(items_per_page.current.value)
      fetch(
        `/api/jobs/cluster/${id}?page=1&per_page=${
          items_per_page.current.value
        }&search=${search_term.current.value.trim()}&search_by=${
          search_by.current.value
        }&sort_by=${sort.current.value}&order=${order.current.value}`
      )
        .then((res) => res.json())
        .then((data) => {
          setJobs(data["Jobs"]);
          setPage(data["Page"]);
        });
    }
  };

  const sortPage = (sort, order, search_term, search_by, e) => {
    e.preventDefault();
    fetch(
      `/api/jobs/cluster/${id}?&per_page=${items_per_page.current.value}page=${
        page[0].current_page
      }&search=${search_term.current.value.trim()}&search_by=${
        search_by.current.value
      }&sort_by=${sort.current.value}&order=${order.current.value}`
    )
      .then((res) => res.json())
      .then((data) => {
        setJobs(data["Jobs"]);
        setPage(data["Page"]);
      });
  };



  return (
    <MainLayout>
      {cluster && (
        <Sorting
          page_name={"Jobs in " + cluster["Cluster"].Group}
          page={page}
          handler={sortPage}
          sort_values={sort_values}
          search_values={search_values}
          order={order}
          sort={sort}
          show_handler={ShowPerPage}
          items_per_page={items_per_page}
          search_term={search_term}
          search_by={search_by}
        />
      )}
      <Container className="d-flex flex-wrap justify-content-center">
      {jobs && jobs.length > 0 ? (
          jobs.map((job) => (
            <Card key={job["Id"]} className="m-3" style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>{job.JobTitle}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {job.Company}
                </Card.Subtitle>
                {/* TODO: query occupation DB to get average pay or use google API in next phase */}
                <Card.Text>{job.Location}</Card.Text>
                <Button
                  variant="primary"
                  href={job.Url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Job
                </Button>
                <Link to={`/jobs/${job.Id}`} className="btn btn-primary mx-2">
                  More Info
                </Link>
              </Card.Body>
            </Card>
          ))):(
            jobs && (
              <Container style={{ height: "50vh" }}>
                <h2 className="text-center fw-lighter text-muted">No Results</h2>
              </Container>
            )
          )}
      </Container>
      <Container className="d-flex flex-wrap justify-content-center">
        {jobs && (
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

export default ClusterJobs;
