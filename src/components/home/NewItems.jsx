import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import Skeleton from "../UI/Skeleton";

const NewItems = () => {

  const [ newItems, setNewItems ] = useState([])
  const [ isLoading, setIsLoading ] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    async function fetchNewItems() {
      try{
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        )
        if( response.data.length > 0 ) {
          setNewItems(response.data)
        }
      } catch (error) {
        alert("Error Fetching New Items Data", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchNewItems()
  }, []);

  console.log(setNewItems)

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
          {isLoading ? 
          new Array(4).fill(0).map((data) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={data.id}>
              <div className="nft__item">
                <div className="author_list_pp">
                  <Skeleton
                    width={50} height={50} borderRadius="50%" 
                  />
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

                  <Skeleton>
                    <img
                      src={nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Skeleton>
                </div>
                <div className="nft__item_info">
                  <Skeleton
                  width={100} height={15} borderRadius={8}
                  />
                  <div className="nft__item_price">
                    <Skeleton
                    width={75} height={15} borderRadius={8} 
                    />
                  </div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>69</span>
                  </div>
                </div>
              </div>
            </div>
          )) : newItems.map((data) =>(
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={data.id}>
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to="/author"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Creator: Monica Lucas"
                  >
                    <img className="lazy" src={AuthorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                <div className="de_countdown">5h 30m 32s</div>

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

                  <Link to="/item-details">
                    <img
                      src={nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to="/item-details">
                    <h4>Pinky Ocean</h4>
                  </Link>
                  <div className="nft__item_price">3.08 ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>69</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
