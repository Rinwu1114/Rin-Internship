import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../UI/Skeleton";
import CountDown from "../UI/CountDown";

const ExploreItems = () => {
  const [exploreData, setExploreData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [visibleBlocks, setVisibleBlocks] = useState(8);
  const [filterChange, setFilterChange] = useState("");

  useEffect(() => {
    setIsLoading(true);
    async function fetchExploreData() {
      try {
        const filterurl = filterChange
          ? `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filterChange}`
          : `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore`;
        const response = await axios.get(filterurl);
        if (response.data.length > 0) {
          setExploreData(response.data);
        }
      } catch (error) {
        alert("Error Fetching Explore Data", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchExploreData();
  }, [filterChange]);

  const handleLoadMore = () => {
    setVisibleBlocks((prev) => prev + 4);
  };

  const filterValueChange = (e) => {
    setFilterChange(e.target.value);
    setVisibleBlocks(8);
  };

  console.log(exploreData);

  return (
    <>
      <div>
        <select
          id="filter-items"
          value={filterChange}
          onChange={filterValueChange}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {isLoading
        ? new Array(8).fill(0).map((_, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Skeleton width="50px" height="50px" borderRadius="50%" />
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="">
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <Skeleton width="100%" height="200px" borderRadius="8px" />
                </div>
                <div className="nft__item_info">
                  <Skeleton width={100} height={15} borderRadius={8} />
                  <div className="nft__item_price">
                    {" "}
                    <Skeleton width={75} height={15} borderRadius={8} />
                  </div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>
                      {" "}
                      <Skeleton width="15px" height="15px" borderRadius="6px" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        : exploreData.slice(0, visibleBlocks).map((data) => (
            <div
              key={data.id}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to={`/author/${data.authorId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                  >
                    <img className="lazy" src={data.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                {data.expiryDate > Date.now() && (
                  <div className="de_countdown">
                    <CountDown timeLeft={data.expiryDate} />
                  </div>
                )}
                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="">
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <Link to={`/item-details/${data.nftId}`}>
                    <img
                      src={data.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to={`/item-details/${data.nftId}`}>
                    <h4>{data.title}</h4>
                  </Link>
                  <div className="nft__item_price">{data.price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{data.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

      {visibleBlocks < exploreData.length && (
        <div className="col-md-12 text-center">
          <Link
            to=""
            id="loadmore"
            className="btn-main lead"
            onClick={handleLoadMore}
          >
            Load more
          </Link>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
