import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  registerRequest,
  resetRegisterState,
} from "../../ReduxToolkit/authSlice";
import "./SignUp.css";

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, isRegistered } = useSelector(
    (state) => state.auth
  );

  // ✅ Redirect after successful registration
  useEffect(() => {
    if (isRegistered) {
      navigate("/signin"); // make sure route matches
      dispatch(resetRegisterState());
    }
  }, [isRegistered, navigate, dispatch]);

  // ✅ Regex
  const phoneRegExp = /^[6-9]\d{9}$/;
  const passwordRegExp = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;

  // ✅ Validation
  const validationSchema = Yup.object({
    FullName: Yup.string().min(3).required("Full Name is required"),
    phoneNumber: Yup.string()
      .matches(phoneRegExp, "Invalid phone")
      .required("Phone required"),
    Email: Yup.string().email().required("Email required"),
    Password: Yup.string()
      .matches(passwordRegExp, "Min 6 chars with number")
      .required("Password required"),
    Dob: Yup.date().required("DOB required"),
    age: Yup.number().min(10).max(100),
    Gender: Yup.string().required("Select gender"),
    Address: Yup.string().required("Address required"),
    City: Yup.string().required("City required"),
    State: Yup.string().required("State required"),
    Country: Yup.string().required("Country required"),
    Pincode: Yup.string()
      .matches(/^[1-9][0-9]{5}$/, "Invalid pincode")
      .required("Pincode required"),
  });

  // ✅ Age Calculator
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // ✅ Password Rules
  const getPasswordRules = (password) => ({
    length: password.length >= 6,
    letter: /[A-Za-z]/.test(password),
    number: /\d/.test(password),
  });

  const formik = useFormik({
    initialValues: {
      FullName: "",
      phoneNumber: "",
      Email: "",
      Password: "",
      Dob: "",
      age: "",
      Address: "",
      City: "",
      Gender: "",
      Pincode: "",
      Country: "",
      State: "",
    },
    validationSchema,

    // ✅ FIXED: No async / no res
    onSubmit: (values) => {
      dispatch(registerRequest(values));
    },
  });

  const passwordRules = getPasswordRules(formik.values.Password);

  // ✅ Step validation
  const validateStep = async () => {
    let fields = [];

    if (step === 1) {
      fields = ["FullName", "phoneNumber", "Email", "Password"];
    } else if (step === 2) {
      fields = ["Dob", "age", "Gender"];
    }

    const errors = await formik.validateForm();
    const stepErrors = fields.filter((f) => errors[f]);

    if (stepErrors.length === 0) {
      setStep((prev) => prev + 1);
    } else {
      formik.setTouched(
        fields.reduce((acc, f) => ({ ...acc, [f]: true }), {})
      );
    }
  };

  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <div className="signup-container">
      <div className="signup-left">
        <div className="overlay">
          <h1>Create Your Account Today</h1>
          <p>Personalized Shopping • Faster Checkout • Exclusive Offers</p>
        </div>
      </div>

      <div className="signup-right">
        <div className="signup-card">
          <h2>Shrigaar</h2>
          <h3>Create Account</h3>

          <div className="progress-bar">
            <div className={`step ${step >= 1 ? "active" : ""}`} />
            <div className={`step ${step >= 2 ? "active" : ""}`} />
            <div className={`step ${step >= 3 ? "active" : ""}`} />
          </div>

          <p>Step {step} of 3</p>

          <form onSubmit={formik.handleSubmit}>
            {/* STEP 1 */}
            {step === 1 && (
              <>
                <input name="FullName" placeholder="Full Name"
                  onChange={formik.handleChange}
                  value={formik.values.FullName}
                />
                {formik.touched.FullName && formik.errors.FullName && (
                  <p className="error">{formik.errors.FullName}</p>
                )}

                <input name="phoneNumber" placeholder="Phone"
                  onChange={formik.handleChange}
                  value={formik.values.phoneNumber}
                />
                {formik.errors.phoneNumber && (
                  <p className="error">{formik.errors.phoneNumber}</p>
                )}

                <input name="Email" placeholder="Email"
                  onChange={formik.handleChange}
                  value={formik.values.Email}
                />
                {formik.errors.Email && (
                  <p className="error">{formik.errors.Email}</p>
                )}

                {/* PASSWORD */}
                <div className="password-field">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="Password"
                    placeholder="Password"
                    onChange={formik.handleChange}
                    value={formik.values.Password}
                  />
                  <span onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? "🙈" : "👁"}
                  </span>
                </div>

                {formik.values.Password && (
                  <div className="password-rules">
                    <p className={passwordRules.length ? "valid" : "invalid"}>
                      6+ characters
                    </p>
                    <p className={passwordRules.letter ? "valid" : "invalid"}>
                      Letter required
                    </p>
                    <p className={passwordRules.number ? "valid" : "invalid"}>
                      Number required
                    </p>
                  </div>
                )}

                <button type="button" onClick={validateStep}>
                  Continue
                </button>
              </>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <>
                <input
                  type="date"
                  name="Dob"
                  onChange={(e) => {
                    formik.handleChange(e);
                    formik.setFieldValue(
                      "age",
                      calculateAge(e.target.value)
                    );
                  }}
                />

                <input type="number" value={formik.values.age} readOnly />

                <select name="Gender" onChange={formik.handleChange}>
                  <option value="">Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>

                <div className="btn-group">
                  <button onClick={prevStep}>Back</button>
                  <button type="button" onClick={validateStep}>
                    Continue
                  </button>
                </div>
              </>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <>
                <input name="Address" placeholder="Address"
                  onChange={formik.handleChange}
                />
                <input name="City" placeholder="City"
                  onChange={formik.handleChange}
                />
                <input name="State" placeholder="State"
                  onChange={formik.handleChange}
                />
                <input name="Country" placeholder="Country"
                  onChange={formik.handleChange}
                />
                <input name="Pincode" placeholder="Pincode"
                  onChange={formik.handleChange}
                />

                <div className="btn-group">
                  <button onClick={prevStep}>Back</button>
                  <button type="submit">
                    {loading ? "Creating..." : "Create Account"}
                  </button>
                </div>
              </>
            )}
          </form>

          {error && <p className="error">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default SignUp;