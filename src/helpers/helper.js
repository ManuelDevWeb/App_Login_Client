import axios from "axios";
import jwtDecode from "jwt-decode";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

// Make API Requests

// Get username from token
const getUsername = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return "Cannot find token";
  }

  let decode = await jwtDecode(token);

  return decode;
};

// Authenticate function
const authenticate = async (username) => {
  try {
    return await axios.post("/api/v1/authenticate", {
      username,
    });
  } catch (error) {
    return {
      error: "Username doesn't exist",
    };
  }
};

// Get user details
const getUser = async ({ username }) => {
  try {
    const { data } = await axios.get(`/api/v1/user/${username}`);
    return data;
  } catch (error) {
    return {
      error: "User doesn't exist",
    };
  }
};

// Register user
const registerUser = async (payload) => {
  const {
    data: { message },
    status,
  } = await axios.post("/api/v1/register", payload);

  let { username, email } = payload;

  // Send email
  if (status === 201) {
    await axios.post("/api/v1/register-mail", {
      username,
      userEmail: email,
      text: message,
    });
  }

  return {
    message,
    status,
  };
};

// Login user
const verifyPassword = async ({ username, password }) => {
  try {
    const { data } = await axios.post("/api/v1/login", {
      username,
      password,
    });

    return data;
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

// Update user
const updateUser = async (payload) => {
  try {
    const token = localStorage.getItem("token");
    console.log(token);

    const {
      data: { message },
    } = await axios.put("/api/v1/update-user", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      message,
    };
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

// Generate OTP
const generateOTP = async (username) => {
  try {
    const {
      data: { code },
      status,
    } = await axios.get(`/api/v1/generateOTP?username=${username}`);

    // Send email with OTP
    if (status === 200) {
      const data = await getUser({ username });

      await axios.post("/api/v1/register-mail", {
        username,
        userEmail: data.user.email,
        text: `Your OTP is ${code}`,
        subject: "OTP for Password Reset",
      });

      return {
        message: "OTP sent to your email",
        OTP: code,
      };
    }
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

// Verify OTP
const verifyOTP = async ({ username, code }) => {
  try {
    const data = await axios.get(
      `/api/v1/verifyOTP?code=${code}&username=${username}`
    );

    return {
      data,
    };
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

// Reset Password
const resetPassword = async ({ username, password }) => {
  try {
    const token = await localStorage.getItem("token");

    const { data, status } = await axios.put(
      "/api/v1/reset-password",
      {
        username,
        password,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return {
      data,
      status,
    };
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

export {
  authenticate,
  getUser,
  registerUser,
  verifyPassword,
  updateUser,
  generateOTP,
  verifyOTP,
  resetPassword,
  getUsername,
};
