import { useState } from "react";
import {useNavigate} from "react-router-dom"
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import Axios from "axios";
import "./Register.css";


const YupValidations = yup.object().shape({
  name: yup.string().required("Name is required"),
  dob: yup.string().required("Date of birth is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  confirmPass: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

function Registration() {
  const navigate=useNavigate()
  const [name, setName] = useState();
  const [dob, setDob] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  // const [confirmPass, setConfirmPass] = useState();
  const postData = {
    name,
    dob,
    email,
    password,
  };
  const initialValues = {
    name: "",
    dob: "",
    email: "",
    password: "",
    confirmPass: "",
  };
  const handleFormChange = (event, props) => {
    const { name, value } = event.target;
    props.handleChange(event);
    if (name === "name") {
      setName(value);
    } else if (name === "dob") {
      setDob(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
    // else if(name==="confirmPass"){
    //   setConfirmPass("")
    // }
  };
 
  const handleSubmit = async () => {
    // event.preventDefault();
    // console.log("Submitting form...");

    try {
      const response = await Axios.post("http://localhost:1000/api/user/", postData);
      const result=await response.data
      if(result.message===
        "Data received successfully!"){
         navigate("/login")
        }
      
      
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="form-main-container">
      <h1 className="heading">Registration Form</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={YupValidations}
        onSubmit={handleSubmit}
      >
        {(props) => (
          <Form
            onSubmit={props.handleSubmit}
            className="d-flex flex-column justify-content-center form-conteiner"
          >
            <label className="form-label">User Name</label>
            <Field
              className="field"
              label="Username"
              name="name"
              type="text"
              placeholder="Enter Name"
              varieant="outlined"
              margin="dense"
              onChange={(e) => handleFormChange(e, props)}
              onBlur={props.handleBlur}
              value={props.values.name}
            />
            <ErrorMessage
              name="name"
              render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
            />
            <label className="form-label">Date of Birth</label>
            <Field
              className="field"
              label="Dob"
              name="dob"
              type="date"
              varieant="outlined"
              margin="dense"
              onChange={(e) => handleFormChange(e, props)}
              onBlur={props.handleBlur}
              value={props.values.dob}
            />
            <ErrorMessage
              name="dob"
              render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
            />
            <label className="form-label">Email</label>
            <Field
              className="field"
              label="Email"
              name="email"
              type="email"
              placeholder="Enter Email"
              varieant="outlined"
              margin="dense"
              onChange={(e) => handleFormChange(e, props)}
              onBlur={props.handleBlur}
              value={props.values.email}
            />
            <ErrorMessage
              name="email"
              render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
            />
            <label className="form-label">Password</label>
            <Field
              className="field"
              label="Password"
              name="password"
              type="password"
              placeholder="Enter Password"
              varieant="outlined"
              margin="dense"
              onChange={(e) => handleFormChange(e, props)}
              onBlur={props.handleBlur}
              value={props.values.password}
            />
            <ErrorMessage
              name="password"
              render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
            />
            <label className="form-label">Confirm Password</label>
            <Field
              className="field"
              label="Confirm Password"
              name="confirmPass"
              type="confirmPass"
              placeholder="Confirm password"
              varieant="outlined"
              margin="dense"
              onChange={(e) => handleFormChange(e, props)}
              onBlur={props.handleBlur}
              value={props.values.confirmPass}
            />
            <ErrorMessage
              name="confirmPass"
              render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
            />
            <p className="to-login-anc">
              Click here to{" "}
              <a href="/login" target="__blank">
                login
              </a>
              ,if you already have an account
            </p>
            <button type="submit" className="signupbtn">
              Sign Up
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Registration;
