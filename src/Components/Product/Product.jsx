import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Prd } from "../../MockAPI/MockData";
import { Heart } from "heroicons-react";
import "./Product.css";

const Product = (props) => {
  const navigate = useNavigate();
  const { id, name, price, img, scrollToRef, top} = props;
  const [selected, setSelected] = useState(false);
  return (
    <>
      <div className="product">
        <div className="wishCont">
          <div
            className="wish"
            onClick={() => {
              setSelected(!selected);              
            }}
          >
            <Heart color={selected ? "green" : "white"} />
          </div>
        </div>
        <div className="imageCont">
          <img src={img} alt="product" />
        </div>
        <div className="productBase">
          <div className="left">
            <h3>{name}</h3>
            <p>{price}</p>
          </div>
          <div
            className="addtoCart"
            onClick={() => {
              navigate(`/products/${id}`);
              scrollToRef(top);
            }}
          >
            <p>Add to cart</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
