import { Container } from "react-bootstrap";
import Cards from "../general/cards";
import Header from "../layouts/header";

const Main = () => {
  return (
    <Container>
      <Header></Header>
      <Cards></Cards>
    </Container>
  );
};

export default Main;
