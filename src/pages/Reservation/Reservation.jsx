import React, { useState, useEffect } from "react";
import "./products.scss";
import DataTable from "../../component/dataTable/DataTable";
import DataTbl from "../../component/dataTable/DataTbl";
import Add from "../../component/add/Add";
import axios from "axios";

// Declare userData variables with default values
let userName = "";
let rol = "";
let department = "";

function mapReqStatToStatus(reqStat) {
  switch (reqStat) {
    case 0:
      return "Pending";
    case 1:
      return "Departmnt Approved";
    case 2:
      return "Fully Approved";
    case 3:
      return "Rejected";
    default:
      return "Unknown";
  }
}

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
    headerName: "Description",
    type: "string",
    width: 200,
  },
  {
    field: "reqStat",
    headerName: "Status",
    type: "string",
    width: 150,
    valueGetter: (params) => mapReqStatToStatus(params.row.reqStat),
  },
];

const Reservation = () => {
  const [open, setOpen] = useState(false);
  const [reservations, setReservations] = useState([]);
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(true);

  // Try to retrieve userData from local storage
  useEffect(() => {
    try {
      const userDataJSON = localStorage.getItem("userData");
      if (userDataJSON) {
        const userData = JSON.parse(userDataJSON);
        userName = userData.userName;
        rol = userData.userRole;
        department = userData.departmnt;
      }
    } catch (error) {
      console.error("Error retrieving userData from local storage:", error);
    }
  }, []);

  // Fetch reservations data
  useEffect(() => {
    async function getReservations() {
      let dataWithIds = [];
      let response = [];
      try {
        console.log(
          `check all data user name ${userName} department ${department} rol Number(${rol})`
        );
        console.log("Role check ", rol);
        if (rol === 1) {
          response = await axios.get(
            `http://localhost:5000/reservation/byUser/${userName}`
          );
        } else if (rol === 2) {
          response = await axios.get(
            `http://localhost:5000/reservation/byDepr/${department}`
          );
        } else {
          response = await axios.get(
            `http://localhost:5000/reservation/byDepr/${department}`
          );
        }
        // console.log(response.data);
        if (response.data.length > 0) {
          dataWithIds = response.data.map((item, index) => ({
            ...item,
            id: index + 1, // Generate unique IDs based on array index
          }));
        }
        setReservations(dataWithIds);
        setLoading(false);
      } catch (error) {
        if (!error.response) {
          // Network error
          console.log("where 1");
          setReservations([]);
        } else if (error.response.status === 404) {
          // 404 error
          setReservations([]);
        } else {
          // Other error
          console.error(error);
        }
      }
    }

    getReservations();
  }, [userName, department, rol]);

  // Check for role 3 and set "active" accordingly 
  useEffect(() => {
    if (rol === 3) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [columns, rol, active]);

  // Add a vehicle column conditionally based on "active"
  useEffect(() => {
    console.log("active:", active); // Log the value of active when it changes
    if (active) {
      columns.push({
        field: "vehicle",
        type: "string",
        headerName: "Plate",
        width: 150,
        key: "vehicle", // Add a unique key here
      });
    }
  }, [columns, active]);

  return (
    <div className="resrvationSt">
      <div className="info">
        <h1>Reservations</h1>
        <button onClick={() => setOpen(true)}>Add New</button>
      </div>
      <DataTable
        slug="reservations"
        columns={columns}
        rows={reservations}
        getRowId={(row) => row._id}
      />

      {open && <Add slug="Reservation" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Reservation;
