import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCollections } from "../../../APIs/CollectionsApi/collection.api";
import "./Collections.css";

const Collections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    loadCollections();
  }, []);

  const loadCollections = async () => {
    try {
      const res = await fetchCollections();

      if (res?.success && res?.flage === "Y") {
        setCollections(res.collection);
      } else {
        setCollections([]);
      }
    } catch (err) {
      console.error("Collection fetch failed", err);
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
