import React, {useState, useEffect} from "react";
import {makeButton, makeLabel, makeInputDiv} from "../divHelpers/divHelpers";
import { RiCloseLine } from "react-icons/ri";
import SearchFood from "./SearchFood";
import JSONRequest from "../RESTHelpers/JSONRequest";

const storage = require("../tokenStorage.js");

function AddFoodModal({user, open, close, tc, setTC}){
   
    const [selectedFood, setSelectedFood] = useState({});
    const [queryStart, setQueryStart] = useState(0);
    const [selectedFoodQuantity, setSelectedFoodQuantity] = useState(0);
    const [selectedPortion, setSelectedPortion] = useState({});


    function resetTable(){
      setTC("");
      setQueryStart(0);
    }
   
    /*
    function isFoodRecordPostRequest(obj: any): obj is FoodRecordPostRequest {
      return obj != null && typeof obj === 'object'
          && 'food' in obj && isFood(obj.food)
          && 'userId' in obj && isObjectIdString(obj.userId)
          && 'eatenTimestamp' in obj && isIsoTimestamp(obj.eatenTimestamp)
          && 'amountConsumed' in obj && isAmountConsumed(obj.amountConsumed)
          && 'jwtToken' in obj && obj.jwtToken != null
    }*/

    //{ food, userId, eatenTimestamp, amountConsumed, jwtToken }
    function makeFoodRecordJSON(){
      const foodData = {
        food: selectedFood,
        userId: user.userId,
        eatenTimestamp: "1111-11-11T11:11:11.11Z",
        amountConsumed: {portion: selectedPortion, quantity: Number(selectedFoodQuantity)},
        jwtToken: storage.retrieveToken()
      }

      return JSON.stringify(foodData);
    }

    async function addFood(){
      const foodJSON = makeFoodRecordJSON();

      console.log(foodJSON);
      let res = await JSONRequest("POST", foodJSON, "api/users/data/foodRecords");
      console.log(res.error);
      resetPortionSelection();
    }

    function resetPortionSelection(){
      setSelectedFood({});
      setSelectedFoodQuantity(0);
      setSelectedPortion({});
    }


    function makeRecipeFoodsToAdd(){
        return(
            <div className="portionSelection fixed-bottom pd-3">
                {makePortionSelections()}
                <div className="selectQuantity">
                  {makeQuantityInput()}
                </div>
            </div>
        );
    }

    function makePortionSelections(){
        return (
            <div>
                <div>
                  <label htmlFor="portionsToSelect">Choose a portion:</label>
                </div>

                <select id="portionsToSelect"  onChange={(d)=> setSelectedPortion(selectedFood.portions[d.target.value])}>
                {Object.keys(selectedFood).length !=0 && selectedFood.portions.map((portion, index) =>{
                    return <option key={index} value={index}>{portion.portionName ?? `${portion.gramAmount}g`}</option>
                })}
                </select>
            </div>
        );
    }
    function makeQuantityInput(){
        return (
            <div>
                    {makeLabel("quantityFoodInput", "Enter quantity:","")}
                    <div className="shortWidth">
                      {makeInputDiv("number", "quantityFoodInput", "quantitySelect w-25 form-control",selectedFoodQuantity, "quanityFoodInput","quantity", setSelectedFoodQuantity)}
                    </div>                    
            </div>
        );
    }
    

    function ModalHeader(){
      return (       
              <div>
                Add Food
                {makeButton("", "closeBtn",() => {close(); resetTable()}, <RiCloseLine/>)}
              </div>         
            )
    }

    function AddFoodButton(){
      return (
              <div className="fixed-bottom pd-3">
                {makeButton("addFoodButton", "btn btn-success btn-block btn-lg text-body mb-4", () => addFood(), "Add")}
              </div>
            )
    }
    return (
        open ?
        <div className="darkBG">
            <div className="centered largeModal theModal">
              <div className="modalContent">
                <ModalHeader/>
                <SearchFood tc={tc} setTC={setTC} setSelectedFood={setSelectedFood} resetTable={resetTable} queryStart={queryStart} setQueryStart={setQueryStart}/>
                {makeRecipeFoodsToAdd()}
                <AddFoodButton/>
              </div>
            </div>
        </div>
        : null
    )
}

export default AddFoodModal;