import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Toaster (It's for showing notification)
import toast, { Toaster } from "react-hot-toast";
// Formik
import { useFormik } from "formik";

// Custom Hooks
import { useFetch } from "../hooks/fetch.hook";

// Helpers
import { profileValidate } from "../helpers/validate";
import { convertToBase64 } from "../helpers/convert";
import { updateUser } from "../helpers/helper";

// Images
import avatar from "../assets/profile.png";

// Styles
import styles from "../styles/Username.module.css";
import extend from "../styles/Profile.module.css";

export const Profile = () => {
  const navigate = useNavigate();

  const [file, setFile] = useState("");

  const [{ isLoading, apiData, serverError }] = useFetch();

  // Formik
  const formik = useFormik({
    initialValues: {
      firstName: apiData?.user?.firstName || "",
      lastName: apiData?.user?.lastName || "",
      mobile: apiData?.user?.mobile || "",
      email: apiData?.user?.email || "",
      address: apiData?.user?.address || "",
    },
    enableReinitialize: true,
    // Only validate on submit
    validate: profileValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values, {
        profile: file || apiData?.user?.profile || "",
      });

      let updatePromise = updateUser(values);

      toast.promise(updatePromise, {
        loading: "Updating...",
        success: <b>Update Successfully...!</b>,
        error: <b>Could not Update!</b>,
      });
    },
  });

  if (isLoading) return <h1 className="text-2xl font-bold">Loading...</h1>;

  if (serverError)
    return <h1 className="text-xl text-red-500">{serverError.message}</h1>;

  // Formik doesn't support file upload, so we need to create a function to handle it
  const onUpload = async (event) => {
    const base64 = await convertToBase64(event.target.files[0]);
    setFile(base64);
  };

  // Logout handled functions
  const userLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="container mx-auto">
      {/* Notification */}
      <Toaster position="top-center" reverseOrder={false} />

      <div className="flex justify-center items-center h-screen">
        <div className={`${styles.glass} ${extend.glass}`}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Profile</h4>
            <span className="py-4 text-2xl w-2/3 text-center text-gray-500">
              You can update the details.
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
                  className={`${styles.profileImg} ${extend.profileImg}  object-cover`}
                  src={apiData?.user?.profile || file || avatar}
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
              <div className="name flex w-3/4 gap-10">
                <input
                  // Get the value from formik
                  {...formik.getFieldProps("firstName")}
                  className={`${styles.textBox} ${extend.textBox}`}
                  type="text"
                  placeholder="FirstName"
                />
                <input
                  // Get the value from formik
                  {...formik.getFieldProps("lastName")}
                  className={`${styles.textBox} ${extend.textBox}`}
                  type="text"
                  placeholder="LastName"
                />
              </div>
              <div className="name flex w-3/4 gap-10">
                <input
                  // Get the value from formik
                  {...formik.getFieldProps("mobile")}
                  className={`${styles.textBox} ${extend.textBox}`}
                  type="text"
                  placeholder="Mobile"
                />
                <input
                  // Get the value from formik
                  {...formik.getFieldProps("email")}
                  className={`${styles.textBox} ${extend.textBox}`}
                  type="text"
                  placeholder="Email*"
                />
              </div>

              <input
                // Get the value from formik
                {...formik.getFieldProps("address")}
                className={`${styles.textBox} ${extend.textBox}`}
                type="text"
                placeholder="Address"
              />

              <button className={styles.btn} type="submit">
                Update
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                Come back later?
                <button
                  onClick={userLogout}
                  className="text-red-500 pl-2"
                  to="/"
                >
                  Logout
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
