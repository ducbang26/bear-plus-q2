import React, { useEffect, useState } from "react";
import s from "./styles.module.scss";
import { Container } from "../container/Container";
import { getPageContent } from "../../api/contentful";

const Heading = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await Promise.all([getPageContent("product")]);
      setProducts(res[0].items);
    }

    fetchData();
  }, []);

  return (
    <div className={s.heading_wrap}>
      <Container className="grid">
        <div className={s.heading}>
            <div className={s.heading_text}>
            <span className={s.quantity}>{`(${products.length || 0})`}</span>
            All books
            </div>
        </div>
        <div className={s.subtitle}>
            <p className={s.text}>
            Welcome to our books section, a haven for art enthusiasts and creative
            minds alike. Here, you will find a curated selection of art books that
            span a wide array of genres, styles, and periods. Whether you&apos;re
            an artist seeking inspiration, a student of art history, or simply a
            lover of visual beauty, our collection offers something for everyone.
            </p>
        </div>
      </Container>
    </div>
  );
};

export default Heading;
