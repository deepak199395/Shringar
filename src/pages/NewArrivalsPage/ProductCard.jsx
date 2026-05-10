import React, { useState } from "react";

const ProductCard = ({ product }) => {
  const [mainImage, setMainImage] = useState(product.images[0]);

  return (
    <div className="product-container">
      
      {/* LEFT - THUMBNAILS */}
      <div className="thumbs">
        {product.images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt=""
            onClick={() => setMainImage(img)}
            className="thumb-img"
          />
        ))}
      </div>

      {/* CENTER - MAIN IMAGE */}
      <div className="main-image">
        <img src={mainImage} alt="" />
      </div>

      {/* RIGHT - DETAILS */}
      <div className="product-details">
        <h2>{product.productName}</h2>

        <p className="price">
          ₹ {product.priceAfterDiscount}
          <span className="old-price">₹ {product.originalPrice}</span>
        </p>

        <p className="discount">
          {product.discountPercentage}% OFF
        </p>

        <p className="desc">{product.description}</p>

        <button className="btn-cart">ADD TO CART</button>
        <button className="btn-buy">BUY NOW</button>
      </div>
    </div>
  );
};

export default ProductCard;