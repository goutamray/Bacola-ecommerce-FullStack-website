

import people from "../../assets/banner/people.jpg"


import "./About.css";
const About = () => {
  return (
    <>
      <div className="about-section">
         <div className="container">
          <div className="row" >
            <div className="col">
                <div className="about-text">
                  <h2> About for Bacola </h2>
                  <p> WE CAN DO MORE FOR YOU </p>  
                </div>
            </div>
          </div>
         </div>
      </div>

      <div className="about-data">
        <div className="container">
          <div className="row">
            <div className="col">
               <p> In nec purus eget neque accumsan finibus. Duis condimentum elit ut libero commodo iaculis. Donec augue diam, tristique et ultricies nec, consectetur quis enim. Nullam id rutrum ex. Aliquam a lectus id lacus rhoncus dapibus non ac justo. Vivamus lacinia vestibulum metus in dapibus. Vestibulum sit amet sollicitudin enim. Ut id interdum turpis. Curabitur porta auctor quam, pretium facilisis nisl. Pellentesque efficitur elit ante, vel vulputate tortor blandit nec. </p>
               <div className="text-data-content">
                <h2> Quisque erat urna, congue et libero in
                eleifend euismod velit. </h2>
                <p> In nec purus eget neque accumsan finibus. Duis condimentum elit ut libero commodo iaculis. Donec augue diam, tristique et ultricies nec, consectetur quis enim. Nullam id rutrum ex. Aliquam a lectus id lacus rhoncus dapibus non ac justo. Vivamus lacinia vestibulum metus in dapibus. Vestibulum sit amet sollicitudin enim. Ut id interdum turpis. Curabitur porta auctor quam, pretium facilisis nisl. Pellentesque efficitur elit ante, vel vulputate tortor blandit nec. </p>
               </div>

            </div>
          </div>
        </div>
      </div>

      <div className="person-content">
        <div className="container">
          <div className="row">
            <div className="col-md-6"> 
                <div className="people-photo">
                   <img src={people} alt="" />
                </div>
            </div>
            <div className="col-md-6">
               <div className="people-content">
                  <h6> Rachel Leonard - Bacola CEO </h6>
                  <h1> Duis convallis luctus pretium. Pellentesque habitant morbi </h1>
                  <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. </p>
                  <p> In fermentum mi ut sapien semper, a sagittis lorem vulputate. Integer gravida, dui eget aliquet tempus, turpis orci vehicula ipsum, eget porttitor sapien tortor at neque. Cras id pulvinar lacus, ac volutpat neque. Ut at magna id justo bibendum lobortis. Integer tortor nulla, ultricies et nisi sit amet, interdum dictum felis. In semper laoreet dui vitae pharetra. Etiam sit amet molestie nulla, eu efficitur orci. Praesent rutrum ante justo, eget malesuada ante ornare ac. Ut dignissim blandit urna, eget euismod leo rhoncus nec. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Quisque lobortis libero ante. Nullam in feugiat erat. Aenean sed justo dapibus, sodales nisi ut, fringilla lorem. Vestibulum in orci ac nisl condimentum fermentum at et sem. Curabitur fermentum dolor eu lacus consectetur varius. </p>
               </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bottom-content">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="shadow"> In nec purus eget neque accumsan finibus. Duis condimentum elit ut libero commodo iaculis. Donec augue diam, tristique et ultricies nec, consectetur quis enim. Nullam id rutrum ex. Aliquam a lectus id lacus rhoncus dapibus non ac justo. Vivamus lacinia vestibulum metus in dapibus. Vestibulum sit amet sollicitudin enim. Ut id interdum turpis. Curabitur porta auctor quam, pretium facilisis nisl. Pellentesque efficitur elit ante, vel vulputate tortor blandit nec.</p>
             
            </div>
          </div>
         
        </div>
      </div>
    </>
  )
}

export default About


