import React, { Suspense, useEffect, useState } from "react";
import s from "./styles.module.scss";
import { Container } from "../container/Container";
import Dropdown from "../Dropdown";
import Checkbox from "../Checkbox";
import Search from "../Search";
import { getPageContent } from "../../api/contentful";
import { Card } from "../Card";

const Loading = () => {
  return (
    <div className={s.list}>
      <div className={s.item}></div>
      <div className={s.item}></div>
      <div className={s.item}></div>
      <div className={s.item}></div>
      <div className={s.item}></div>
      <div className={s.item}></div>
      <div className={s.item}></div>
      <div className={s.item}></div>
      <div className={s.item}></div>
    </div>
  );
};

const ProductList = () => {
  const category = [
    "Art & Craft",
    "Digital Painting",
    "Drawing",
    "Fashion",
    "Film & Photography",
    "Food & Beverage",
    "Graphic Design",
    "Interior & Architecture",
    "Painting",
    "Plants - Flowers - Insects",
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [originProducts, setOriginProducts] = useState([]);
  const [categoryFilters, setcategoryFilters] = useState(new Set());

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  function updateFilters(checked, categoryFilter) {
    if (checked)
      setcategoryFilters((prev) => new Set(prev).add(categoryFilter));
    if (!checked)
      setcategoryFilters((prev) => {
        const next = new Set(prev);
        next.delete(categoryFilter);
        return next;
      });
  }

  useEffect(() => {
    async function fetchData() {
      const res = await Promise.all([getPageContent("product")]);
      setProducts(res[0].items);
      setOriginProducts(res[0].items);
    }

    fetchData();
  }, []);

  useEffect(() => {
    const availableProduct = products.reduce((acc, product) => {
      if (product.fields.productName.includes(searchTerm)) {
        acc.push(product);
      }
      return acc;
    }, []);

    if (searchTerm == "") {
      setProducts(originProducts);
    } else setProducts(availableProduct);
  }, [searchTerm]);

  useEffect(() => {
    const filteredProducts =
      categoryFilters.size === 0
        ? originProducts
        : originProducts.filter((p) => categoryFilters.has(p.fields.category));

    setProducts(filteredProducts);
  }, [categoryFilters]);

  return (
    <div className={s.product_list_wrap}>
      <Container className="grid gap-y-[17rem]">
        <div className={s.category}>
          <Dropdown
            buttonText={"Book categories"}
            content={
              <>
                <form>
                  {category.map((item, id) => (
                    <Checkbox
                      key={id}
                      id={`checkbox-${id}`}
                      content={`${item}`}
                      onChange={(e) => updateFilters(e.target.checked, item)}
                    />
                  ))}
                </form>
              </>
            }
          />
        </div>
        <div className={s.search_field}>
          <Search value={searchTerm} onChange={handleSearchTermChange} />
        </div>

        <Suspense fallback={<Loading />}>
          <div className={s.list}>
            {products.length != 0 &&
              products.map((item, index) => {
                return (
                  <div key={index} className={s.item}>
                    <Card
                      image={item.fields.image.fields.file.url}
                      name={item.fields.productName}
                      price={item.fields.price}
                      category={item.fields.category}
                    />
                  </div>
                );
              })}
          </div>
        </Suspense>
      </Container>
    </div>
  );
};

export default ProductList;
