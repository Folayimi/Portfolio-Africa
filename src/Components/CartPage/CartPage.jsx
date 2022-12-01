import React, { useEffect, useState, useRef } from "react";
import "./CartPage.css";
import { X } from "heroicons-react";
import { useNavigate } from "react-router-dom";

const CartPage = (props) => {
  const navigate = useNavigate()
  const { addCart, setAddCart, cartItems, setCartItems, total, setTotal, top, scrollToRef } =
    props;
  const [changed, setChanged]= useState(false)
  const [close, setClose] = useState(false)

  useEffect(() => {   
    setCartItems(cartItems)    
  }, [changed]);

  useEffect(()=>{
    if(close === true){
      setAddCart(false)
      setClose(false)
    }
  },[close])

  const increment = (id) => {
    cartItems.forEach((element) => {
      if (element.id == id) {
        element.number += 1;
      }
    });
    setChanged(!changed)
  };

  const decrement = (id) => {
    cartItems.forEach((element) => {
      if (element.id == id) {
        element.number -= 1;
      }
    });
    setChanged(!changed)
  };
  return (
    <>
      <div className="background">
        <div className="cartCont">
          <div className="head">
            <h4>Your Cart  {cartItems.length} item(s) </h4>
            <p
              onClick={() => {
                setClose(true)    
                scrollToRef(top)            
              }}
            >
              Cancel
            </p>
          </div>
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
                      </div>
                      <div className="description">
                        <div>
                          <h4>{item.name}</h4>
                          <p>
                            Size {item.size} {item.color}
                          </p>
                        </div>
                        <div className="count">
                          <h2
                            onClick={() => {
                              decrement(item.id)      
                              setTotal(total - parseInt(item.price))                                       
                            }}
                          >
                            -
                          </h2>
                          <h2>{item.number}</h2>
                          <h2
                            onClick={() => {
                              increment(item.id);      
                              setTotal(total + parseInt(item.price))                        
                            }}
                          >
                            +
                          </h2>
                        </div>
                      </div>
                    </div>
                    <div className="rightSection">
                      <div
                        className="close"
                        onClick={() => {
                          setTotal(total - parseInt(item.price*item.number));
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
          <div className="checkOut"
          onClick={()=>{
            navigate('/products/payment')
            localStorage.setItem('cartItems', JSON.stringify(cartItems))
            localStorage.setItem('total',total)
          }}>CheckOut</div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
