import React, { Component } from 'react'
import {endpointPath, API_KEY} from '../config/api';
import Dropdowns from "../components/Dropdowns"
import ConvertResult from "../components/ConvertResult"

class CurrencyConverter extends Component {

    constructor(props) {
        super(props);
        this.default = {
            from: 'USD',
            into: 'PKR',
            loading: false,
            amount: 1,
            conversionResult: '',
            conversionRate: ''
        }
        this.state = this.default
    }

    convertCurrency = async ({ from, into, amount }) => {
        this.setState({ loading: true });
        let url = endpointPath(from, into, amount);
        let myHeaders = new Headers();
        myHeaders.append("apikey", API_KEY);

        let requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
        };

       try{
        let data = await fetch(url,requestOptions);
        let parsedData = await data.json();
        console.log(parsedData)
        const conversionRate = parsedData.info.rate;
        console.log(parsedData)
        const conversionResult = parsedData.result;
        this.setState({
            conversionRate: conversionRate,
            conversionResult: conversionResult,
            loading: false
        })
       }catch(e){
        console.log(e);
        this.setState({
            loading: false
        })
       }
    }

    handleInput = (event) => {
        this.setState({ amount: event.target.value });
    }

    handleFrom = (event) => {
        this.setState({ from: event.currentTarget.value });
    }

    handleInto = (event) => {
        this.setState({ into: event.currentTarget.value });
    }

    handleReset = () => {
        this.setState(this.default)
    }

    handleSwitch = () => {
        const { from, into } = this.state;
        this.setState({ from: into, into: from });
    };

    render() {
        const {
            from,
            into,
            amount,
            conversionRate,
            conversionResult,
            loading
        } = this.state
        return (
            <>
                <div className='container-fluid shadow'>
                    <input
                        className="form-control-lg mt-5 shadow amount bg-dark"
                        placeholder="Enter Amount"
                        value={amount}
                        type="number"
                        onChange={this.handleInput}
                    />
                    <div className='fromdrop'>
                        <Dropdowns
                            labelName="From"
                            handleChange={this.handleFrom}
                            value={from}
                        ></Dropdowns>
                    </div>
                    <div className='text-center swap'>
                        <button className="btn shadow text-center" onClick={this.handleSwitch}><i className="fas fa-sort"></i></button>
                    </div>
                    <div className='intodrop'>
                        <Dropdowns
                            labelName="Into"
                            handleChange={this.handleInto}
                            value={into}
                        ></Dropdowns>
                    </div>
                    <div className="mt-5 text-center">
                        <button
                            className='btn btn-scolor btn-lg shadow'
                            disabled={amount === "0" || amount === "" || amount < 0}
                            onClick={() => this.convertCurrency(this.state)}
                        >Convert</button>
                    </div>
                    <div className="mt-4 text-center">
                        <button
                            className='btn btn-rcolor btn-lg shadow'
                            text="Reset"
                            onClick={this.handleReset}
                        >Reset <i className="fas fa-redo-alt"></i></button>
                    </div>
                    <div className='mt-5 mb-2 text-center'>
                        <ConvertResult
                            Loading={loading}
                            result={conversionResult}
                            rate={conversionRate}
                        ></ConvertResult>
                    </div>
                </div>
            </>
        )
    }
}

export default CurrencyConverter
