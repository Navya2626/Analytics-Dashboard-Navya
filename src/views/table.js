import React, { useEffect, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/material";
import { poolHeader } from "../configuration/config";

const DataTable = () => {
  const [data, setData] = useState([]); // State to hold data from JSON
  const [columns, setColumns] = useState([]); // State to hold column definitions

  useEffect(() => {
    // Dynamically import the JSON data file
    import("../data/csvjson.json").then((jsonData) => {
      setData(jsonData); // Set the imported data to the state

      // Dynamically generate column definitions based on the JSON keys
      const generatedColumns = Object.keys(jsonData[0]).map((key) => ({
        accessorKey: key,
        header: poolHeader(key),
        size: 170,
        filterVariant: "select",
        enableClickToCopy: true,
      }));

      setColumns(generatedColumns);
    });
  }, []);

  const tableInstance = useMaterialReactTable({
    columns,
    data,
    columnFilterDisplayMode: "subheader",
    enableColumnFilters: false,
    positionToolbarAlertBanner: "center",
    enableDensityToggle: false,
    enableStickyHeader: true,
    enablePaginationSticky: true, // Custom prop to make pagination sticky
    enableColumnActions: false,
    enableRowVirtualization: true, // Enable virtualization
    rowVirtualizerOptions: { overscan: 50 },
    state: {
      showGlobalFilter: true,
    },
    initialState: {
      showColumnFilters: false,
      density: "compact",
    },

    muiTableHeadCellProps: {
      sx: {
        borderRight: "2px solid #80808066",
        padding: "8px",
        fontSize: "0.80rem",
        fontWeight: "bold",
        textAlign: "center",
        // Apply striped border styles for header cells
        borderBottom: "2px solid #d3d3d3", // Use a consistent border color for all headers
        backgroundColor: "#f5f5f5", // Optional: Add a background color to differentiate headers
      },
    },

    muiTableBodyCellProps: ({ row }) => ({
      sx: {
        borderRight: "2px solid #80808066",
        padding: "2px 8px",
        fontSize: "0.65rem",
        cursor: "pointer",
        whiteSpace: "normal",
        wordWrap: "break-word",
        // Apply striped border styles
        borderBottom:
          row.index % 2 === 0 ? "1px solid #d3d3d3" : "1px solid #a9a9a9", // Different colors or styles for odd and even rows
      },
    }),

    muiTableBodyProps: {
      sx: {
        minHeight: "30vh",
        "& tr:nth-of-type(even)": {
          backgroundColor: "#F7F7F7",
        },
      },
    },

    sx: {
      "& .MuiTableRow-root": {
        "&:hover": {
          backgroundColor: "#054992", // Row hover effect
        },
      },
      "& .MuiTableCell-root": {
        color: "#424242", // Custom cell text color
      },
      "& .MuiTablePagination-root": {
        position: "sticky", // Make pagination sticky
        bottom: 0, // Stick pagination to the bottom
        backgroundColor: "#fff", // Background color to prevent overlap
        zIndex: 1, // Ensure it stays above the scrollable content
      },
    },
  });

  const theme = createTheme({
    components: {
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderBottom: "1px solid rgba(224, 224, 224, 1)",
            backgroundColor: "#000", // Custom background color for table cells
            whiteSpace: "nowrap", // Prevent header text from wrapping
            overflow: "hidden", // Hide overflow text
            textOverflow: "ellipsis",
          },
          head: {
            backgroundColor: "#054992", // Custom header background color
            color: "#000", // Header text color
            fontWeight: "bold",
            position: "sticky", // Make the header sticky
            top: 0,
            zIndex: 1, // Ensure it stays above the scrollable content
            whiteSpace: "nowrap", // Prevent header text from wrapping
            overflow: "hidden", // Hide overflow text
            textOverflow: "ellipsis", // Show ellipsis for overflowed text
            width: "300px",
          },
        },
      },

      MuiTableRow: {
        styleOverrides: {
          root: {
            "&:nth-of-type(odd)": {
              // backgroundColor: "#054992", // Alternate row color
              color: "#000", // Alternate row text color
              width: "300px",
            },
          },
        },
      },
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <MaterialReactTable
          table={tableInstance}
          memoMode="cells"
          enableFacetedValues
          sx={{
            "& .MuiTableRow-root": {
              "&:hover": {
                backgroundColor: "#054992", // Row hover effect
              },
            },
            "& .MuiTableCell-root": {
              color: "#424242", // Custom cell text color
            },
            "& .MuiTablePagination-root": {
              position: "sticky", // Make pagination sticky
              bottom: 0, // Stick pagination to the bottom
              backgroundColor: "#fff", // Background color to prevent overlap
              zIndex: 1, // Ensure it stays above the scrollable content
            },
          }}
          enablePagination={true}
          enableColumnResizing
          columnResizeMode="onEnd"
          muiTableProps={{
            sx: {
              tableLayout: "fixed",
              overflow: "auto", // Enables scrolling for the table body
              maxHeight: "calc(100vh - 300px)", // Adjust this value based on your layout
              width: "100%", // Ensures table takes full width
            },
          }}
          enableFullScreenToggle={false}
          enableGlobalFilter={true}
          enableShowHide={true}
          globalFilterFn="myCustomFilterFn"
          enableColumnFilterModes={false}
          columnFilterDisplayMode={false}
          enableColumnOrdering
          enableColumnPinning={true}
          muiSearchTextFieldProps={{
            placeholder: "Search Column Options",
            sx: { minWidth: "14rem" },
            variant: "outlined",
          }}
          positionGlobalFilter="right"
          positionToolbarDropZone="none"
          positionToolbarAlertBanner="center"
          toolbarButtonAlignment="left"
          renderTopToolbarCustomActions={({ table }) => {
            return (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "10px",
                  minWidth: "114px",
                }}
              >
                Electric Vehicle Population
              </Box>
            );
          }}
          muiTopToolbarProps={{
            sx: {
              minHeight: "32px !important",
              maxHeight: "35px !important",
            },
          }}
          muiTableContainerProps={{
            sx: {
              minHeight: "75vh",
              "@media (min-height: 1024px)": {
                minHeight: "82vh",
              },
            },
          }}
        />
      </ThemeProvider>
    </>
  );
};

export default DataTable;
