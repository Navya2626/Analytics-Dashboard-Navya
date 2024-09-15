// Define styles outside the component for better readability
const paginationStyle = {
  flexGrow: 1,
  display: "flex",
  justifyContent: "center",
  marginLeft: "18%",
};

const boxBottomStyles = {
  display: "flex",
  alignItems: "center",
  marginLeft: "10px",
  minWidth: "10px !important",
  width: "100%",
  justifyContent: "space-between",
};

function poolHeader(header) {
  const stringArr = header.split(" ").join("\u00A0");
  return stringArr;
}

export { boxBottomStyles, paginationStyle, poolHeader };
