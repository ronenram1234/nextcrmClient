import { FunctionComponent, useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressCard,
  faCircleInfo,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";

import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { GlobalProps } from "../App";

interface FooterProps {}

const Footer: FunctionComponent<FooterProps> = () => {
  const navigate = useNavigate();
  const { sort, setSort, setSearchString,currentUser } = useContext(GlobalProps);

  function init(): void {
    setSearchString(""); // Reset the searchString state
    setSort(""); // Reset the sort state
  }

  return (
    <footer className="bg-dark text-light py-4  fixed-bottom">
      <Container>
        <Row className="d-flex justify-content-center">
          <Col xs="auto">
            <select
              className="form-select"
              aria-label="Default select example"
              value={sort}
              onChange={(e) => {
                console.log(e.target.value);
                setSort(e.target.value);
              }}
            >
              <option value="">Select an option</option>
              <option value="sortByBusiness">Sort by business</option>
              <option value="SortByCreateDate">Sort by create date</option>
              <option value="SortByNumberOfLikes">
                Sort by number of likes
              </option>
            </select>
          </Col>

          <Col xs="auto">
            <FontAwesomeIcon
              icon={faCircleInfo}
              onClick={() => {
                navigate(`/about`);
                init();
              }}
              title="OPEN ABOUT"
              size="2x"
              className="mx-2"
            />
          </Col>
          <Col xs="auto">
            <FontAwesomeIcon
              icon={faHeart}
              onClick={() => {
                navigate(`/favcards`);
                init();
              }}
              title="OPEN FAV CARDS"
              size="2x"
              className="mx-2"
            />
          </Col>{currentUser?.isBusiness && (
          <Col xs="auto">
            <FontAwesomeIcon
              icon={faAddressCard}
              onClick={() => {
                navigate(`/mycards`);
                init();
              }}
              title="OPEN MY CARDS"
              size="2x"
              className="mx-2"
            />
          </Col>
          )}
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
