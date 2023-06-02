import { Link } from "react-router-dom";

// Images
import avatar from "../assets/profile.png";

// Styles
import styles from "../styles/Username.module.css";

export const Username = () => {
  return (
    <div className="container mx-auto">
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Hello Again!</h4>
            <span className="py-4 text-2xl w-2/3 text-center text-gray-500">
              Explore More by connecting with us.
            </span>
          </div>

          <form className="py-1">
            <div className="profile flex justify-center py-4">
              <img className={styles.profileImg} src={avatar} alt="avatar" />
            </div>

            <div className="flex flex-col items-center gap-6">
              <input
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
