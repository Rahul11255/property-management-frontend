import React, { useState } from "react";
import axios from "axios"
import "./visitform.css";

const VistForm = () => {
  const [formdata, setFormdata] = useState({});
  const [loading, setLoading] = useState(false);

  const inputHandle = (e)=>{
    setFormdata((prevalue)=>({...prevalue ,[e.target.name]:e.target.value}))
  }
  
  const sendData = () => {
    if (!formdata.username || !formdata.email || !formdata.date || !formdata.time || !formdata.area) {
      alert("Please kindly fill in all the information");
    } else {
      setLoading(true);
      axios.post("https://property-management-api-uie0.onrender.com/api/visitform", formdata)
        .then((res) => {
          setFormdata({});
          setLoading(false);
          alert("Data Submitted Successfully");
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  };

  return (
    <div className="visitform_container">
      <div className="mian_form_container">
        <div className="visit_text_h1">request a visit</div>
        <div className="visit_text_p">AT VERO EOS ET ACCUSAMUS ET IUSTO</div>
        <div className="visit_form_input">
          <div className="visit_name_email">
            <input
               onChange={inputHandle}
               value={formdata.username || ''}
               name="username"
              type="text"
              className="input_text"
              placeholder="Rahul Patel"
            />
            <input
               onChange={inputHandle}
               value={formdata.email || ''}
               name="email"
              type="email"
              className="input_email"
              placeholder="rahulpatel12@gmail.com"
            />
          </div>
          <div className="visit_date_time">
            <input
               onChange={inputHandle}
               value={formdata.date || ''}
               name="date"
              type="date"
              className="input_date"
              min="2023-07-13"
            />
            <input
               onChange={inputHandle}
               value={formdata.time || ''}
             name="time" 
            type="time" 
            className="input_time"
             />
          </div>
          <div>
            <textarea
              name="area"
              onChange={inputHandle}
              value={formdata.area || ''}
              cols="30"
              rows="10"
              className="textarea"
              placeholder="message"
            />
          </div>
        </div>
        <div className="visit_btn">
          <li className="visit_li" typeof="submit" onClick={sendData}>
          {loading ? "Sending..." : "Request"}
          </li>
        </div>
      </div>
    </div>
  );
};

export default VistForm;
