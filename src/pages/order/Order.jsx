

import { Link } from "react-router-dom"
import "./Order.css"
import { useEffect, useState } from "react"
import { fetchAllOrderData } from "../../utils/api";

const Order = () => {
  const [orders, setOrders] = useState([]);


  useEffect(() => {
    fetchAllOrderData("/").then((res) => {
      setOrders(res.orderList); 
    })
  }, [orders]);
   
  
  return (
    <>
    <div className="order-section">
      <div className="container">
        <div className="row">
          <div className="col">
             <div className="order p-4">
                <div className="order-table">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th> Order </th>
                        <th> Date </th>
                        <th> Status </th>
                        <th> Total </th>
                        <th> Actions </th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        orders?.length !== 0 && orders?.map((item, index)=> {
                          return  <tr key={index}>
                          <td> {item?._id}</td>
                          <td> {item?.createdAt}</td>
                          <td> {item?.status}</td>
                          <td> 7.99$ for 1 item</td>
                          <td > <Link to="" className="view-btn"> View </Link>  </td>
                        </tr>
                        })
                      }
                    
                    </tbody>
                  </table>
                </div>
             </div>
          </div>
        </div>
      </div>
     </div>
    </>
  )
}

export default Order














