import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Toaster (It's for showing notification)
import toast, { Toaster } from "react-hot-toast";

// Store
import { useAuthStore } from "../store/store";

// Helpers
import { generateOTP, verifyOTP } from "../helpers/helper";

// Styles
import styles from "../styles/Username.module.css";

export const Recovery = () => {
  const navigate = useNavigate();

  const { username } = useAuthStore((state) => state.auth);

  const [OTP, setOTP] = useState();

  useEffect(() => {
    generateOTP(username).then((OTP) => {
      if (OTP) return toast.success(OTP.message);
      return toast.error("Problem while generating OTP!");
    });
  }, [username]);

  async function onSubmit(e) {
    e.preventDefault();

    let data = await verifyOTP({ username, code: OTP });

    if (data?.data?.status === 201) {
      toast.success(data.data.data.message);
      return navigate("/reset");
    }

    return toast.error("Wrong OTP! Check email again!");
  }

  // Resend OTP
  async function resendOTP() {
    let sendPromise = await generateOTP(username);

    if (sendPromise.OTP) {
      toast.success("OTP has been send to your email");
    } else {
      toast.error("Something is wrong!");
    }
  }

  return (
    <div className="container mx-auto">
      {/* Notification */}
      <Toaster position="top-center" reverseOrder={false} />

      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Recovery</h4>
            <span className="py-4 text-2xl w-2/3 text-center text-gray-500">
              Enter OTP to recover password
            </span>
          </div>

          <form className="pt-20" onSubmit={onSubmit}>
            <div className="flex flex-col items-center gap-6">
              <div className="input text-center">
                <span className="py-4 text-sm text-left text-gray-500">
                  Enter 6 digit OTP sent to your email address.
                </span>
                <input
                  onChange={(e) => setOTP(e.target.value)}
                  className={styles.textBox}
                  type="text"
                  placeholder="OTP"
                />
              </div>

              <button className={styles.btn} type="submit">
                Recover
              </button>
            </div>
          </form>

          <div className="text-center py-4">
            <span className="text-gray-500">
              Can't get OTP?
              <button className="text-red-500 pl-2" onClick={resendOTP}>
                Resend
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
