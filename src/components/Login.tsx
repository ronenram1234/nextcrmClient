import { FunctionComponent, useContext, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { UserLoginFormValues } from "../interfaces/User";

import { getUserToken, setTokenLocalStorage } from "../services/userServices";
import { GlobalProps } from "../App";
import TextField from "@mui/material/TextField";
// import { TextField } from "@mui/material";

import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { errorMsg, successMsg } from "../services/feedbackService";

interface LoginProps {
  setIsRegister: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: FunctionComponent<LoginProps> = ({ setIsRegister }) => {
  const { setToken, setIsUsserLogedin } = useContext(GlobalProps);

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const formik = useFormik<UserLoginFormValues>({
    initialValues: {
      email: "",
      password: "",
      
    },
    validationSchema: yup.object({
      email: yup.string().email("Invalid email").required("Email is required"),
      password: yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      getUserToken(values)
        .then((res) => {
          if (res.data.length > 0) {
            successMsg("Succesful login")
            console.log(res.data);
            setToken(res.data);
            setTokenLocalStorage(res.data);
            setIsUsserLogedin(true);
          } else {
            console.log(values.email);
            
            errorMsg(`${values.email} user not found `);
          }
        })
        .catch((err) => {
          console.log(err);
          errorMsg(`Transaction Error - ${err.response.data}`);
        });
    },
  });

  return (
    <div className="container d-flex justify-content-center align-item-center flex-column col-6">
      <h5 className="display-5 my-2">LOGIN</h5>
      <form onSubmit={formik.handleSubmit}>
        
        <div className="mb-3">
          <TextField
            variant="outlined"
            label="Email"
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </div>

        {/* Password Field */}
        <div className="mb-3">
          <TextField
            variant="outlined"
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>

        {/* Submit Button */}
        <button
          className="btn btn-primary mt-3 w-100"
          type="submit"
          disabled={!formik.dirty || !formik.isValid}
        >
          Login
        </button>

        {/* <p style={{ color: "red" }}>{msg}</p> */}
        
      </form>

      <p className="mt-3">
        <button
          onClick={() => setIsRegister(true)}
          style={{
            color: "blue",
            cursor: "pointer",
            textDecoration: "underline",
            background: "none",
            border: "none",
            padding: 0,
            fontSize: "inherit",
            fontFamily: "inherit",
          }}
        >
          New user? Register now
        </button>
      </p>
    </div>
  );
};

export default Login;
