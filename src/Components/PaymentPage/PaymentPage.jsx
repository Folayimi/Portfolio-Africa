// react es7+/es6+ (rafce)
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./PaymentPage.css";
import { ChevronLeft, PencilAltOutline } from "heroicons-react";

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

const PaymentPage = () => {
  const navigate = useNavigate();
  const top = useRef(null);
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.cartItems)
  );
  const [total, setTotal] = useState(JSON.parse(localStorage.total));
  const [changing, setChanging] = useState(false);
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    country: "",
    state: "",
    city: "",
    address: "",
    phoneNumber: "",
    cardNumber: "",
    cardName: "",
    expirationDate: "",
    cvv: "",
  });
  const formFields = [
    { id: 1, title: "First Name", name: "firstName" },
    { id: 2, title: "Last Name", name: "lastName" },
    { id: 3, title: "Country/Region", name: "country" },
    { id: 4, title: "State", name: "state" },
    { id: 5, title: "City", name: "city" },
    { id: 6, title: "Address", name: "address" },
    { id: 7, title: "Phone Number", name: "phoneNumber" },
  ];
  const paymentFields = [
    { id: 1, title: "Card Number", name: "cardNumber" },
    { id: 2, title: "Card Name", name: "cardName" },
  ];
  useEffect(() => {
    scrollToRef(top);
  }, []);
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserDetails({ ...userDetails, [name]: value });
    setChanging(!changing);
  };
  return (
    <>
      <div className="Pbackground" ref={top}>
        <div className="PCont">
          <div className="Phead" onClick={()=> navigate(-1)}>            
            <ChevronLeft size="20px" />
            <h4>Payment</h4>
          </div>
          <div className="midSection">
            <div className="form" ref={top}>
              <div className="title">
                <p>Shipping Address</p>
              </div>
              {formFields.map((field) => {
                return (
                  <>
                    <div className="section" key={field.id}>
                      <p>{field.title}</p>
                      <input
                        type="text"
                        name={field.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </>
                );
              })}
              <div className="summary">
                <p>Contact Summary</p>
                <div className="summarySection">
                  <div
                    className="head"
                    onClick={() => {
                      scrollToRef(top);
                    }}
                  >
                    <p>Change</p>
                    <PencilAltOutline size="15px" />
                  </div>
                  <div className="Sbody">
                    <p>Name</p>
                    <p>
                      {userDetails.firstName} {userDetails.lastName}
                    </p>
                  </div>
                  <div className="Sbody">
                    <p>Address</p>
                    <p>{userDetails.address}</p>
                  </div>
                  <div className="Sbody">
                    <p>Contact</p>
                    <p>{userDetails.phoneNumber}</p>
                  </div>
                </div>
              </div>
              <div className="title">
                <p>Payment</p>
              </div>
              {paymentFields.map((field) => {
                return (
                  <>
                    <div className="section" key={field.id}>
                      <p>{field.title}</p>
                      <input
                        type="text"
                        name={field.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </>
                );
              })}
              <div className="splitSection">
                <div className="split">
                  <p>Expiration Date</p>
                  <input
                    className="date"
                    type="date"
                    name="expirationDate"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="split">
                  <p>Cvv</p>
                  <input
                    type="text"
                    name="cvv"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="payNow">
                <p>Pay Now</p>
              </div>
            </div>
            <div className="cartCont">
              <div className="cartItems">
                {cartItems.map((item, i) => {
                  if (item.number < 1) {
                    setCartItems((cartItems) => {
                      return cartItems.filter((Item) => Item.id !== item.id);
                    });
                  }
                  return (
                    <>
                      <div className="cartItem">
                        <div className="leftSection">
                          <div className="imageCont">
                            <img src={item.img} alt="image" />
                            <div className="number">
                              <p>{item.number}</p>
                            </div>
                          </div>
                          <div className="description">
                            <div>
                              <h4>{item.name}</h4>
                              <p>
                                Size {item.size} {item.color}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="rightSection">
                          <p>N {item.price}</p>
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
              <div className="section" id="top">
                <p>Apply Discount</p>
              </div>
              <div className="section">
                <div className="apply">Apply</div>
              </div>
              <div className="section" id="top">
                <p>Total</p>
                <h4>N {total}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
