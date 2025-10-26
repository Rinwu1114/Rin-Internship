import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import Skeleton from "../UI/Skeleton";


const AuthorItems = () => {

  const { authorId } = useParams()
  const [authorData, setAuthorData] = useState(null);
  const [authorItemData, setAuthorItemData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    async function fetchAuthorData() {
      try{
        const response = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
        )
          setAuthorData(response.data)
          setAuthorItemData(response.data.nftCollection)
      } catch (error){
        alert("Error Fetching Author Data", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchAuthorData()
  }, [authorId])

  console.log(authorData)

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {isLoading ? new Array(8).fill(0).map((_, index) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link to="">
                 <Skeleton
                    width={50} height={50} borderRadius="50%" 
                  />
                    <i className="fa fa-check"></i>
                  </Link>
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
                   <Skeleton
                  width="100%"
                      height="200px"
                      borderRadius="8px"
                  />
                </div>
                <div className="nft__item_info">
                  <Skeleton
                  width={100} height={15} borderRadius={8}
                  />
                  <div className="nft__item_price"> <Skeleton
                    width={75} height={15} borderRadius={8} 
                    /></div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span> <Skeleton 
                      width="15px"
                      height="15px"
                      borderRadius="6px"
                      /></span>
                  </div>
                </div>
              </div>
            </div>
          )) : authorItemData.map((data) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={data.id}>
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link to={`/author/${authorData.authorId}`}>
                    <img className="lazy" src={authorData.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
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
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
