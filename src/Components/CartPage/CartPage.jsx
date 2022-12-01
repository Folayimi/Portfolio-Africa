import React, {useState} from "react";
import "./CartPage.css";
import { X } from "heroicons-react";

const CartPage = (props) => {
  const { addCart, setAddCart, cartItems, setCartItems, total, setTotal } = props;  
  return (
    <>
      <div className="background">
        <div className="cartCont">
          <div className="head">
            <h4>Your Cart ( {cartItems.length} item(s) )</h4>
            <p
              onClick={() => {
                setAddCart(false);
              }}
            >
              Cancel
            </p>
          </div>
          <div className="cartItems">
            {cartItems.map((item) => {
              return (
                <>
                  <div className="cartItem">
                    <div className="leftSection">
                      <div className="imageCont">
                        <img src={item.img} alt="image" />
                      </div>
                      <div className="description">
                        <div>
                          <h4>{item.name}</h4>
                          <p>
                            Size {item.size} {item.color}
                          </p>
                        </div>
                        <div className="count"></div>
                      </div>
                    </div>
                    <div className="rightSection">
                      <div
                        className="close"
                        onClick={() => {
                            setTotal(total-parseInt(item.price))
                          setCartItems((cartItems) => {
                            return cartItems.filter(
                              (Item) => Item.id !== item.id
                            );
                          });
                        }}
                      >
                        <X size="13px" />
                      </div>
                      <p>{item.price}</p>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
          <div className="section">
            <h3>Total</h3>
            <h3>{total}</h3>
          </div>
          <div className="checkOut">
            CheckOut
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
