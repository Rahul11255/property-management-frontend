import React, { useEffect, useState } from "react";
import { RotatingLines} from 'react-loader-spinner'
import "./create.css";
import Navbar from "../navbar/Navbar";
import AddHomeWorkOutlinedIcon from "@mui/icons-material/AddHomeWorkOutlined";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from "axios"
import { Link } from "react-router-dom";

const Create = () => {
  const [modal, setModal] = useState(false);
  const [propertydata, setPropertydata] = useState({
    user_id: localStorage._id,
    username: localStorage.name,
    number: localStorage.number,
  });
  const [property ,setProperty] = useState([])
  const [loading, setLoading] = useState(false); // State variable for loading

  const modalHandle = () => {
    setModal(!modal);
  };

  const handleProperty = (e) => {
    setPropertydata((prevalue) => ({
      ...prevalue,
      [e.target.name]: e.target.value,
    }));
  };

  const savePropertyData = () => {
    if (
      propertydata.propertyname == null ||
      propertydata.address == null ||
      propertydata.dimensions == null ||
      propertydata.price == null ||
      propertydata.images == null
    ) {
      alert("Kindly please fill-up all details");
    } else {
      setLoading(true); // Set loading to true when form is being submitted
      axios.post("https://property-management-api-uie0.onrender.com/api/property" ,propertydata)
        .then((res)=>{
          setPropertydata({})   
          setModal(!modal)
          getUserproperty()
          setLoading(false); // Reset loading state
          alert("Data Submitted Successfully")     
        })
        .catch((err)=>{
          console.log(err);
          setLoading(false); // Reset loading state
        }); 
    }
  };
  const id= localStorage._id
 
  useEffect(()=>{
    getUserproperty()
  },[id])
  

   const getUserproperty = ()=>{
    setLoading(true); // Set loading to true when fetching data
    axios.get(`https://property-management-api-uie0.onrender.com/api/property/${localStorage._id}`)
      .then((res)=>{
        console.log(res.data)
        setProperty(res.data)
      })
      .catch((err)=>{
        console.log(err);
      })
      .finally(() => {
        setLoading(false); // Reset loading state regardless of success or failure
      });
   }


  return (
    <div className="create_container">
      <div className="create_navbar">
        <Navbar />
      </div>
      <Modal
        className="modalcontainer"
        size="lg"
        isOpen={modal}
        toggle={modalHandle}
      >
        <ModalHeader className="modalHeader" toggle={modalHandle}>
          <p className="modalheader_text"> Property-details</p>
        </ModalHeader>

        <ModalBody className="modalbody">
          <div className="create_form_body">
            <div className="visit_name_email">
              <input
                onChange={handleProperty}
                value={propertydata.propertyname || ""}
                name="propertyname"
                type="text"
                className="input_text"
                placeholder="Property name...."
              />
              <input
                onChange={handleProperty}
                value={propertydata.address || ""}
                name="address"
                type="text"
                className="input_text"
                placeholder="Address.."
              />
              <input
                onChange={handleProperty}
                value={propertydata.dimensions || ""}
                name="dimensions"
                type="text"
                className="input_text"
                placeholder="Dimensions.."
              />
              <input
                onChange={handleProperty}
                value={propertydata.price || ""}
                name="price"
                type="number"
                className="input_text"
                placeholder="Price..."
              />
              <input
                onChange={handleProperty}
                value={propertydata.images || ""}
                name="images"
                type="text"
                className="input_text"
                placeholder="images"
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter className="modalfooter" style={{backgroundColor:"rgb(27, 67, 100)"}}>
          <button className="modalfooterbutton btn btn-outline-info" onClick={savePropertyData} >
          <span>{loading ? "Submitting..." : "Submit"}</span>
          </button>
        </ModalFooter>
      </Modal>
      <div className="create_property" onClick={() => setModal(true)}>
        <p className="property_text">
          <AddHomeWorkOutlinedIcon /> -Create
        </p>
      </div>
    
     <div className="create_body_container">
        <div className="create_left">
         <div className="left_top_headline"> <h1 className="headline_text">Property-List</h1> <p className="owner_name" >{localStorage.name}</p></div>
         <hr className="list_hr" />
         <hr className="list_hr_1" />
         <div className="list_Container">
           <ol>
           {loading ? (
            <div  className="laoding_Card"><RotatingLines
  visible={true}
  height="50"
  width="50"
  color="grey"
  strokeWidth="3"
  animationDuration="0.75"
  ariaLabel="rotating-lines-loading"
  wrapperStyle={{}}
  wrapperClass=""
  /> <p style={{color:"white",marginTop:"10px"}}>Loading.. data</p></div>
            ) : (
              property.map((list)=>{
                return(
                  <div key={list._id} >
                    <li className="list_li" key={list._id} >{list.propertyname}</li>
                  </div>
                )
              })
            )}
           </ol>
         </div>
        </div>
        <div className="create_right">
          <div className="right_container">
            {loading ? (
              <div  className="laoding_Card"><RotatingLines
  visible={true}
  height="50"
  width="50"
  color="grey"
  strokeWidth="3"
  animationDuration="0.75"
  ariaLabel="rotating-lines-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />Loading data</div>
            ) : (
              property.map((data)=>{
                return(
                  <div className="right_container_itmes" key={data._id}>
                    <div className="card_top_headline">
                      <p>{data.propertyname}</p>
                      <p>rs: {data.price}</p>
                    </div>
                    <Link to={`/propertycard/${data._id}`}>
                      <div className="card_images_container"><img className="card_images" src={data.images} alt="" /></div>
                    </Link>
                 </div>
                )
              })
            )}
          </div>
        </div>
     </div>
    
    </div>
  );
};

export default Create;
