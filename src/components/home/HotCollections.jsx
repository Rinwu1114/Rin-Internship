import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel"
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Skeleton from "../UI/Skeleton"
 
const HotCollections = () => {
  const [hotCollectionsData, setHotCollectionsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  

  useEffect(() => {
    setIsLoading(true)
async function fetchHotCollections() {
    try{
     const response = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    ) 
    if (response.data.length > 0) {
      setHotCollectionsData(response.data)
    }
  } catch (error) {
      alert("Error Fetching Data", error)
    } finally {
      setIsLoading(false)
    }

  }
    fetchHotCollections();
  }, []);
  
  const sliderSettings = {
    loop: true ,
    margin: 10, 
    items: 4 ,
    dots: false, 
    nav: true,
    responsive: {
      0: {
        items: 1,
        margin: 50,
        center: true,
        autoWidth: true, 
      },
      800: {
        items: 2,
        margin: 30,
      },
      1200: {
        items: 4,
        margin: 0
      },
    },
  };

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          <div className="slider-container">
            <OwlCarousel key={isLoading ? "loading" : `loaded-${hotCollectionsData.length}`} className="owl-theme" {...sliderSettings}>
              {isLoading || hotCollectionsData.length === 0
              ? 
            [...Array(4)].map((_, index) =>(
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={index}
                >
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Skeleton width="100%"
                      height="200px"
                      borderRadius="8px"/>
                    </div>
                    <div className="nft_coll_pp">
                      <Skeleton width="50px"
                      height="50px"
                      borderRadius="50%"/>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Skeleton width="70%"
                      height="24px"
                      borderRadius="4px"/>
                      <Skeleton width="40%"
                      height="18px"
                      borderRadius="4px"/>
                    </div>
                  </div>
                </div>
              ))
               : hotCollectionsData.map((data) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={data.id}
                >
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to={`/item-details/${data.nftId}`}>
                        <img
                          src={data.nftImage}
                          className="lazy img-fluid"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to={`/author/${data.authorId}`}>
                        <img
                          className="lazy pp-coll"
                          src={data.authorImage}
                          alt=""
                        />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <h4>{data.title}</h4>
                      </Link>
                      <span>ERC-{data.code}</span>
                    </div>
                  </div>
                </div> ))}
            </OwlCarousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
