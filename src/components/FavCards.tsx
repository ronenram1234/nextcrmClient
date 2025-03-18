import { FunctionComponent, useContext, useEffect, useState } from "react";
import { GlobalProps } from "../App";

import CardsCarousel from "./CardsCarousel";
import { CardRecFull } from "../interfaces/Card";

interface FavCardsProps {}

const FavCards: FunctionComponent<FavCardsProps> = () => {
  const {  currentUser, cardArray } = useContext(GlobalProps);
  const [favCardAray, setFavCardAray] = useState<CardRecFull[] | null>([]);

  

  useEffect(() => {
    if (cardArray !== null && cardArray.length > 0 && currentUser !== null) {
      setFavCardAray(
        cardArray.filter((item) => item.likes?.includes(currentUser._id))
      );
    }

  },[cardArray, currentUser]);


  return (
    <>
      <CardsCarousel
        carouselCardArray={favCardAray || []}
        originScreen="FavCards"
      />
    </>
  );
};

export default FavCards;
