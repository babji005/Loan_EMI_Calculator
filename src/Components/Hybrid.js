import React from "react";
import { useState } from "react";
// import useCollapse from "react-collapsed";
import "./Hybrid.css";
import Emi from "./Form.js";

export default class Hybrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
      // toggleprops:this.state.isExpanded,
      msg: [],
      Emi: 0,
      date: [],
      index: 0,
      month: [
        "jan",
        "feb",
        "march",
        "apr",
        "may",
        "jume",
        "july",
        "aug",
        "sep",
        "oct",
        "nov",
        "dec",
      ],
      year: "",
      years: [],
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      msg: nextProps.msg,
      Emi: nextProps.EMI,
      date: nextProps.date,
      index: nextProps.month,
      year: nextProps.year,
      years: nextProps.years,
    });
  }

  handleclick = (index) => {
    // e.preventDefault()
    console.log(index);
    this.setState({ isExpanded: true, index: index });
  };

  render() {
    console.log(this.state.years);
    const broc = this.state.years.map((item, index) => {
      return (
        <div style={{ textAlign: "left" }}>
            <ul class="list-group-item list-group-item-action list-group-item-info">
  <li class="list-group-item " onClick={() => this.handleclick(index)}> click to see the schedule of year {item}
  </li>
</ul>
          
        </div>
        
      );
    });
    return (
      <div>
        <a className="brochure">{broc}</a>
        
                <div className="card-body">
        {this.state.isExpanded && (
          <div>
            <div>
              <div className="content">
                <table className="table table-striped table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>date </th>
                      <th>Emi amount</th>
                      <th>Interest</th>
                      <th>Principal</th>
                      <th>Remaining amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.msg.map((e, key) => {
                      if (this.state.years[this.state.index] == e.year) {
                        return (
                          <tr>
                            <td>{e.date}</td>
                            <td>{this.state.Emi}</td>
                            <td>{Math.round(e.interest - 1)}</td>
                            <td>{e.principal}</td>
                            <td>{e.remamt}</td>
                          </tr>
                        );
                      }
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        </div>
      </div>
    //   </div>
    );
   
   
  }

  
}
