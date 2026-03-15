import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Collections.css";

import { useDispatch, useSelector } from "react-redux";
import { collectionRequest } from "../../../ReduxToolkit/collectionSlice";

const Collections = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { collections, loading } = useSelector(
    (state) => state.collections
  );

  useEffect(() => {

    dispatch(collectionRequest());

  }, [dispatch]);

  if (loading) return <p>Loading collections...</p>;

  return (
    <section className="collection-section">
      <div className="collection-scroll">

        {collections.map((item) => (
          <div
            className="collection-circle-card"
            key={item._id}
          >

            <div
              className="collection-circle"
              onClick={() =>
                navigate(`/collection/${item._id}`)
              }
            >
              <img src={item.image} alt={item.name} />
            </div>

            <p className="collection-title">
              {item.name}
            </p>

          </div>
        ))}

      </div>
    </section>
  );
};

export default Collections;