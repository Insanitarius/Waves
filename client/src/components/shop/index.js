import React, { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import GridOffIcon from "@material-ui/icons/GridOff";
import GridOnIcon from "@material-ui/icons/GridOn";
import { productsByPaginate } from "../../store/actions/product.actions";
import { getAllBrands } from "../../store/actions/brands.actions";
import CardBlock from "../../utils/products/card.blocks";
import PaginateNav from "../../utils/paginateNav";
import SearchBar from "./searchBar";
import CollapseCheckbox from "./collapseCheckbox";
import RangeSelector from "./rangeSelector";

const defaultValues = {
  keywords: "",
  brand: [],
  min: 0,
  max: 5000,
  frets: [],
  page: 1,
};

const Shop = () => {
  const [grid, setGrid] = useState(false);
  const [searchValues, setSearchValues] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    defaultValues
  );
  const { byPaginate } = useSelector((state) => state.products);
  const brands = useSelector((state) => state.brands);
  const dispatch = useDispatch();

  const handleGrid = () => setGrid(!grid);

  const goToPage = (page) => {
    setSearchValues({ page: page });
  };

  const handleResetSearch = () => {
    //BUG Checked boxes not getting selected when you do reset search
    setSearchValues({ keywords: "", page: 1 });
    // setSearchValues(defaultValues);
  };

  const handleKeywords = (values) => {
    setSearchValues({ keywords: values, page: 1 });
  };

  const handleFilters = (filter, category) => {
    switch (category) {
      case "brands":
        setSearchValues({ brand: filter, page: 1 });
        break;
      case "frets":
        setSearchValues({ frets: filter, page: 1 });
        break;
      default:
        setSearchValues(defaultValues);
    }
  };

  const handleRange = (values) => {
    setSearchValues({ min: values[0], max: values[1] });
  };

  useEffect(() => {
    dispatch(getAllBrands());
    dispatch(productsByPaginate());
  }, [dispatch]);

  useEffect(() => {
    dispatch(productsByPaginate(searchValues));
  }, [dispatch, searchValues]);

  return (
    <div className="page_container">
      <div className="page_top">
        <div className="container">
          <SearchBar handleKeywords={(keywords) => handleKeywords(keywords)} />
        </div>
      </div>

      <div className="container">
        <div className="shop_wrapper">
          <div className="left">
            <CollapseCheckbox
              initState={true}
              title="Brands"
              list={brands.all}
              handleFilters={(filters) => handleFilters(filters, "brands")}
            />
            <CollapseCheckbox
              initState={false}
              title="Frets"
              list={[
                { _id: 20, name: 20 },
                { _id: 21, name: 21 },
                { _id: 22, name: 22 },
                { _id: 24, name: 24 },
              ]}
              handleFilters={(filters) => handleFilters(filters, "frets")}
            />
            <RangeSelector
              initState={false}
              title="Price Range"
              handleRange={(values) => handleRange(values)}
            />
          </div>
          <div className="right">
            <div className="shop_options">
              <div className="shop_grids clear">
                <div
                  className={`grid_btn ${grid ? "" : "active"}`}
                  onClick={() => handleGrid()}
                >
                  <GridOnIcon />
                </div>
                <div
                  className={`grid_btn ${!grid ? "" : "active"}`}
                  onClick={() => handleGrid()}
                >
                  <GridOffIcon />
                </div>
              </div>
              <div>
                {byPaginate && byPaginate.docs ? (
                  <>
                    <CardBlock
                      grid={grid}
                      items={byPaginate.docs}
                      shop={true}
                    />
                    <PaginateNav
                      prods={byPaginate}
                      prev={(page) => goToPage(page)}
                      next={(page) => goToPage(page)}
                      resetSearch={() => handleResetSearch()}
                    />
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;