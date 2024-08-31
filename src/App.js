import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const sendMail = () => {
    if (!email || !subject || !message) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError(null);

    axios.post("http://localhost:4000/send-email", {
      email,
      subject,
      message,
    })
      .then(() => {
        toast.success("Email sent successfully!");
        setEmail("");
        setSubject("");
        setMessage("");
      })
      .catch((error) => {
        toast.error("Error sending email");
        setError(error.response?.data?.message || "Error sending email");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (<>
      <ToastContainer 
      position="top-center" 
      autoClose={5000}      
      hideProgressBar={false} 
      newestOnTop={false}     
      closeOnClick            
      rtl={false}             
      pauseOnFocusLoss        
      draggable               
      pauseOnHover
      />
    <div className="app">
      <div className="form">
        <div className="txt_field">
          <input 
            type="text" 
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError(null);
            }}
          />
          <span></span>
          <label>Recipient Email</label>
        </div>
        <div className="txt_field">
          <input
            type="text"
            value={subject}
            onChange={(e) => {
              setSubject(e.target.value);
              if (error) setError(null);
            }}
          />
          <span></span>
          <label>Subject</label>
        </div>
        <div className="txt_field">
          <input
            type="text"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              if (error) setError(null);
            }}
          />
          <span></span>
          <label>Message</label>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button onClick={sendMail} disabled={loading}>
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
    </>);
}

export default App;
