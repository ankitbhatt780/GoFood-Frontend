import React from "react";
import { useCartDispatch, useCartState } from "../ContextReducer";
// import Delete from '@material-ui/icons/Delete'
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
function Cart() {
  const navigate = useNavigate();
  let data = useCartState();
  let dispatch = useCartDispatch();
  if (data.length === 0) {
    return (
      <div className="fs-1 text-center">
        <div>The Cart is empty !!!</div>
      </div>
    );
  }

  const handleCheckOut = async () => {
    let UserEmail = localStorage.getItem("UserEmail");
    console.log(UserEmail);
    let response = await fetch("http://localhost:8080/api/auth/orderData", {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({
        order_data: data,
        email: UserEmail,
        order_date: new Date().toDateString(),
      }),
    });
    console.log("Order Response", response);
    if (response.status === 200) {
      dispatch({ type: "DROP" });
      navigate("/myorder");
    }
  };

  let totalPrice = data.reduce((total, food) => total + food.price, 0);
  return (
    <div>
      <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md">
        <table className="table table-hover">
          <thead className="bg-primary text-white fs-4">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Option</th>
              <th scope="col">Amount</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td colspan="">{food.name}</td>
                <td colspan="">{food.qty}</td>
                <td colspan="">{food.size}</td>
                <td colspan="">{food.price}</td>
                <td>
                  <button type="button" className="btn p-0">
                    <DeleteIcon
                      onClick={() => {
                        dispatch({ type: "REMOVE", index: index });
                      }}
                    />
                  </button>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div>
          <h1 className="fs-2">Total Price: {totalPrice}/-</h1>
        </div>
        <div>
          <button className="btn bg-success mt-5 " onClick={handleCheckOut}>
            {" "}
            Check Out{" "}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
