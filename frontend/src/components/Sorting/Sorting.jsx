import React from "react";
import {
  Container,
  Button,
  Row,
  Col,
  Form,
  FloatingLabel,
} from "react-bootstrap";

function Sorting({
  page_name,
  page,
  handler,
  sort_values,
  search_values,
  order,
  sort,
  show_handler,
  items_per_page,
  max_items,
  search_term,
  search_by,
}) {
  return (
    <>
      {page_name == "Clusters" ? (
        <>
          <Container fluid className="bg-gradient3">
            <Container className="py-5 align-items-center">
              <Row>
                <Col>
                  <h1 className="py-5 fw-light">
                    Search Results for:{" "}
                    <small className="fw-bold">{page_name}</small>
                  </h1>
                  {/* {page &&
              (page[0].per_page === page[0].page_items ? (
                <p className="fst-italic">
                  Showing{" "}
                  {page[0].page_items * page[0].current_page -
                    page[0].page_items}{" "}
                  - {page[0].page_items * page[0].current_page} of{" "}
                  {page[0].total_items}
                </p>
              ) : (
                <p className="fst-italic">
                  Showing {(page[0].current_page - 1) * page[0].per_page} -{" "}
                  {page[0].total_items} of {page[0].total_items}
                </p>
              ))} */}
                </Col>
              </Row>
            </Container>
          </Container>
          <Container>
            <Row className="d-flex flex-wrap justify-content-center py-4">
              <Col>
                <Form
                  onSubmit={(e) => {
                    handler(sort, order, search_term, search_by, e);
                    // console.log(sort.current.value);
                  }}
                >
                  <Form.Group className="mb-3">
                    <FloatingLabel controlId="floatingSelect" label="Sort by:">
                      <Form.Select aria-label="Sort:" ref={sort}>
                        {/* <option value="Company">Company</option>
                  <option value="DatePosted">Date Posted</option>
                  <option value="Salary">Salary</option> */}
                        {page &&
                          sort_values.map((obj) => (
                            <option key={obj.id} value={obj.id}>
                              {obj.name}
                            </option>
                          ))}
                        ;
                      </Form.Select>
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <FloatingLabel controlId="floatingSelect" label="Order:">
                      <Form.Select aria-label="Order:" ref={order}>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                      </Form.Select>
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Row className="g-2">
                      <Col md>
                        <FloatingLabel
                          controlId="floatingInput"
                          label="Search"
                          className="mb-3"
                        >
                          <Form.Control
                            ref={search_term}
                            type="text"
                            placeholder="test"
                          />
                        </FloatingLabel>
                      </Col>
                      <Col md>
                        <FloatingLabel
                          controlId="floatingSelect"
                          label="Search by:"
                        >
                          <Form.Select aria-label="Search:" ref={search_by}>
                            {page &&
                              search_values.map((obj) => (
                                <option key={obj.id} value={obj.id}>
                                  {obj.name}
                                </option>
                              ))}
                            ;
                          </Form.Select>
                        </FloatingLabel>
                      </Col>
                    </Row>
                  </Form.Group>
                  <Button variant="outline-info" type="submit">
                    Go
                  </Button>
                </Form>
                <br />
              </Col>
              <Col></Col>
            </Row>
          </Container>
        </>
      ) : (
        <>
          <Container fluid className="bg-gradient3">
            <Container className="py-5 align-items-center">
              <Row>
                <Col>
                  <h1 className="py-5 fw-light">
                    Search Results for:{" "}
                    <small className="fw-bold">{page_name}</small>
                  </h1>
                  {page &&
                    (page[0].per_page === page[0].page_items ? (
                      <p className="fst-italic">
                        Showing{" "}
                        {page[0].page_items * page[0].current_page -
                          page[0].page_items}{" "}
                        - {page[0].page_items * page[0].current_page} of{" "}
                        {page[0].total_items}
                      </p>
                    ) : (
                      <p className="fst-italic">
                        Showing {(page[0].current_page - 1) * page[0].per_page}{" "}
                        - {page[0].total_items} of {page[0].total_items}
                      </p>
                    ))}

                  <Form
                    onChange={(e) =>
                      show_handler(items_per_page, search_term, search_by, e)
                    }
                  >
                    <Form.Group className="mb-3" style={{ width: "10vw" }}>
                      <FloatingLabel
                        controlId="floatingSelect"
                        label="Show items:"
                      >
                        {max_items == 30 ? (
                          <Form.Select
                            aria-label="Show items:"
                            ref={items_per_page}
                          >
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="30">30</option>                                                        
                          </Form.Select>
                        ) : (
                          <Form.Select
                            aria-label="Show items:"
                            ref={items_per_page}
                          >                    
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="30">30</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                          </Form.Select>
                        )}
                      </FloatingLabel>
                    </Form.Group>
                  </Form>
                </Col>
              </Row>
            </Container>
          </Container>
          <Container>
            <Row className="d-flex flex-wrap justify-content-center py-4">
              <Col>
                <Form
                  onSubmit={(e) => {
                    handler(sort, order, search_term, search_by, e);
                    // console.log(sort.current.value);
                  }}
                >
                  <Form.Group className="mb-3">
                    <FloatingLabel controlId="floatingSelect" label="Sort by:">
                      <Form.Select aria-label="Sort:" ref={sort}>
                        {/* <option value="Company">Company</option>
                  <option value="DatePosted">Date Posted</option>
                  <option value="Salary">Salary</option> */}
                        {page &&
                          sort_values.map((obj) => (
                            <option key={obj.id} value={obj.id}>
                              {obj.name}
                            </option>
                          ))}
                        ;
                      </Form.Select>
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <FloatingLabel controlId="floatingSelect" label="Order:">
                      <Form.Select aria-label="Order:" ref={order}>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                      </Form.Select>
                    </FloatingLabel>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Row className="g-2">
                      <Col md>
                        <FloatingLabel
                          controlId="floatingInput"
                          label="Search"
                          className="mb-3"
                        >
                          <Form.Control
                            ref={search_term}
                            type="text"
                            placeholder="test"
                          />
                        </FloatingLabel>
                      </Col>
                      <Col md>
                        <FloatingLabel
                          controlId="floatingSelect"
                          label="Search by:"
                        >
                          <Form.Select aria-label="Search:" ref={search_by}>
                            {page &&
                              search_values.map((obj) => (
                                <option key={obj.id} value={obj.id}>
                                  {obj.name}
                                </option>
                              ))}
                            ;
                          </Form.Select>
                        </FloatingLabel>
                      </Col>
                    </Row>
                  </Form.Group>

                  <Button variant="outline-info" type="submit">
                    Go
                  </Button>
                </Form>
                <br />
              </Col>
              <Col></Col>
            </Row>
          </Container>
        </>
      )}
    </>
  );
}

export default Sorting;
