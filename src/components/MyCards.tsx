import { FunctionComponent, useContext, useEffect, useState } from "react";
import { GlobalProps } from "../App";

import CardsCarousel from "./CardsCarousel";
import { CardRecFull } from "../interfaces/Card";
import { useNavigate } from "react-router-dom";

interface MycardsProps {
    
}
 
const MyCards: FunctionComponent<MycardsProps> = () => {

  const {  currentUser, cardArray } = useContext(GlobalProps);
  const [myCardArray, setMyCardArray] = useState<CardRecFull[] | null>([]);
  const navigate = useNavigate();

  

  useEffect(() => {
    if (cardArray !== null && cardArray.length > 0 && currentUser !== null) {
      setMyCardArray(
        cardArray.filter((item) => (item.user_id ===currentUser._id))
      );
    }

  },[cardArray, currentUser]);
  

    
    return ( <>
    <button className="btn btn-primary mt-3" onClick={()=>navigate(`/neweditcard`,{ state: { action: "new" } })}>Add New Card</button>
    <CardsCarousel
        carouselCardArray={myCardArray || []}
        originScreen="Mycards"
      />
      
    </> );
}
 
export default MyCards;