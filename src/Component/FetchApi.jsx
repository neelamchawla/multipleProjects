import React, { Component } from 'react';
import Back from '../Img/back.png';
import {Link} from "react-router-dom";

class FetchApi extends Component {

    constructor(props) {
      super(props)
    
      this.state = {
         items: [],
         loader: false
      }
    }


    componentDidMount() {
        const FetchData ="https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo"

        fetch(FetchData)
        .then((res) => res.json())
        .then((json) => {
            // console.log(this.state.items['Time Series (5min)']);
            this.setState({
                items: json['Time Series (5min)'],
                loader: true
            })
        })
    }

  render() {
    const { items, loader } = this.state;
    // console.log("Items => ", items);
    
    // let entries = Object.entries(items);
    // console.log("entries => ", entries);

    // let data = entries.map(([key, value]) => {
    //     console.log("Values ", value);
    // })

    if (!loader) {
        return (
            <div style={{ height: "100vh" }}>
                <h1>Loading.....</h1>
            </div>
        )
    }
    
    return (
      <div>
            <h1 className='pageHeader'>Fetch Data From API</h1>
            <Link to="/">
                <img title='Back To Home Page' className='backBtn' src={Back} />
            </Link>
            <table>
                <thead>
                    <tr>
                        <th>DateTime</th>
                        <th>Open</th>
                        <th>High</th>
                        <th>low</th>
                        <th>Close</th>
                        <th>Volume</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Object.entries(items).map(([key, value]) => {
                            return (
                                <tr key={key}>
                                    <td>{key}</td>
                                    <td>{value['1. open']}</td>
                                    <td>{value['2. high']}</td>
                                    <td>{value['3. low']}</td>
                                    <td>{value['4. close']}</td>
                                    <td>{value['5. volume']}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
  }
}

export default FetchApi;