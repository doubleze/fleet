import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import "./add.scss";

const Addn = (props) => {
  const { data } = props;
  const [formData, setFormData] = useState(data || {});
  const [vehicleOptions, setVehicleOptions] = useState([]);

  useEffect(() => {
    setFormData(data || {});
    setVehicleOptions([]);

    axios.get("http://localhost:5000/regtCars/dropdown").then((response) => {
      setVehicleOptions(response.data);
    });
  }, [data]);

  const convertToDate = (dateString) => {
    if (typeof dateString !== "string") {
      return null;
    }

    const dateParts = dateString.split("-").map(Number);

    if (
      dateParts.length !== 3 ||
      isNaN(dateParts[0]) ||
      isNaN(dateParts[1]) ||
      isNaN(dateParts[2])
    ) {
      return null;
    }

    const [day, month, year] = dateParts;
    return new Date(year, month - 1, day);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.setOpen(false);
    const {
      _id,
      dts,
      requster,
      depmnt,
      frm,
      _to,
      tm_frm,
      tm_to,
      dsc,
      vehicle,
    } = formData;

    if (data) {
      // Edit existing record

      console.log("edit");
      console.log(_id);

      try {
        axios
          .put(`http://localhost:5000/reservation/update/${_id}`, {
            dts: dts,
            requster: requster,
            depmnt: depmnt,
            frm: frm,
            _to: _to,
            tm_frm: tm_frm,
            tm_to: tm_to,
            dsc: dsc,
            reqStat: 1,
            vehicle: new Array(vehicle),
          })
          .then((res) => {
            // Alert success
            alert(" Reservation Info updated successfully!");
            console.log(res);
          });
        props.onUpdate(updatedRecord);
      } catch (error) {
        // Alert error
        if (error.response.status === 400) {
          console.log(error.response.data.message);
        }
        console.log(error.response);
        alert("Error updateding !! ");
      }
    } else {
      try {
        // Submit data to API
        axios
          .post("http://localhost:5000/reservation/Nrs", {
            dts: dts,
            requster: requster,
            depmnt: depmnt,
            frm: frm,
            _to: _to,
            tm_frm: tm_frm,
            tm_to: tm_to,
            dsc: dsc,
            reqStat: 1,
            vehicle: new Array(vehicle),
          })
          .then((res) => {
            resetForm();

            // Alert success
            alert("Reservation is created successfully!");
            console.log(res);
          });
      } catch (error) {
        // Alert error
        if (error.response.status === 400) {
          console.log(error.response.data.message);
        }
        console.log(error.response);
        alert("Error creating !!");
      }

      console.log("create");
    }
  };

  return (
    <div className="add">
      <div className="modal">
        <span className="close" onClick={() => props.setOpen(false)}>
          X
        </span>
        <h1>Add new {props.slug}</h1>
        <form onSubmit={handleSubmit}>
          {props.columns
            .filter((item) => item.field !== "id" && item.field !== "img")
            .map((column) => (
              <div className="item" key={column.field}>
                <label>{column.headerName}</label>
                {column.field === "dts" ? (
                  <DatePicker
                    selected={convertToDate(formData.dts)}
                    onChange={(date) => {
                      setFormData({
                        ...formData,
                        dts: date
                          ? `${date.getDate()}-${
                              date.getMonth() + 1
                            }-${date.getFullYear()}`
                          : null,
                      });
                    }}
                  />
                ) : column.field === "vehicle" ? (
                  <select
                    className="select-wrapper"
                    value={formData.vehicle?.label}
                    onChange={(e) =>
                      setFormData({ ...formData, ["vehicle"]: e.target.value })
                    }
                  >
                    {vehicleOptions.map((option) => (
                      <option key={option.label} value={option.label}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={column.type || "text"}
                    placeholder={column.headerName}
                    value={formData[column.field] || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [column.field]: e.target.value,
                      })
                    }
                  />
                )}
              </div>
            ))}
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Addn;
