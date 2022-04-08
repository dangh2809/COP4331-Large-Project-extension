import React, {useState} from "react";
import {makeActionButton} from "../divHelpers/divHelpers.js";
import AddFoodModal from "../Modals/AddFoodModal";
import EditUserPrefModal from "../Modals/EditUserPrefModal.js";


function addFoodEvent(toggleAFM){
    toggleAFM();
}

function makeRecipeEvent(){
}
function editUserPrefEvent(toggleEUP){
    toggleEUP();
}

function leftPanelLogoHeader(){
    return(
        <div id = "logoHeader">
            <img id ="mainLogo" src ="./public/assets/thirdlogo.png" alt="logo for gitfit"></img>
            <h1 className ="left-text headerText" id = "title"> gitFit</h1>
         </div>
    )
}

function LeftPanel({user}){
    console.log(user);
    const [addFoodOpen, setAddFoodOpen] = useState(false);
    const [editUserPrefOpen, setEditUserPrefOpen] = useState(false);
    const [tableContent, setContent] = useState("");

    //Makes it so table content in add food is set to blank once opened
    const toggleTC = (content) => setContent(content);
    const toggleAFM = () => setAddFoodOpen(!addFoodOpen);
    const toggleEUP = () => setEditUserPrefOpen(!editUserPrefOpen);
 
    return(
        <div id="leftPanel">
          {leftPanelLogoHeader()}
          {makeActionButton("button", "leftPanelButton",() => addFoodEvent(toggleAFM),
                            "Add Food","addFoodButton")}
          {makeActionButton("button", "leftPanelButton",() => makeRecipeEvent(),
                            "Make Recipe","makeRecipeButton")}
          {makeActionButton("button", "leftPanelButton",() => editUserPrefEvent(toggleEUP),
                            "Edit User Preferences","EditUserPrefButton")}
          <main>
            {<AddFoodModal user={user} open={addFoodOpen} close={toggleAFM} tc={tableContent} setTC={toggleTC}/>}
            {<EditUserPrefModal user={user} open={editUserPrefOpen} close={toggleEUP} />}
          </main>
        </div>
    )
}
export default LeftPanel;
