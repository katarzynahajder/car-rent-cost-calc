import React, {Component} from 'react';
import DateRangeComp from './DateRangeComp';
import {differenceInDays} from 'date-fns';
import {format} from 'date-fns';
import CostCalc from './CostCalc';
import './UserForm.css';

class UserForm extends Component{
    state={
        kmAmount: 0,
        driverLicenseYear: 0,
        daysNumber: 0,
        currentYear: 0
    }
    constructor(props) {
        super(props);
        this.state={picked: 0};
        this.handleChange=this.handleChange.bind(this);
    }
    setDataHandler=()=>{
        const kmAmount=document.getElementById("km").value;
        const driverLicenseYear=document.getElementById("yr").value;
        const currentDate=new Date();
        const currentYear=format(currentDate, 'yyyy');
        const startDate=new Date(
            document.getElementById("calendarInput").value.substr(6, 4),
            document.getElementById("calendarInput").value.substr(0, 2),
            document.getElementById("calendarInput").value.substr(3, 2)
        );
        const endDate=new Date(
            document.getElementById("calendarInput").value.substr(20, 4),
            document.getElementById("calendarInput").value.substr(14, 2),
            document.getElementById("calendarInput").value.substr(17, 2)
        );
        console.log(startDate);
        console.log(endDate);
        const daysNumber=differenceInDays(endDate, startDate);
        this.setState({
            kmAmount: kmAmount,
            driverLicenseYear: driverLicenseYear,
            currentYear: currentYear,
            daysNumber: daysNumber
        });
    }
    handleChange(e){
        this.setState({picked: e.target.value});
    }
    render(){
        const priceCategoryOptions={
            Basic: 1,
            Standard: 1.3,
            Medium: 1.6,
            Premium: 2
        }
        const carOptions=[
            {label: "Audi A8 (medium)", id: 0, priceCategory: priceCategoryOptions.Medium, carLocation: "Poznań", basePrice: 179, avgCombustion: 8.6, avaliableModelsNum: 5},
            {label: "Ford Focus (basic)", id: 1, priceCategory: priceCategoryOptions.Basic, carLocation: "Warszawa", basePrice: 129, avgCombustion: 6.4, avaliableModelsNum: 9},
            {label: "Volkswagen Golf (standard)", id: 2, priceCategory: priceCategoryOptions.Standard, carLocation: "Rzeszów", basePrice: 159, avgCombustion: 6.8, avaliableModelsNum: 6},
            {label: "Lamborghini Countach (premium)", id: 3, priceCategory: priceCategoryOptions.Premium, carLocation: "Kraków", basePrice: 239, avgCombustion: 12.3, avaliableModelsNum: 2},
        ]
        return(
            <div>
                <div id="userForm">
                    <h1>Kalkulator kosztu wynajmu</h1>
                    Szacunkowa ilość kilometrów do przejechania<br/>
                    <input type='number' id='km'/><br/>
                    Rok otrzymania prawa jazdy<br/>
                    <input type='number' id='yr'/><br/>
                    Termin wypożyczenia samochodu<br/>
                    <DateRangeComp/>
                    Kategoria cenowa<br/>
                    <select value={this.state.picked} onChange={this.handleChange}>
                        {carOptions.map((option)=>(
                            <option value={option.id}>{option.label}</option>
                        ))}
                    </select><br/>
                    <button onClick={this.setDataHandler}>Wylicz</button>
                </div>
                <CostCalc
                    kmAmount={this.state.kmAmount}
                    driverLicenseYear={this.state.driverLicenseYear}
                    currentYear={this.state.currentYear}
                    pickedPriceCategory={carOptions[this.state.picked].priceCategory}
                    daysNumber={this.state.daysNumber}
                    carLocation={carOptions[this.state.picked].carLocation}
                    basePrice={carOptions[this.state.picked].basePrice}
                    avgCombustion={carOptions[this.state.picked].avgCombustion}
                    avaliableModelsNum={carOptions[this.state.picked].avaliableModelsNum}
                />
            </div>
        );   
    }
    
}

export default UserForm;