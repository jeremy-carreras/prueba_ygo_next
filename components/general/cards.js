import axios from "axios";
import {
  Card,
  Button,
  Container,
  Dropdown,
  FormControl,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import swal from "sweetalert";
export const SELECTED_CARD = [];

const Cards = () => {
  const [data, setData] = useState([]);
  const [cards, setCards] = useState([]);
  const [arrayPrueba, setArrayPrueba] = useState([]);
  const [cantidad, setCantidad] = useState(10);
  const router = useRouter();

  const handleNextPage = () => {
    router.push("detalles");
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `https://db.ygoprodeck.com/api/v7/cardinfo.php`
        );
        setData(response.data.data);
        console.log(response.data.data);
        let cartas = [];
        for (let i = 0; i < 10; i++) {
          cartas[i] = response.data.data[i];
        }
        setCards(cartas);
        setArrayPrueba(cartas);
      } catch (error) {
        console.log(error);
        await Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ocirrió un error con la conexión",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#d33",
        });
      }
    }
    fetchData();
  }, []);

  function predicateBy(array) {
    return function (a, b) {
      if (a[array] > b[array]) {
        return 1;
      } else if (a[array] < b[array]) {
        return -1;
      }
      return 0;
    };
  }

  const ordenar = (array, ordenarPor) => {
    array.sort(predicateBy(ordenarPor));
    /*if (reverse === true) {
      array.reverse();
    }*/
    setArrayPrueba([...array]);
    console.log(arrayPrueba);
  };

  return (
    <Container style={{ display: "inline" }}>
      <div style={{ display: "flex" }}>
        <Dropdown className="mx-4">
          <Dropdown.Toggle
            style={{ width: "10rem" }}
            variant="success"
            id="dropdown-basic"
          >
            Filtrar por:
          </Dropdown.Toggle>

          <Dropdown.Menu
            style={{ width: "10rem" }}
            onClick={() => {
              ordenar(cards, event.target.id);
            }}
          >
            <Dropdown.Item id="name">Nombre</Dropdown.Item>
            <Dropdown.Item id="type">Tipo</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <p className="mt-1 mx-3 h5">Cartas a mostrar: </p>
        <FormControl
          style={{ width: "10rem" }}
          type="number"
          min={10}
          max={50}
          value={cantidad}
          onChange={(value) => {
            setCards([]);
            setArrayPrueba([]);
            setCantidad(value.target.value);
            let cartas = [];
            for (let i = 0; i < value.target.value; i++) {
              cartas[i] = data[i];
            }
            setCards(cartas);
            setArrayPrueba(cartas);
          }}
        />
      </div>
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {arrayPrueba.map((card, index) => (
          <Card className="m-3" key={index} style={{ width: "18rem" }}>
            <Card.Img variant="top" src={card.card_images[0].image_url} />
            <Card.Body>
              <Card.Title>
                {card.name} (${card.card_prices[0].cardmarket_price})
              </Card.Title>
              <Card.Text>Tipo: {card.type}</Card.Text>
              <Card.Text> Nivel: {card.level}</Card.Text>
              <Button
                variant="primary"
                onClick={() => {
                  SELECTED_CARD = card;
                  localStorage.setItem("carta", card);
                  handleNextPage();
                }}
              >
                Detalles
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default Cards;
