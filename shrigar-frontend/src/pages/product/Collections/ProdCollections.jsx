import React, { useEffect, useState } from "react";
import { fetchCollections } from "../../../APIs/CollectionsApi/collection.api";
import "./Collections.css"

const ProdCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCollections();
    console.log(loadCollections);
    
  }, []);

  const loadCollections = async () => {
    try {
      const res = await fetchCollections()
      console.log("response",res);
      
     if (res?.success && res?.flage === "Y" && Array.isArray(res.collection)) {
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
      {collections.map((item)=>(
        <div className="collection-circle-card" key={item._id}>
            <div className="collection-circle">
              <img
                src={item.image}
                alt={item.name}
              />
            </div>
            <p className="collection-title">{item.name}</p>
          </div>
      ))}
     </div>
    </section>
  );
};

export default ProdCollections;
