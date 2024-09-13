

import "./OrderTruck.css"
const OrderTruck = () => {
  return (
    <>
      <div className="order-truck">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
                <div className="order-details">
                  <p> To track your order please enter your Order ID in the box below and press the Track button. This was given to you on your receipt and in the confirmation email you should have received. </p>
                  <form>
                    <div className="my-2">
                      <label > Order ID </label>
                      <input type="email" placeholder="Found in your order confirmation email." className="form-control"/>
                    </div>
                    <div className="my-2">
                      <label > Billing email </label>
                      <input type="email" placeholder="Email you used during checkout." className="form-control"/>
                    </div>
                    <button className="track-btn"> Track </button>
                  </form>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default OrderTruck











