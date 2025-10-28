import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../UI/Skeleton";
import CountDown from "../UI/CountDown";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const NewItems = () => {
  const [newItems, setNewItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    async function fetchNewItems() {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        );
        if (response.data.length > 0) {
          setNewItems(response.data);
        }
      } catch (error) {
        alert("Error Fetching New Items Data", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchNewItems();
  }, []);

  const sliderSettings = {
    loop: true,
    margin: 10,
    items: 4,
    dots: false,
    nav: true,
    responsive: {
      0: {
        items: 2,
        margin: 10,
      },
      800: {
        items: 3,
        margin: 10,
      },
      1200: {
        items: 4,
        margin: 5,
      },
    },
  };

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
<div className="slider-container">
          {isLoading ? (
            new Array(4).fill(0).map((data) => (
              <div
                className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                key={data.id}
              >
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Skeleton width={50} height={50} borderRadius="50%" />
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
                      <Skeleton width={75} height={15} borderRadius={8} />
                    </div>
                    <div className="nft__item_like">
                      <i className="fa fa-heart"></i>
                      <span>
                        <Skeleton
                          width="15px"
                          height="15px"
                          borderRadius="6px"
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <OwlCarousel
              key={newItems.length}
              className="owl-theme"
              {...sliderSettings}
            >
              {" "}
              {newItems.map((data) => (
                <div
                  className="items"
                  key={data.id}
                >
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link
                        to={`/author/${data.authorId}`}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Creator: Monica Lucas"
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
              ))}{" "}
            </OwlCarousel>
          )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
