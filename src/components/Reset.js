// Toaster (It's for showing notification)
import { Toaster } from "react-hot-toast";
// Formik
import { useFormik } from "formik";

// Helpers
import { resetPasswordValite } from "../helpers/validate";

// Styles
import styles from "../styles/Username.module.css";

export const Reset = () => {
  // Formik
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    // Only validate on submit
    validate: resetPasswordValite,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log(values);

      // TODO: Send the password to the server
    },
  });

  return (
    <div className="container mx-auto">
      {/* Notification, only 1 message */}
      <Toaster position="top-center" reverseOrder={false} />

      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Reset</h4>
            <span className="py-4 text-2xl w-2/3 text-center text-gray-500">
              Enter new password.
            </span>
          </div>

          <form
            className="py-20"
            // Execute the function when the user submits the form
            onSubmit={formik.handleSubmit}
          >
            <div className="flex flex-col items-center gap-6">
              <input
                // Get the value from formik
                {...formik.getFieldProps("password")}
                className={styles.textBox}
                type="password"
                placeholder="New Password"
              />
              <input
                // Get the value from formik
                {...formik.getFieldProps("confirmPassword")}
                className={styles.textBox}
                type="password"
                placeholder="Repeat Password"
              />
              <button className={styles.btn} type="submit">
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
