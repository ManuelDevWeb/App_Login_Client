import { Link } from "react-router-dom";

// Toaster (It's for showing notification)
import { Toaster } from "react-hot-toast";
// Formik
import { useFormik } from "formik";

// Helpers
import { usernameValidate } from "../helpers/validate";

// Images
import avatar from "../assets/profile.png";

// Styles
import styles from "../styles/Username.module.css";

export const Username = () => {
  // Formik
  const formik = useFormik({
    initialValues: {
      username: "",
    },
    // Only validate on submit
    validate: usernameValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log(values);

      // TODO: Send the username to the server
    },
  });

  return (
    <div className="container mx-auto">
      {/* Notification */}
      <Toaster position="top-center" reverseOrder={false} />

      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Hello Again!</h4>
            <span className="py-4 text-2xl w-2/3 text-center text-gray-500">
              Explore More by connecting with us.
            </span>
          </div>

          <form
            className="py-1"
            // Execute the function when the user submits the form
            onSubmit={formik.handleSubmit}
          >
            <div className="flex justify-center py-4">
              <img className={styles.profileImg} src={avatar} alt="avatar" />
            </div>

            <div className="flex flex-col items-center gap-6">
              <input
                // Get the value from formik
                {...formik.getFieldProps("username")}
                className={styles.textBox}
                type="text"
                placeholder="Username"
              />
              <button className={styles.btn} type="submit">
                Let's Go
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                Not a Member
                <Link className="text-red-500 pl-2" to="/register">
                  Register Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
