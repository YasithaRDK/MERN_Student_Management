import { React, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const AddEdit = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
  });

  const { name, email, contact } = formData;

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getSingleStudent(id);
    }
  }, [id]);

  const getSingleStudent = async (id) => {
    const response = await axios.get(
      `http://localhost:5000/api/students/${id}`
    );
    if (response.status === 200) {
      setFormData({
        name: response.data.name,
        email: response.data.email,
        contact: response.data.contact,
      });
    }
  };

  const addStudent = async (data) => {
    const response = await axios.post(
      "http://localhost:5000/api/students/",
      data
    );
    if (response.status === 200) {
      toast.success("Record added successfully");
    }
  };

  const updateStudent = async (id, data) => {
    const response = await axios.put(
      `http://localhost:5000/api/students/${id}`,
      data
    );
    if (response.status === 200) {
      toast.success("Record updated successfully");
    } else {
      toast.error("Some thing went wrong");
    }
  };

  const onChange = (e) => {
    setFormData((preState) => ({
      ...preState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !contact) {
      toast.error("Please provide values into each inputs");
    } else {
      const data = { name, email, contact };
      if (!id) {
        addStudent(data);
      } else {
        updateStudent(id, data);
      }
      navigate("/");
    }
  };

  return (
    <div className="container">
      <div className="card mt-3">
        <div className="card-header d-flex justify-content-between">
          <h1>Add Student</h1>
          <Link to="/">
            <button className="btn btn-success mt-2">Go back</button>
          </Link>
        </div>
        <div className="card-body">
          <form onSubmit={onSubmit}>
            <div className="row mb-3">
              <label className="col-sm-2 col-form-label">Name</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Student name"
                  id="name"
                  name="name"
                  value={name}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-2 col-form-label">Email</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Student email address"
                  id="email"
                  name="email"
                  value={email}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-2 col-form-label">Contact</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Student contact number"
                  id="contact"
                  name="contact"
                  value={contact}
                  onChange={onChange}
                />
              </div>
            </div>
            <button
              type="submit"
              className={id ? "btn btn-success" : "btn btn-primary"}
            >
              {id ? "Update" : "Add"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEdit;
