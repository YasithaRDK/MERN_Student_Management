import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Home = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    getStudents();
  }, []);

  const getStudents = async () => {
    const response = await axios.get("http://localhost:5000/api/students/");
    if (response.status === 200) {
      setStudents(response.data);
    }
  };

  const onDeleteStudent = async (id) => {
    if (window.confirm("Are you sure to delete that record")) {
      const response = await axios.delete(
        `http://localhost:5000/api/students/${id}`
      );
      if (response.status === 200) {
        toast.success("Record Deleted");
        getStudents();
      }
    }
  };

  return (
    <div className="container">
      <div className="card mt-3">
        <div className="card-header d-flex justify-content-between">
          <h1>Student List</h1>
          <Link to="/add">
            <button className="btn btn-primary mt-2">Add</button>
          </Link>
        </div>
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Contact</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.contact}</td>
                    <td>
                      <Link to={`/update/${student._id}`}>
                        <button className="btn btn-success me-2">Edit</button>
                      </Link>
                      <button
                        className="btn btn-danger me-2"
                        onClick={() => onDeleteStudent(student._id)}
                      >
                        Delete
                      </button>
                      <Link to={`/view/${student._id}`}>
                        <button className="btn btn-info">View</button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
