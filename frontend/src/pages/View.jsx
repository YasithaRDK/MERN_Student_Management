import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const View = () => {
  const [student, setStudent] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    setSingleStudent(id);
  }, [id]);

  const setSingleStudent = async (id) => {
    const response = await axios.get(
      `http://localhost:5000/api/students/${id}`
    );
    if (response.status === 200) {
      setStudent(response.data);
    }
  };

  return (
    <div className="container">
      <div className="card mt-3">
        <div className="card-header d-flex justify-content-between">
          <h1>Employee Details</h1>
          <Link to="/">
            <button type="button" className="btn btn-success">
              Go Back
            </button>
          </Link>
        </div>
        <div className="card-body text-center">
          <h5 className="card-title">Employee Id</h5>
          <p className="card-text">{id}</p>
          <h5 className="card-title">Employee Name</h5>
          <p className="card-text">{student.name}</p>
          <h5 className="card-title">Employee Email</h5>
          <p className="card-text">{student.email}</p>
          <h5 className="card-title">Employee Contact</h5>
          <p className="card-text">{student.contact}</p>
        </div>
      </div>
    </div>
  );
};

export default View;
