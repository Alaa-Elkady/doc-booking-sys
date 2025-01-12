import React from "react";
import Header from "../Components/Header";
import SpecialityMenu from "../Components/SpecialityMenu";
import TopDoctors from "../Components/TopDoctors";
import Banner from "../Components/Banner";

const Home = ({ isUser}) => {
  return (
    <div>
      <Header isUser={isUser} />
      <SpecialityMenu />
      <TopDoctors isUser={isUser} />
      <Banner />
    </div>
  );
};

export default Home;
