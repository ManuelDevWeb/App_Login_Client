import { useState } from "react";
import { Link } from "react-router-dom";

// Toaster (It's for showing notification)
import toast, { Toaster } from "react-hot-toast";
// Formik
import { useFormik } from "formik";

// Helpers
import { registerValidate } from "../helpers/validate";
import { convertToBase64 } from "../helpers/convert";
import { registerUser } from "../helpers/helper";

// Images
import avatar from "../assets/profile.png";

// Styles
import styles from "../styles/Username.module.css";

export const Register = () => {
  const [file, setFile] = useState("");

  // Formik
  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
    },
    // Only validate on submit
    validate: registerValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values, { profile: file || "" });
      // Send the data to the server
      let registerPromise = registerUser(values);
      toast.promise(registerPromise, {
        loading: "Creating...",
        success: <b>Register Successfully</b>,
        error: <b>Registration failed</b>,
      });
    },
  });

  // Formik doesn't support file upload, so we need to create a function to handle it
  const onUpload = async (event) => {
    const base64 = await convertToBase64(event.target.files[0]);
    setFile(base64);
  };

  return (
    <div className="container mx-auto">
      {/* Notification */}
      <Toaster position="top-center" reverseOrder={false} />

      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Register</h4>
            <span className="py-4 text-2xl w-2/3 text-center text-gray-500">
              Happy to join you!
            </span>
          </div>

          <form
            className="py-1"
            // Execute the function when the user submits the form
            onSubmit={formik.handleSubmit}
          >
            <div className="flex justify-center py-4">
              <label htmlFor="profile">
                <img
                  className={`${styles.profileImg} object-cover`}
                  src={file || avatar}
                  alt="avatar"
                />
              </label>

              <input
                type="file"
                id="profile"
                name="profile"
                onChange={onUpload}
              />
            </div>

            <div className="flex flex-col items-center gap-6">
              <input
                // Get the value from formik
                {...formik.getFieldProps("email")}
                className={styles.textBox}
                type="text"
                placeholder="Email*"
              />
              <input
                // Get the value from formik
                {...formik.getFieldProps("username")}
                className={styles.textBox}
                type="text"
                placeholder="Username*"
              />
              <input
                // Get the value from formik
                {...formik.getFieldProps("password")}
                className={styles.textBox}
                type="password"
                placeholder="Password*"
              />
              <button className={styles.btn} type="submit">
                Register
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                Already Register?
                <Link className="text-red-500 pl-2" to="/">
                  Login Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
