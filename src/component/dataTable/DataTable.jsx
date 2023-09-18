import {
    DataGrid,
    GridToolbar
  } from "@mui/x-data-grid";
  import React, { useState } from "react";
  import "./dataTable.scss";
  import { Link } from "react-router-dom";
  import Add from "../../component/add/Add";
  
  
  const DataTable = (props) => {
  
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({});
    const [selectedItem, setSelectedItem] = useState(null);
   
  
    const handleDelete = (id) => {
      //delete the item
      // mutation.mutate(id)
    };

    const handleEdit = (row) => {
      setSelectedItem(row); // Set the selected item
      setOpen(true); // Open the popup
    };
    
  
    const actionColumn = {
      field: "action",
      headerName: "Action",
      width: 130,
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
        <DataGrid
          className="dataGrid"
          rows={props.rows}
          columns={[...props.columns, actionColumn]}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
          disableColumnFilter
          disableDensitySelector
          disableColumnSelector
        />
        {open && (
  <Add slug="Reservation" columns={props.columns} setOpen={setOpen} data={selectedItem} />
)}
      </div>
    );
  };
  
  export default DataTable;