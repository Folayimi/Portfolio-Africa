import React, { useRef, useEffect, useState } from "react";
import { Prd, ProductData } from "../../MockAPI/MockData";
import Product from "../Product/Product";
import CartPage from "../CartPage/CartPage";
import "./ProductPage.css";
import { useParams } from "react-router-dom";
import { Star } from "heroicons-react";

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);
const ProductPage = () => {
  const { Id } = useParams();
  const selectedProduct = ProductData.find(
    (items) => items.id === parseInt(Id)
  );
  const [color, setColor] = useState(selectedProduct.colorType[0].color);
  const [size, setSize] = useState(0);
  const [total, setTotal] = useState(0)
  const [addCart, setAddCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const top = useRef(null);
  useEffect(() => {
    scrollToRef(top);
  }, []);
  return (
    <>
      <div className="productCont" ref={top}>
        {addCart && (
          <CartPage
            addCart={addCart}
            setAddCart={setAddCart}
            cartItems={cartItems}
            setCartItems={setCartItems}
            total={total}
            setTotal={setTotal}
          />
        )}
        <div className="productViewCont">
          <div className="productView">
            <div className="leftSection">
              {selectedProduct.colorType.map((item) => {
                {
                  if (item.color == color) {
                    return (
                      <>
                        <DisplayProduct
                          selectedProduct={selectedProduct}
                          color={color}
                        />
                      </>
                    );
                  }
                }
              })}
            </div>
            <div className="rightSection">
              {
                <ProductDetail
                  selectedProduct={selectedProduct}
                  setColor={setColor}
                  setSize={setSize}
                  setAddCart={setAddCart}
                  setCartItems={setCartItems}
                  cartItems={cartItems}
                  color={color}
                  size={size}
                  setTotal={setTotal}
                  total={total}
                />
              }
            </div>
          </div>
          <div className="reviewCont">
            <p className="head">Reviews</p>
            <div className="reviews">
              {selectedProduct.reviews.map((items) => {
                return (
                  <>
                    <div className="review">
                      <p>{items.message}</p>
                      <div className="right">
                        <p>{items.name}</p>
                        <p>{items.country}</p>
                        <div className="stars">
                          <Star />
                          <Star />
                          <Star />
                          <Star />
                          <Star />
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
        <div className="bodyCont">
          <div className="body">
            {Prd.map((items) => {
              return <Product {...items} key={items.id} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

const DisplayProduct = ({ color, selectedProduct }) => {
  return (
    <>
      {selectedProduct.colorType.map((item) => {
        return (
          <>
            {item.color === color &&
              item.images.map((images) => {
                return (
                  <>
                    <div className="prd" key={images.id}>
                      <img src={images.img} alt="product" />
                    </div>
                  </>
                );
              })}
          </>
        );
      })}
    </>
  );
};

const ProductDetail = ({
  selectedProduct,
  setColor,
  color,
  setSize,
  size,
  setAddCart,
  setCartItems,
  cartItems,
  setTotal,
  total
}) => {
  const [content, setContent] = useState("description");  
  return (
    <>
      <div className="section">
        <h3>{selectedProduct.name}</h3>
        <h2>N {selectedProduct.price}</h2>
      </div>
      <div className="section">
        <p>{selectedProduct.description}</p>
      </div>
      <div className="section">
        <p className="bold">Colors</p>
        <div className="colorCnt">
          {selectedProduct.colorType.map((items) => {
            return (
              <>
                <div
                  className="colorType"
                  onClick={() => {
                    setColor(items.color);
                  }}
                >
                  <img src={items.images[0].img} alt="" />
                </div>
              </>
            );
          })}
        </div>
      </div>
      <div className="section">
        <div className="sizeHead">
          <p>Sizes</p>
          <p>View Styleguide</p>
        </div>
        <div className="sizes">
          {selectedProduct.sizes.map((items) => {
            return (
              <>
                <div
                  className="size"
                  onClick={() => {
                    setSize(items.size);
                  }}
                >
                  {items.size}
                </div>
              </>
            );
          })}
        </div>
      </div>
      <div className="section">
        <div
          className="addToCart"
          onClick={() => {
            for (var i = 0; i < selectedProduct.colorType.length; i++) {
              if (selectedProduct.colorType[i].color === color) {
                setCartItems([
                  ...cartItems,
                  {
                    id: new Date().getTime(),
                    color: color,
                    number: 1,
                    img: selectedProduct.colorType[i].images[0].img,
                    price: selectedProduct.price,
                    name: selectedProduct.name,
                    size: size,
                  },
                ]);
              }
            }
            setAddCart(true);
            setTotal(total+parseInt(selectedProduct.price))
          }}
        >
          Add To Cart
        </div>
      </div>
      <div className="section">
        <div className="desc">
          <p
            onClick={() => {
              setContent("description");
            }}
          >
            Product Description
          </p>
          <p
            onClick={() => {
              setContent("materials");
            }}
          >
            Materials
          </p>
        </div>
        <hr width="100%" />
      </div>
      <div className="section">
        {content === "description" && <p>{selectedProduct.Pdescription}</p>}
        {content === "materials" && <p>{selectedProduct.material}</p>}
      </div>
    </>
  );
};

export default ProductPage;