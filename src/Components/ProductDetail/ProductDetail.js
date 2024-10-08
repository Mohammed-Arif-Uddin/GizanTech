import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import Product from "../Product/Product";

const ProductDetail = () => {
  const { productKey } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/singleProduct/` + productKey)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
      });
  }, []);

  return (
    <div>
      <Product addToCart={false} product={product}></Product>
    </div>
  );
};

export default ProductDetail;
