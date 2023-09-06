import React, { useEffect } from "react";
import Pagination from "react-bootstrap/Pagination";

function PaginationBar({ change, total_pages, current_page }) {
  // useEffect(() => {
  //   console.log(total_pages, current_page);
  // }, [total_pages, current_page]);
  let pages = [];
  let tab = Math.floor(current_page / 5) * 5;
  // console.log(tab)

  if (current_page % 5 == 0) {
    for (let i = current_page - 4; i <= current_page; i++) {
      pages.push(
        <Pagination.Item
          key={i}
          active={i === current_page}
          onClick={() => change(i)}
        >
          {i}
        </Pagination.Item>
      );
    }
  } else {
    for (
      let i = tab + 1;
      i <= (tab + 5 > total_pages ? total_pages : tab + 5);
      i++
    ) {
      pages.push(
        <Pagination.Item
          key={i}
          active={i === current_page}
          onClick={() => change(i)}
        >
          {i}
        </Pagination.Item>
      );
    }
  }

  return (
    <div>
      <Pagination>
        {current_page > 1 && (
          <Pagination.First onClick={() => change("First")} />
        )}
        {current_page > 1 && <Pagination.Prev onClick={() => change("Prev")} />}
        {pages}
        {current_page < total_pages && (
          <Pagination.Next onClick={() => change("Next")} />
        )}
        {current_page < total_pages && (
          <Pagination.Last onClick={() => change("Last")} />
        )}
      </Pagination>
    </div>
  );
}

export default PaginationBar;
