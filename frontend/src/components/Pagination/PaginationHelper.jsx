export const getPageData = (action, url, page) => {
  let result;
  switch (action) {
    case "Next":
      result = url.concat(`${page[0].current_page + 1}`);
      break;
    case "Prev":
      result = url.concat(`${page[0].current_page - 1}`);
      break;
    case "First":
      result = url.concat("1");
      break;
    case "Last":
      result = url.concat(`${page[0].total}`);
      break;
    default:
      result = url.concat(`${action}`);
      break;
  }
  return fetch(result)
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((err) => console.log(err));
};
