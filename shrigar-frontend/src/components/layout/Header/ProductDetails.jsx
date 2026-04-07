import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "../../../styles/ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await fetch("https://shrigaar.com/pyFastApi/v1/product/all");
      const data = await res.json();

      const list = data.products || data;
      const found = list.find((p) => p._id === id);

      setProduct(found);
      setSelectedImage(found?.main_image);
    } catch (err) {
      console.error(err);
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <>
      <Header />

      <div className="productPage">

        {/* LEFT SIDE */}
        <div className="imageSection">
          <div className="thumbnailList">
            {[product.main_image, ...product.images].slice(0, 5).map((img, i) => (
              <img
                key={i}
                src={img}
                alt=""
                onClick={() => setSelectedImage(img)}
                className={selectedImage === img ? "active" : ""}
              />
            ))}
          </div>

          <div className="mainImage">
            <img src={selectedImage} alt={product.name} />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="detailsSection">
          <h2>{product.name}</h2>

          <div className="rating">⭐ 4.2 | 324 Ratings</div>

          <div className="price">
            ₹{product.price_after_discount}
            <span className="oldPrice">₹{product.price}</span>
          </div>

          <p className="desc">{product.description}</p>

          <button className="addBtn">ADD TO BAG</button>
          <button className="wishBtn">SAVE TO WISHLIST</button>

        </div>
      </div>

      <Footer />
    </>
  );
};

export default ProductDetails;