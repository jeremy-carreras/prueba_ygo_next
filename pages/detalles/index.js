import { Col, Container, Image, Row } from "react-bootstrap";
import Header from "../../components/layouts/header";
import { SELECTED_CARD } from "../../components/general/cards";
import { useState, useEffect } from "react";

const Main = () => {
  console.log(SELECTED_CARD);

  return (
    <Container>
      <Header></Header>
      <div style={{ margin: "7% 30%", textAlign: "center"}}>
        <Row>
          <Col className="h4">Informacion de la carta:</Col>
        </Row>
        <Row>
          <Col>
            <p className="h6"><b>ID:</b> {SELECTED_CARD.id}</p>
            <p className="h6"><b>Nombre:</b> {SELECTED_CARD.name}</p>
            <p className="h6"><b>Tipo:</b> {SELECTED_CARD.type}</p>
            <p className="h6"><b>Descripción:</b> {SELECTED_CARD.desc}</p>
            <p className="h6"><b>Race:</b> {SELECTED_CARD.race}</p>
            <img src={SELECTED_CARD.card_images[0].image_url}></img>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default Main;
