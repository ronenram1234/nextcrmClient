import { FunctionComponent, useContext, useEffect, useState } from "react";
import { GlobalProps } from "../App";

import ModalLoginReg from "./ModalLoginReg";

import CreateCard from "./CreateCard";
import { Carousel, Row, Tab, Tabs } from "react-bootstrap";

import { CardRecFull } from "../interfaces/Card";

interface CardsCarouselProps {
  carouselCardArray: CardRecFull[];
  originScreen: string;
}

const CardsCarousel: FunctionComponent<CardsCarouselProps> = ({
  carouselCardArray,
  originScreen,
}) => {
  const { isUserLogedin } = useContext(GlobalProps);
  const [activeTab, setActiveTab] = useState<string>("Tab 1");
  const [chunksArr, setChunksArr] = useState<any[]>([]);

  const { searchString,sort } = useContext(GlobalProps);


// filter cards according to screen search text input
  function filterCards(cards: CardRecFull[], searchString: string): CardRecFull[] {
    if (searchString === "") return cards;

    const searchLower = searchString.toLowerCase();

    return cards.filter((card) => {
      return (
        card.title.toLowerCase().includes(searchLower) ||
        (card.subtitle && card.subtitle.toLowerCase().includes(searchLower)) ||
        (card.description && card.description.toLowerCase().includes(searchLower)) ||
        card.phone.toLowerCase().includes(searchLower) ||
        card.email.toLowerCase().includes(searchLower) ||
        card.address.city.toLowerCase().includes(searchLower) ||
        card.address.country.toLowerCase().includes(searchLower)
      );
    });
  }

  function sortCards(cards: CardRecFull[], sort: string): CardRecFull[] {

    switch (sort) {
      case "sortByBusiness":
        return cards.sort((a, b) => {
          const bizNumberA = a.bizNumber ?? 0;  
          const bizNumberB = b.bizNumber ?? 0;  
          return bizNumberA - bizNumberB;
        });
      case "SortByCreateDate":
        return cards.sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateB - dateA;
        });
      case "SortByNumberOfLikes":
        return cards.sort((a, b) => {
          const likesA = a.likes?.length ?? 0;  
          const likesB = b.likes?.length ?? 0;  
          return likesB - likesA;
        });
      
      default:
        return cards;

    }

   
  }






  function chunkCards(
    carouselCardArray: CardRecFull[],
    chunkSize: number
  ): CardRecFull[] {

    const sortedCards = sortCards(carouselCardArray, sort);
    const filteredCards = filterCards(sortedCards, searchString);
    const chunks: any = [];
        
    for (let i = 0; i < filteredCards.length; i += chunkSize) {
      chunks.push(filteredCards.slice(i, i + chunkSize));
    }
    return chunks;
  }

  let cardChunks: any = [];


  useEffect(() => {
    cardChunks = chunkCards(carouselCardArray || [],8);
    setChunksArr(cardChunks);
  
  }, [carouselCardArray, searchString,sort]);

  return (
    <div className="container mt-4">



      <Tabs
        id="card-tabs"
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k || "Tab 1")}
        className="mb-3"
        >
   
        {chunksArr.map((chunk: CardRecFull[], index: number) => (
          <Tab
            eventKey={`Tab ${index + 1}`}
            title={`Tab ${index + 1}`}
            key={index}
          >
            <Carousel
              interval={null}
              className="custom-carousel"
              controls={false}
            >
              {chunk.map((item, ind) => (
                <Carousel.Item key={item._id || ind}>
                  <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                    {chunk.map((card, cardIndex) => (
                      <CreateCard
                        item={card}
                        ind={cardIndex}
                        originScreen={originScreen}
                        key={`${card._id}-${cardIndex}`}
                      />
                    ))}
                  </Row>
                </Carousel.Item>
              ))}
            </Carousel>
          </Tab>
        ))}
      </Tabs>
      {!isUserLogedin && <ModalLoginReg />}
    </div>
  );
};

export default CardsCarousel;
