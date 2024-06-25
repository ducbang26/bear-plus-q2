import React, { Suspense, useEffect, useState } from "react";
import s from "./styles.module.scss";
import { Container } from "../container/Container";
import Dropdown from "../Dropdown";
import Checkbox from "../Checkbox";
import Search from "../Search";
import { getPageContent } from "../../api/contentful";
import { Card } from "../Card";
import DropdownItem from "../Dropdown/DropdownItem";

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

  const items = [
    { name: "Price: High to Low", value: "DESC" },
    { name: "Price: Low to High", value: "ASC" },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [sortPrice, setSortPrice] = useState("");
  const [products, setProducts] = useState([]);
  const [originProducts, setOriginProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categoryFilters, setcategoryFilters] = useState(new Set());

  function formatCash(str) {
    return str
      .split("")
      .reverse()
      .reduce((prev, next, index) => {
        return (index % 3 ? next : next + ",") + prev;
      });
  }

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

  const handleSortPrice = (item) => {
    setSortPrice(item.value);
  };

  useEffect(() => {
    async function fetchData() {
      const res = await Promise.all([getPageContent("product")]);
      setProducts(res[0].items);
      setOriginProducts(res[0].items);
      setFilteredProducts(res[0].items);
    }

    fetchData();
  }, []);

  useEffect(() => {
    const availableProduct = filteredProducts.reduce((acc, product) => {
      if (
        product.fields.productName
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      ) {
        acc.push(product);
      }
      return acc;
    }, []);

    if (searchTerm == "") {
      setProducts(filteredProducts);
    } else setProducts(availableProduct);
  }, [searchTerm]);

  useEffect(() => {
    const filteredProducts =
      categoryFilters.size === 0
        ? originProducts
        : originProducts.filter((p) => categoryFilters.has(p.fields.category));

    if (sortPrice == "ASC") {
      filteredProducts.sort(function (a, b) {
        return b.fields.price - a.fields.price;
      });
    } else if (sortPrice == "DESC") {
      filteredProducts.sort(function (a, b) {
        return a.fields.price - b.fields.price;
      });
    }

    setProducts(filteredProducts);
    setFilteredProducts(filteredProducts);
  }, [categoryFilters, sortPrice]);

  // useEffect(() => {

  //   setProducts(filteredProducts);
  // }, [sortPrice]);

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
        <div className={s.sort}>
          <Dropdown
            buttonText="Sort by"
            content={
              <>
                {items.map((item, id) => (
                  <DropdownItem
                    key={id}
                    className={sortPrice === item.value ? "selected" : ""}
                    onClick={() => handleSortPrice(item)}
                  >{`${item.name}`}</DropdownItem>
                ))}
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
                  <div
                    key={index}
                    className={`${s.item} ${s.animate} ${s.fadeInUp}`}
                  >
                    <Card
                      image={item.fields.image.fields.file.url}
                      name={item.fields.productName}
                      price={formatCash(item.fields.price.toString())}
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
