import React, { useState } from "react";
import "./products.scss";
import DataTable from "../../component/dataTable/DataTable";
import DataTbl from "../../component/dataTable/DataTbl"; //DataTbl
import Add from "../../component/add/Add";
import axios from "axios";
// import { resrvations } from "../../data";

const columns = [
  {
    field: "dts",
    type: "Date",
    headerName: "Date",
    width: 150,
  },

  {
    field: "requster",
    type: "string",
    headerName: "Requested By",
    width: 250,
  },

  {
    field: "depmnt",
    type: "string",
    headerName: "Department",
    width: 200,
  },
  {
    field: "frm",
    type: "string",
    headerName: "From where",
    width: 150,
  },

  {
    field: "_to",
    type: "string",
    headerName: "To where",
    width: 150,
  },
  {
    field: "tm_frm",
    type: "string",
    headerName: "Starting",
    width: 150,
  },
  {
    field: "tm_to",
    type: "string",
    headerName: "Up to",
    width: 150,
  },
  {
    field: "dsc",
    headerName: "Discription",
    type: "string",
    width: 200,
  },
  {
    field: "vehicle",
    type: "string",
    headerName: "Plate",
    width: 150,
  },
];

const Reservation = () => {
  const [open, setOpen] = useState(false);
  const [resrvations, setResrvations] = useState([]);
  const [active, setActtive] = useState([]);

  async function getResrvation() {
    try {
      const response = await axios.get("http://localhost:5000/reservation");
      // console.log(response.data);
      const dataWithIds = response.data.map((item, index) => ({
        ...item,
        id: index + 1, // Generate unique IDs based on array index
      }));
      setResrvations(dataWithIds);
    } catch (error) {
      console.error(error);
    }
  }

  getResrvation();

  return (
    <div className="products">
      <div className="info">
        <h1>Resrvations</h1>
        <button onClick={() => setOpen(true)}>Add New</button>
      </div>
      <DataTable
        slug="resrvations"
        columns={columns}
        rows={resrvations}
        getRowId={(row) => row._id}
      />

      {open && <Add slug="Resrvation" columns={columns} setOpen={setOpen} />}
    </div>

    
  );
};

export default Reservation;