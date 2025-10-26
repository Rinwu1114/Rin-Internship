import AOS from "aos";
import "aos/dist/aos.css";
import React from "react";

const AOSanimations = () => {
  AOS.init({
    //settings
    duration: 600,
    delay: 100,
    easing: "ease",
    mirror: false,
    once: true,
  });
};

export default AOSanimations;
