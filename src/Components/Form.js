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
      month: new Date().getMonth(),
      date: [],
      calopen: false,
      new: [],
      new2: [],
      mon: [],
      years: [],
    };
  }

  getemi = (e) => {
    e.preventDefault();
    var P = e.target.Amt.value;
    var R = e.target.ROI.value;
    var n = e.target.Tenure.value;
    var r = R / 1200;
    var x = (1 + r) ** n;
    var q = P * r; // q is interest
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
    // this.setState({new:[...this.state.new, {
    //   "remamt":temp,
    // "interest":q1,
    // "principal":y}]})
    // this.setState({ date: e.target.date.value });
    for (let i = 0; i < this.state.Duration; i++) {
      
      var f = y1 - parseInt(q1); // f is principal in emi amount
      temp = Math.round(temp - f); // temp is remaining amount after certain emi
      console.log("the emi of " + i + "is" + temp, f, q1, y1);
      this.setState({ msg: P });
      console.log(this.state.new);
      if (temp < 0) {
        temp = 0;
      }
      // this.setState({new2:[ {
      //   "remamt":temp,
      // "interest":q1,
      // "principal":f}]})
      // console.log(this.state.new2)
      // this.setState({new:[ {
      //   "remamt":temp,
      // "interest":q1,
      // "principal":f}]})
      m1 = m1;
      var c = m1.concat("-", ye1);
      console.log(c);
      // this.setState({mon:this.state.mon.push({c})})
     
      this.setState({
        new: this.state.new.push({
          date: c,
          year: ye1,
          remamt: temp,
          interest: q1,
          principal: f,
        }),
        // years: this.state.years.push(ye1),
      });
      this.setState({ new2: this.state.new });
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
        this.setState({years:this.state.years.push(ye1)})
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
    this.setState({mon:this.state.years})
  };
  Amtchanged = (e) => {
    this.setState({ Lamount: e.target.value });
    console.log(this.state.new);
    // console.log(e.target.value, this.state.Lamount);
  };
  Roichanged = (e) => {
    this.setState({ Rate: e.target.value });
    // console.log(e.target.value, this.state.Rate);
  };
  Tenurechanged = (e) => {
    this.setState({ Duration: e.target.value });
    // console.log(e.target.value, this.state.Duration);
  };
  onChange = (e) => {
    // e.preventDefault();
    console.log(e);
    var month1 = (e.getMonth() + 1).toString();

    var year1 = e.getFullYear().toString();
    // for(var i=0;i<=60;i++){
    // //   this.setState({mon:this.state.mon.push(a)})
    // //   a++
    month1 = month1.toString();
    //   year1=year1
    var dd = month1.concat("-", year1);
    //   this.setState({mon:this.state.mon.push({c})})
    //   month1=parseInt(month1)
    //   month1++
    //   if(month1>12){
    //      month1=1
    //      year1=parseInt(year1)+1
    //      year1.toString()
    //   }
    //   console.log(a)
    //   // this.setState({mon:this.state.mon.push(a)})
    //   a=parseInt(a)

    // }
    // a=a.toString()
    // if(parseInt(b)==2022){
    //   b=parseInt(b)+1
    // }
    // console.log(a,b, this.state.mon)
    // var c=a.concat("-",b)
    // this.setState({mon:this.state.mon.push({c})})
    this.setState({ month: month1, year: year1, date: dd, calopen: false });
    //  e.target.reset()
    // console.log(this.state.date);
    //    const filteredResults = userResults.filter(result => {
    //     const newResultFormat = new Date(result.created_at).toLocaleString().split(",")[0]
    //     const newCalDateFormat = calDate.toLocaleString().split(",")[0]
    //     return newResultFormat === newCalDateFormat
    // })
  };
  render() {
    console.log(this.state.Lamount, this.state.date, this.state.mon);
    return (
      <div id="buttons">
        {/* <p id="LEC">Loan Emi Calculator</p> */}
        <form onSubmit={this.getemi} className="form">
          <p id="LEC" className="LEC" style={{color:"blueviolet" , fontSize:50, fontWeight :  550, fontStyle:"italic"}}>
            Loan Emi Calculator
          </p>
          <div id="text1" className="text1">
            <p id="loan">
              Loan Amount :{" "}
              <input
                id="LAmt" 
                // style={{height: 35,
                //   width: 70,
                //   border: 1, borderColor:"solid-grey" }}
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
                onChange={this.Tenurechanged}
                name="Tenure"
              ></input>
            </p>
          </div>
          <div>
            {/* <Calendar onChange={this.onChange} defaultValue={this.state.date}/> */}
          </div>
          {/* <div id="Check-it" > */}
          <div id="text4" className="text4">
           EMI Start Date :{" "}
          </div>
          <p>
            {/* Start Date :{" "} */}
            <input
              // onClick={this.calendar1}
              defaultValue={this.state.date}
              // name="date"
              id="dateinput"
            ></input>
            <a onClick={this.calendar1}>
              <img src={calImg} height="40px" width={40} />
            </a>
            {this.state.calopen && (
              <Calendar onChange={this.onChange} defaultValue={new Date()} />
            )}
            {/* </input><span><img src="./Images/google-calendar.png"/></span> */}
          </p>

          <button className="btn btn-primary" id="Check-it" type="submit">
            Check it
          </button>
          <p style={{ color: "red" }}>
            Your Monthly EMI will be :{this.state.EMI}
          </p>
          {/* </div> */}
        </form>
        <div>
          <div id="schedule">
            <Hybrid
              msg={this.state.new2}
              EMI={this.state.EMI}
              date={this.state.date}
              month={this.state.month}
              year={this.state.year}
              years={this.state.mon}
            />
          </div>
        </div>
      </div>
    );
  }
}
