import { useEffect, useRef, useState } from "react";
import { useCartDispatch, useCartState } from "./ContextReducer";

function Card(props) {
  // let foodItem = props.item;
  let dispatch = useCartDispatch();
  let data = useCartState();
  let options = props.options;
  let priceOptions = Object.keys(options);
  // let foodItem = props.foodItems;
  const priceRef = useRef();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  // let finalPrice = qty * priceOptions[0];
  const verifyToken = () => {
    localStorage.getItem("authToken");
    // console.log(localStorage.getItem('authToken'))
  };
  let finalPrice = qty * parseInt(options[size]);

  // const handleAddToCard = async () => {
  //     let food = []
  //     for (const item of data) {
  //         if (item.id === props.foodItem._id) {
  //             food = item
  //             break;
  //         }
  //     }
  //     if (food !== []) {
  //         if (food.size === size) {
  //             await dispatch({ Type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty })
  //             return
  //         }
  //         else if (food.size! == size) {
  //             await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size })
  //             await console.log(data);

  //         }
  //     }

  // }
  const handleAddToCard = async () => {
    let food = [];
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;

        break;
      }
    }
    // console.log(food)
    // console.log(new Date())
    if (food != []) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: props.foodItem._id,
          price: finalPrice,
          qty: qty,
        });
        return;
      } else if (food.size !== size) {
        await dispatch({
          type: "ADD",
          id: props.foodItem._id,
          name: props.foodItem.name,
          price: finalPrice,
          qty: qty,
          size: size,
          img: props.ImgSrc,
        });
        console.log("Size different so simply ADD one more to the list");
        return;
      }
      return;
    }

    await dispatch({
      type: "ADD",
      id: props.foodItem._id,
      name: props.foodItem.name,
      price: finalPrice,
      qty: qty,
      size: size,
    });

    // setBtnEnable(true)
  };

  useEffect(() => {
    verifyToken();
    setSize(priceRef.current.value);
  }, []);
  return (
    <div
      className="card mt-3 m-3 "
      style={{ width: "18rem", maxHeight: "100% " }}
    >
      <img
        className="card-img-top"
        src={props.foodItem.img}
        alt="Card image cap"
        style={{ height: "25vh", objectFit: "fill" }}
      />
      <div className="card-body">
        <h5 className="card-title">{props.foodItem.name}</h5>
        {/* <p className="card-text">Some quick example text to build </p> */}
        <div className="container d-flex justify content between">
          <select
            className="m-2 h-100 bg-success rounded"
            onChange={(e) => setQty(e.target.value)}
          >
            {Array.from(Array(6), (e, i) => {
              return (
                <option key={i + 1} value={i + 1}>
                  {" "}
                  {i + 1}
                </option>
              );
            })}
          </select>
          <select
            className="m-2 h-100  bg-success rounded"
            ref={priceRef}
            onChange={(e) => setSize(e.target.value)}
          >
            {priceOptions.map((price) => {
              return (
                <option key={price} value={price}>
                  {price}
                </option>
              );
            })}
          </select>
          <div className="d-inline w-100 fs-5 mt-1">
            ₹<span>{finalPrice}/-</span>
          </div>
        </div>
        <hr></hr>
        <button
          className="rounded btn btn-success ms-4 justify-content-center"
          onClick={handleAddToCard}
        >
          Add to Card
        </button>
      </div>
    </div>
  );
}

export default Card;
