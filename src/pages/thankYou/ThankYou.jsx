



import { useEffect, useState } from "react";
import "./ThankYou.css";
import { fetchCartDataFromApi } from "../../utils/api";
const ThankYou = () => {
  const [cartData, setCartData] = useState([]);  

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    fetchCartDataFromApi(`?userId=${user?.userId}`).then((res) => {
      setCartData(res.cartList); 
    });
   }, []); 
 

  return (
    <>
      <div className="thank-you">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="message-box">
                  <h2 className="thank-message"> Thank you. Your order has been received. </h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="order-full-data">
                 <table className="table thank-table">
                   <thead>
                     <tr className="custom-order">
                      <th> Order number: </th>
                      <th> Date: </th>
                      <th> Email: </th>
                      <th> Total: </th>
                      <th> Payment method: </th>
                     </tr>
                   </thead>
                   <tbody>
                    <tr className="custom-order output">
                      <td> 5150 </td>
                      <td> September 4, 2024 </td>
                      <td> developergoutam53@gmail.com </td>
                      <td>
                             {
                                 cartData?.length !== 0
                                 ? cartData.reduce((total, item) => total + (parseFloat(item?.price) * item.quantity), 0)
                                 : 0
                              }   Tk 
                       </td>
                      <td> Cash on delivery </td>
                    </tr>
                   </tbody>
                 </table>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <h2 className="order-details"> Order Details </h2>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th> Product </th>
                    <th> Total </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td> Angies Boomchickapop Sweet & Salty Kettle Corn × 1 </td>
                    <td>
                   {
                            cartData?.length !== 0
                            ? cartData.reduce((total, item) => total + (parseFloat(item?.price) * item.quantity), 0)
                            : 0
                       }  Tk 

                    </td>
                  </tr>
                  <tr>
                    <td> Subtotal:  </td>
                    <td>	
                      {
                            cartData?.length !== 0
                            ? cartData.reduce((total, item) => total + (parseFloat(item?.price) * item.quantity), 0)
                            : 0
                        }  Tk 
                    </td>
                  </tr>
                  <tr>
                    <td> Shipping: </td>
                    <td>	$5.00 via Flat rate </td>
                  </tr>
                  <tr>
                    <td> Payment method: </td>
                    <td>	Cash on delivery </td>
                  </tr>
                  <tr>
                    <td> Total: </td>
                    <td>	  {
                                 cartData?.length !== 0
                                 ? cartData.reduce((total, item) => total + (parseFloat(item?.price) * item.quantity), 0)
                                 : 0
                              } Tk  </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <h2 className="order-details"> Billing address</h2>
                <div className="details">
                  <p> Goutom Roy </p>
                  <p> WebSquadBD </p>
                  <p> nilphamari </p>
                  <p> 5300 </p>
                  <p> Bangladesh </p>
                  <p> 01755302053 </p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ThankYou; 




















