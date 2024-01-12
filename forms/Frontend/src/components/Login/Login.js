  import React from "react";
  import { useNavigate } from "react-router-dom";
  import { useFormik } from "formik";
  import * as yup from "yup";
  import Axios from "axios";
  // import Table from "../Table/table"
  import "./Login.css";


  const validationSchema = yup.object().shape({
    email: yup.string().email("Invalid email address").required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters"),
  });

  function Login() {
    const navigate=useNavigate()
    const initialValues = {
      email: "",
      password: "",
    };

    const onSubmit = async (values, { setSubmitting }) => {
      try {
        const response = await Axios.post("http://localhost:1000/api/auth/user", values);
        const result = response.data;
    
        if (result.message === 'User found') {
          localStorage.setItem("token", result.token);
          localStorage.setItem("user", JSON.stringify(result.user));
          console.log("Login successful");
          navigate("/")
        }
    
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setSubmitting(false);
      }
    };;

    const formik = useFormik({
      initialValues,
      validationSchema,
      onSubmit,
    });

    return (
      <div>
        <h1 className="login">Login</h1>
        <form onSubmit={formik.handleSubmit} className="login-form-cont">
          <label>UserName</label>
          <input
            type="email"
            name="email"
            placeholder="Enter username"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <div style={{ color: "red" }}>{formik.errors.email}</div>
          )}

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password && (
            <div style={{ color: "red" }}>{formik.errors.password}</div>
          )}
          <div className="d-flex justify-content-between align-items-center">
          <p className="sn-su-cl">Click here to <a href="/signup">signup </a></p>
           <p><a href="#">forgot password?</a></p>
          </div>
          <button type="submit" disabled={formik.isSubmitting}>
            Sign In
          </button>
        </form>
      </div>
    );
  }

  export default Login;
