import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./ProductDetails.css";
import Header from "../../components/layout/Header/Header";

const NewArrivalsProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    fetchSingleProduct();
  }, []);

  const fetchSingleProduct = async () => {
    try {
      const res = await axios.get(
        `https://www.shrigaar.com/api/v1/shringar/getSingleNewArrival/api73/${id}`
      );

      if (res.data.success) {
        setProduct(res.data.data);
        setMainImage(res.data.data.images[0]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!product) return <div className="loading">Loading...</div>;

  return (
    <div className="product-wrapper">
      <Header/>
      <div className="product-page">

        {/* LEFT THUMBNAILS */}
        <div className="thumbs">
          {product.images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt=""
              onClick={() => setMainImage(img)}
              className="thumb-img"
            />
          ))}
        </div>

        {/* MAIN IMAGE */}
        <div
  className="main-img"
  onMouseMove={(e) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();

    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    e.currentTarget.style.setProperty("--x", `${x}%`);
    e.currentTarget.style.setProperty("--y", `${y}%`);
  }}
>
          <img src={mainImage} alt="" />
        </div>

        {/* DETAILS */}
        <div className="details">
          <h1>{product.productName}</h1>

          <div className="price-section">
            <span className="price">₹ {product.priceAfterDiscount}</span>
            <span className="old">₹ {product.originalPrice}</span>
          </div>

          <p className="discount">
            {product.discountPercentage}% OFF
          </p>

          <p className="desc">{product.description}</p>

          <button className="cart">ADD TO CART</button>
          <button className="buy">BUY NOW</button>
        </div>
      </div>
    </div>
  );
};

export default NewArrivalsProductDetails;