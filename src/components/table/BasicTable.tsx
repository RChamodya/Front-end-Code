import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material/Pagination";
import { useState } from "react";
import { Box, Icon } from "@mui/material";

interface BasicTableProps {
  columnHeaders: Array<string>;
  tableData: Array<any>;
  actionButtons: Array<any>;
  id: any;
}

function BasicTable({
  columnHeaders,
  tableData,
  actionButtons,
  id,
}: BasicTableProps) {
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);

  const paginatedData = tableData.slice(
    (page - 1) * rowsPerPage,
    (page - 1) * rowsPerPage + rowsPerPage,
  );

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {columnHeaders.map((m: string, index: number) => (
                <TableCell key={index}>{m}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row, index) => (
              <TableRow key={index}>
                {Object.entries(row).map(([key, value], index2) => (
                  <TableCell key={index2}>
                    <>{value}</>
                  </TableCell>
                ))}
                {actionButtons.map((b: any, index3: number) => (
                  <TableCell key={index3}>
                    {
                      <Icon
                        onClick={() => {
                          return b.action(row[id]);
                        }}
                      >
                        {b.icon}
                      </Icon>
                    }
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {tableData?.length ? (
          <Box display="flex" justifyContent="center" mb={1} mt={1}>
            <Pagination
              count={Math.ceil(tableData.length / rowsPerPage)}
              color="primary"
              onChange={handleChangePage}
              page={page}
            />
          </Box>
        ) : (
          <></>
        )}
      </TableContainer>
    </>
  );
}

export default BasicTable;
