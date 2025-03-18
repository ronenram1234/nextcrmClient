import { FunctionComponent,  useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { UserReg } from "../interfaces/User";
// import TextField from "@mui/material/TextField";
import { TextField } from "@mui/material";

import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { createUser } from "../services/userServices";
import { errorMsg, successMsg } from "../services/feedbackService";

interface RegisterProps {
  setIsRegister: React.Dispatch<React.SetStateAction<boolean>>;
}

const Register: FunctionComponent<RegisterProps> = ({ setIsRegister }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const formik = useFormik<UserReg>({
    
    initialValues: {
      name: {
        first: "",
        middle: "",
        last: "",
      },
      phone: "",
      email: "",
      password: "",
      image: {
        url: "",
        alt: "",
      },
      address: {
        state: "",
        country: "",
        city: "",
        street: "",
        houseNumber: 0,
        zip: 0,
      },
      isBusiness: false,
    },
    validationSchema: yup.object({
      name: yup.object({
        first: yup.string().required().min(2).max(256),
        middle: yup.string().min(2).max(256),
        last: yup.string().required().min(2).max(256),
      }),
      phone: yup
        .string()
        .required()
        .min(9)
        .max(11)
        .matches(/^\+?[0-9]{7,15}$/, "Invalid phone number"),
      email: yup
        .string()
        .email("Invalid email address")
        .required()
        .min(5, "must be at least 5 characters"),
      password: yup
      .string()
      .required('Password is required')
      .min(7, 'Password must be at least 7 characters')
      .max(20, 'Password cannot exceed 20 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=(.*\d.*\d.*\d.*\d))(?=.*[!*@#$%^&*()_+={}\[\]:;"'<>,.?/-]).{7,20}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, at least 4 digits, and one special character"
      ),
    
      image: yup.object({
        url: yup.string().min(14).url("Invalid URL"),
        alt: yup.string().min(2).max(256),
      }),
      address: yup.object({
        state: yup.string().min(2).max(256),
        country: yup.string().required().min(2).max(256),
        city: yup.string().required().min(2).max(256),
        street: yup.string().required().min(2).max(256),
        houseNumber: yup
          .number()
          .required()
          .min(2)
          .max(256)
          .positive()
          .integer(),
        zip: yup
          .number()
          .positive("ZIP code must be positive")
          .integer("ZIP code must be an integer")
          .required()
          .min(2)
          .max(256),
      }),
      isBusiness: yup.boolean().required(),
    }),
    onSubmit: async (values) => {
      createUser(values)
        .then((res) => {
          
            
            console.log("sucess ", res.data);
            successMsg("Registration complete sucessfuly")
            setIsRegister(false)
            
          }
        )
        .catch((err) => {
          console.log(err);
          
          errorMsg(`Transaction Error - ${err.response.data}`)
          
          
        });
    },
  });

  return (
    <>
      <div className="container d-flex justify-content-center align-item-center flex-column col-12">
        <h5 className="display-5 my-2">Register</h5>
        <form onSubmit={formik.handleSubmit}>
          {/* line 1 */}
          <div className="d-flex justify-content-center align-item-center flex-row col-12 mt-4">
            <div className="form-floating mx-3 col-6">
              <TextField
                //  onChange={(e)=>{console.log(e.target)}}
                variant="outlined"
                label="First name*"
                type="text"
                name="name.first"
                value={formik.values.name.first}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                error={
                  formik.touched.name?.first &&
                  Boolean(formik.errors.name?.first)
                }
                helperText={
                  formik.touched.name?.first && formik.errors.name?.first
                }
              />
            </div>

            <div className="form-floating  col-6">
              <TextField
                variant="outlined"
                label="Middle name"
                type="text"
                name="name.middle"
                value={formik.values.name.middle}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                error={
                  formik.touched.name?.middle &&
                  Boolean(formik.errors.name?.middle)
                }
                helperText={
                  formik.touched.name?.middle && formik.errors.name?.middle
                }
              />
            </div>
          </div>

          {/* line 2 */}
          <div className="d-flex justify-content-center align-item-center flex-row col-12 mt-4">
            <div className="form-floating mx-3 col-6">
              <TextField
                variant="outlined"
                label="Last name*"
                type="text"
                name="name.last"
                value={formik.values.name.last}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                error={
                  formik.touched.name?.last && Boolean(formik.errors.name?.last)
                }
                helperText={
                  formik.touched.name?.last && formik.errors.name?.last
                }
              />
            </div>

            <div className="form-floating  col-6">
              <TextField
                variant="outlined"
                label="Phone*"
                type="tel"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
              />
            </div>
          </div>

          {/* line 3 */}
          <div className="d-flex justify-content-center align-item-center flex-row col-12 mt-4">
            <div className="form-floating mx-3 col-6">
              <TextField
                variant="outlined"
                label="Email*"
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

            <div className="form-floating  col-6">
              <TextField
                variant="outlined"
                label="Password*"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
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
          </div>

          {/* line 4 */}
          <div className="d-flex justify-content-center align-item-center flex-row col-12 mt-4">
            <div className="form-floating mx-3 col-6">
              <TextField
                variant="outlined"
                label="URL"
                type="url"
                name="image.url"
                value={formik.values.image?.url}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                error={Boolean(
                  formik.touched.image?.url && formik.errors.image?.url
                )}
                helperText={
                  formik.touched.image?.url && formik.errors.image?.url
                }
              />
            </div>

            <div className="form-floating  col-6">
              <TextField
                variant="outlined"
                label="Alt"
                type="text"
                name="image.alt"
                value={formik.values.image?.alt}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                error={
                  formik.touched.image?.alt && Boolean(formik.errors.image?.alt)
                }
                helperText={
                  formik.touched.image?.alt && formik.errors.image?.alt
                }
              />
            </div>
          </div>

          {/* line 5 */}
          <div className="d-flex justify-content-center align-item-center flex-row col-12 mt-4">
            <div className="form-floating mx-3 col-6">
              <TextField
                variant="outlined"
                label="State"
                type="text"
                name="address.state"
                value={formik.values.address?.state}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                error={Boolean(
                  formik.touched.address?.state && formik.errors.address?.state
                )}
                helperText={
                  formik.touched.address?.state && formik.errors.address?.state
                }
              />
            </div>

            <div className="form-floating  col-6">
              <TextField
                variant="outlined"
                label="Country*"
                type="text"
                name="address.country"
                value={formik.values.address?.country}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                error={
                  formik.touched.address?.country &&
                  Boolean(formik.errors.address?.country)
                }
                helperText={
                  formik.touched.address?.country &&
                  formik.errors.address?.country
                }
              />
            </div>
          </div>

          {/* line 6 */}
          <div className="d-flex justify-content-center align-item-center flex-row col-12 mt-4">
            <div className="form-floating mx-3 col-6">
              <TextField
                variant="outlined"
                label="City*"
                type="text"
                name="address.city"
                value={formik.values.address?.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                error={Boolean(
                  formik.touched.address?.city && formik.errors.address?.city
                )}
                helperText={
                  formik.touched.address?.city && formik.errors.address?.city
                }
              />
            </div>

            <div className="form-floating  col-6">
              <TextField
                variant="outlined"
                label="Street*"
                type="text"
                name="address.street"
                value={formik.values.address?.street}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                error={
                  formik.touched.address?.street &&
                  Boolean(formik.errors.address?.street)
                }
                helperText={
                  formik.touched.address?.street &&
                  formik.errors.address?.street
                }
              />
            </div>
          </div>

          {/* line 7 */}
          <div className="d-flex justify-content-center align-item-center flex-row col-12 mt-4">
            <div className="form-floating mx-3 col-6">
              <TextField
                variant="outlined"
                label="House Number*"
                type="number"
                name="address.houseNumber"
                value={formik.values.address?.houseNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                error={Boolean(
                  formik.touched.address?.houseNumber &&
                    formik.errors.address?.houseNumber
                )}
                helperText={
                  formik.touched.address?.houseNumber &&
                  formik.errors.address?.houseNumber
                }
              />
            </div>

            <div className="form-floating  col-6">
              <TextField
                variant="outlined"
                label="Zip*"
                type="number"
                name="address.zip"
                value={formik.values.address?.zip}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                error={
                  formik.touched.address?.zip &&
                  Boolean(formik.errors.address?.zip)
                }
                helperText={
                  formik.touched.address?.zip && formik.errors.address?.zip
                }
              />
            </div>
          </div>

          <div className="d-flex align-items-center mt-3">
            <label>
              <input
                type="checkbox"
                name="isBusiness"
                checked={formik.values.isBusiness}
                onChange={formik.handleChange}
              />
              <span className="ms-2">Signup as business</span>
            </label>
          </div>

          <div className="d-flex justify-content-center align-item-center flex-row col-12 mt-4">
            <button
              className="btn btn-primary mx-3 col-6"
              type="submit"
              disabled={!formik.dirty || !formik.isValid}
            >
              SUBMIT
            </button>

            <button
              className="btn btn-danger mx-3 col-6"
              type="button"
              onClick={() => {
                setIsRegister(false);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
        <p className="mt-3">
          <a
            onClick={() => setIsRegister(false)}
            style={{
              color: "blue",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Back to Login
          </a>
        </p>
      </div>
    </>
  );
};

export default Register;
