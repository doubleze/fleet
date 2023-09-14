import React, { useState } from "react";
import "./tbl.scss";
import { Link } from "react-router-dom";
import Add from "../../component/add/Add";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const DataTabl = (props) => {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleDelete = (id) => {
    // delete the item
    // mutation.mutate(id)
  };

  const handleEdit = (row) => {
    setSelectedItem(row); // Set the selected item
    setOpen(true); // Open the popup
  };

  const handleSelectAllChange = (event) => {
    if (event.target.checked) {
      setSelectedRows(props.rows.map((row) => row.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleRowSelectionChange = (event, row) => {
    const rowIndex = selectedRows.indexOf(row.id);
    if (rowIndex === -1) {
      setSelectedRows([...selectedRows, row.id]);
    } else {
      setSelectedRows([
        ...selectedRows.slice(0, rowIndex),
        ...selectedRows.slice(rowIndex + 1),
      ]);
    }
  };

  const actionColumn = {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="action">
          <Link onClick={() => handleEdit(params.row)}>
            <img src="/view.svg" alt="" />
          </Link>
          <div className="delete" onClick={() => handleDelete(params.row.id)}>
            <img src="/delete.svg" alt="" />
          </div>
        </div>
      );
    },
  };

  return (
    <div className="dataTable">
      <FormControlLabel
        control={
          <Checkbox
            checked={selectedRows.length === props.rows.length}
            onChange={handleSelectAllChange}
          />
        }
        label="Select All"
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {props.columns.map((column) => (
                <TableCell key={column.field}>{column.headerName}</TableCell>
              ))}
              <TableCell>{actionColumn.headerName}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.rows.map((row) => (
              <TableRow
                key={row.id}
                selected={selectedRows.includes(row.id)}
                onClick={(event) => handleRowSelectionChange(event, row)}
                hover
              >
                {props.columns.map((column) => (
                  <TableCell key={column.field}>{row[column.field]}</TableCell>
                ))}
                <TableCell>
                  <div className="action">
                    <Link onClick={() => handleEdit(row)}>
                      <img src="/view.svg" alt="" />
                    </Link>
                    <div className="delete" onClick={() => handleDelete(row.id)}>
                      <img src="/delete.svg" alt="" />
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {open && (
        <Add
          slug="Reservation"
          columns={props.columns}
          setOpen={setOpen}
          data={selectedItem}
        />
      )}
    </div>
  );
};

export default DataTabl;
