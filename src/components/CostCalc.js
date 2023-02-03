import React from 'react';
import "./CostCalc.css";

const CostCalc=(props)=>{
    const fuelPrice=6.61
    var totalCost=0
    
    let avaliableModelsNumValue=1
    if(props.avaliableModelsNum<3)avaliableModelsNumValue=1.15

    let driverLicensePass=1
    if(props.currentYear-props.driverLicenseYear<5)driverLicensePass=1.2

    if((props.currentYear-props.driverLicenseYear<3)&&(props.pickedPriceCategory===2)){
        alert("Nie możesz wypożyczyć tego pojazdu!");
        return(<div></div>);
    }
    return(
        <div id="costCalc">
            <table width="100%">
                <tr>
                    <td>Dzienna cena pojazdu z ilością dni</td>
                    <td>{props.basePrice}zł*{props.daysNumber}</td>
                </tr>
                <tr>
                    <td>Kategoria cenowa wybranego samochodu</td>
                    <td>{totalCost=Number(Math.round(props.basePrice*props.daysNumber+'e+2')+'e-2')}zł*{props.pickedPriceCategory}</td>
                </tr>
                <tr>
                    <td>Procent od długości posiadania prawa jazdy</td>
                    <td>{totalCost=Number(Math.round(totalCost*props.pickedPriceCategory+'e+2')+'e-2')}zł*{driverLicensePass}</td>
                </tr>
                <tr>
                    <td>Procent od ilości dostępnych egzemplarzy</td>
                    <td>{totalCost=Number(Math.round(totalCost*driverLicensePass+'e+2')+'e-2')}zł*{avaliableModelsNumValue}</td>
                </tr>
                <tr>
                    <td>Koszt paliwa</td>
                    <td>{totalCost=Number(Math.round(totalCost*avaliableModelsNumValue+'e+2')+'e-2')}zł+{Number(Math.round(props.kmAmount*props.avgCombustion/100*fuelPrice+'e+2')+'e-2')}zł</td>
                </tr><br/>
                <tr className="totalCosts">
                    <td>Kwota wynajmu netto:</td>
                    <td>{totalCost=Number(Math.round(totalCost+props.kmAmount*props.avgCombustion/100*fuelPrice+'e+2')+'e-2')}zł</td>
                </tr>
                <tr className="totalCosts">
                    <td>Kwota wynajmu brutto:</td>
                    <td>{totalCost=Number(Math.round(totalCost*1.23+'e+2')+'e-2')}zł</td>
                </tr>
            </table>
        </div>
    );
}

export default CostCalc;