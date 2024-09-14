import React, { useRef, useState } from "react";
import './Login.css';
const generateCaptcha = () => {
  return Math.random().toString(36).substring(2, 7).toUpperCase();
};
function Login() {
  const UsernameRef = useRef(null);
  const PasswordRef = useRef(null);
  const CaptchaRef = useRef(null);
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [message, setMessage] = useState("");

  const reloadCaptcha = () => {
    setCaptcha(generateCaptcha());
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      UsernameRef.current.value &&
      PasswordRef.current.value &&
      CaptchaRef.current.value === captcha
    ) {
      setMessage("Login Successful");
    } else {
      setMessage("Invalid details or captcha");
    }
  };

  return (
    <div className="card-container">
      <div className="card">
        <header className="login">
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label>User Name</label><br />
              <input type="text" placeholder="User Name" ref={UsernameRef} /><br />
            </div>
            <div>
              <label>Password</label><br />
              <input type="password" placeholder="Password" ref={PasswordRef} /><br />
            </div>
            <div className="forgot-link">
              
              <a href="#">FORGOT ACCOUNT DETAILS?</a>
            </div>
            <div className="captcha-section">
              <button type="button" onClick={reloadCaptcha} className="captcha-btn">
                Reload Captcha <span>↻</span>
              </button>
              <div>
                <input type="text" value={captcha} readOnly className="captcha-display" />
              </div>
              <input type="text" placeholder="Enter Captcha" ref={CaptchaRef} /><br />
            </div>
            <div className="otp-checkbox">
              <input type="checkbox" id="otpCheckbox" />
              <label htmlFor="otpCheckbox"> Login & Booking With OTP</label>
            </div>
            <button type="submit" className="sign-in-btn">SIGN IN</button>
            <h1>{message}</h1>
          </form>
          <div className="bottom-buttons">
            <button className="register-btn">REGISTER</button>
            <button className="agent-login-btn">AGENT LOGIN</button>
          </div>
        </header>
      </div>
    </div>
  );
}

export default Login;
