import React, { Component } from "react";
import "./Form.css";
import "react-calendar/dist/Calendar.css";
import Hybrid from "./Hybrid";
import Calendar from "react-calendar";
import calImg from "../Components/Images/google-calendar.png";

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Lamount: 393000,
      Rate: 19,
      Duration: 60,
      EMI: 0,
      msg: 1,
      year: new Date().getFullYear(),
      month: new Date().getMonth()+1,
      date: [],
      calopen: false,
      new: [],
      new2: [],
      mon: [],
      years: []
    };
  }

  getemi = (e) => {
    e.preventDefault();
    var P = e.target.Amt.value;     // Loan amount P
    var R = e.target.ROI.value;   /// rate of interest R .... for 10% of ROI r should be taken as 10/1200
    var n = e.target.Tenure.value;   // tenure of loan in months n
    var r = R / 1200;        // for 10% of ROI r should be taken as 10/1200      
    var x = (1 + r) ** n;      ////  the actual formula to find loan emi is == P*(R/1200)*(1+r)**n/(((1+r)**n)-1)
    var q = P * r;          // q is interest
    var z = q * x;
    var y = Math.round(z / (x - 1));
    this.setState({ EMI: y });
    this.getschedule(e, y, q);
  };
  calendar1 = (e) => {
    this.setState({ calopen: !this.state.calopen });
  };
  getschedule = (e, y, q) => {
    e.preventDefault();
    var P = e.target.Amt.value;
    var R = e.target.ROI.value;
    var n = e.target.Tenure.value;
    var temp = parseInt(P);
    var y1 = y;
    var q1 = q;
    var m1 = this.state.month.toString();
    var ye1 = parseInt(this.state.year);
    for (let i = 0; i <=this.state.Duration; i++) {
      var f = y1 - parseInt(q1);
      temp = Math.round(temp - (f + 1));     // this. will be the remaining amount after that emi
      console.log("the emi of " + i + "is" + temp, f, q1, y1);
      this.setState({ msg: P });
      console.log(this.state.new);
      if (temp < 0) {
        temp = 0;
      }
      
      m1 = m1;
      var c = m1.concat("-", ye1);
      console.log(c);
     
      this.setState({
        new: this.state.new.push({
          date: c,
          year: ye1,
          remamt: temp,
          interest: q1,
          principal: f,
        }),
      });
      this.setState({ new2: this.state.new , new:[]});
      n = parseInt(n);
      R = parseInt(R);
      P = parseInt(P);
      var r = R / 1200;
      var x = (1 + r) ** n;
      q1 = P * r;
      console.log(r, x, q);
      P = temp;
      m1 = parseInt(m1);
      m1++;
      if(!this.state.years.includes(ye1)){
        this.setState({years:this.state.years.push(ye1) })
      }
      console.log(m1, this.state.years);
      if (m1 > 12) {
        m1 = 1;
       
        ye1 = parseInt(ye1) + 1;
        ye1.toString();
      }
      m1 = m1.toString();
      console.log(y1, q1, P, n, R, i, temp, m1, this.state.years);
    }
    console.log(this.state.years)
    this.setState({mon:this.state.years ,years:[], hybridopen:true})
  };
  Amtchanged = (e) => {
    this.setState({ Lamount: e.target.value });
    console.log(this.state.new);
  };
  Roichanged = (e) => {
    this.setState({ Rate: e.target.value });
  };
  Tenurechanged = (e) => {
    this.setState({ Duration: e.target.value });
  };
  onChange = (e) => {
    console.log(e);
    var month1 = (e.getMonth() + 1).toString();
    var year1 = e.getFullYear().toString();
    month1 = month1.toString();
    var dd = month1.concat("-", year1);
    this.setState({ month: month1, year: year1, date: dd, calopen: false });
  };
  buttonclick=()=>{
    window.location.reload()
  }
  render() {
    console.log(this.state.Lamount, this.state.date, this.state.mon, this.state.new);
    return (
      <div id="buttons">
        <form onSubmit={this.getemi} className="form">
          <p id="LEC" className="LEC" style={{color:"blueviolet" , fontSize:50, fontWeight :  550, fontStyle:"italic"}}>
            Loan Emi Calculator
          </p>
          <div id="text1" className="text1">
            <p id="loan">
              Loan Amount :{" "}
              <input
                id="LAmt" 
                defaultValue={this.state.Lamount}
                onChange={this.Amtchanged}
                name="Amt"
              ></input>
            </p>
          </div>
          <div id="text2" className="text2">
            <p id="rate">
              Loan Rate of Interest :{" "}
              <input
                id="ROI"
                defaultValue={this.state.Rate}
                onChange={this.Roichanged}
                name="ROI"
              ></input>
            </p>
          </div>
          <div id="text3" className="text3">
            <p id="duration">
              Loan Tenure :{" "}
              <input
                id="Tenure"
                defaultValue={this.state.Duration}
                placeholder="please enter in months"
                onChange={this.Tenurechanged}
                name="Tenure"
              ></input>
            </p>
          </div>
          <div>
          </div>
          <div id="text4" className="text4">
           EMI Start Date :{" "}
          </div>
          <p>
            <input
              defaultValue={this.state.date}
              id="dateinput"
              name="dateinput"
            ></input>
            <a onClick={this.calendar1}>
              <img src={calImg} height="40px" width={40} />
            </a>
            {this.state.calopen && (
              <Calendar onChange={this.onChange} defaultValue={new Date()} />
            )}
          </p>

          <button className="btn btn-primary" id="Check-it" type="submit">
            Check it
          </button>
          <p style={{ color: "red" }}>
            Your Monthly EMI will be :{this.state.EMI}
          </p>
          <a  onClick={this.buttonclick} className="btn btn-primary">RESET IT</a>
        </form>
        <div>
          <div id="schedule">
            <Hybrid
              msg={this.state.new2}
              EMI={this.state.EMI}
              years={this.state.mon}
              
            />
          </div>
        </div>
      </div>
    );
  }
}
