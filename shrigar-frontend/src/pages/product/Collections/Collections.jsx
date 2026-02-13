import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Collections.css";
import axios from "axios";
import { BASE_URL, COLLECTION_ENDPOINTS } from "../../../config/endpoints";

const Collections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 🔹 Load collections when component mounts
  useEffect(() => {
    loadCollections();
  }, []);

  // 🔹 Log when collections update (optional debug)
  useEffect(() => {
    console.log("Updated collections:", collections);
  }, [collections]);

  const loadCollections = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}${COLLECTION_ENDPOINTS.LIST}`
      );

      const data = res.data;

      if (data?.success && data?.flage === "Y") {
        setCollections(data.collection);
      } else {
        setCollections([]);
      }
    } catch (err) {
      console.error("Collection fetch failed", err);
      setCollections([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading collections...</p>;

  return (
    <section className="collection-section">
      <div className="collection-scroll">
        {collections.map((item) => (
          <div className="collection-circle-card" key={item._id}>
            <div
              className="collection-circle"
              onClick={() => navigate(`/collection/${item._id}`)}
            >
              <img src={item.image} alt={item.name} />
            </div>
            <p className="collection-title">{item.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Collections;
