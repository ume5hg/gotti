import {useState,useRef,useEffect} from 'react'
import Die from './Die'
import Confetti from 'react-confetti'
import Greeting from './Greeting'
export default function Foremost(){



    function allNewDice(){
        return new Array(10).fill(0).map(()=> {
            return {
                value: Math.floor(Math.random()*6)+1,
                isHeld:false
            }
        })
    }
    
    const[diceValues, setDiceValues]=useState(()=> allNewDice());
    const diceElements= diceValues.map((item,index)=>
        (<Die 
            key={index}
            value={item.value} 
            isHeld={item.isHeld} 
            onClickButton={()=>holdTheDice(index)}
            />
        ))

    function rollTheDice(){
        if(!gameWon){
            setDiceValues(oldValues => oldValues.map(item => 
                item.isHeld?item:
                {...item, 
                    value:Math.floor(Math.random()*6)+1
                }
            ));
        }
        else{
            setDiceValues(allNewDice());
            
        }
    }

    function holdTheDice(i){
        setDiceValues(oldValues => 
            oldValues.map((objects,index)=> (i===index?{
                ...objects,
                isHeld : !objects.isHeld
            }:objects))
        );
    }

    const gameWon = (diceValues.every(die => die.isHeld) && diceValues.every(die => diceValues[0].value === die.value));

    const refElement=useRef(null);
    useEffect(()=>{
        refElement.current.focus();
    },[gameWon]);


    return(
        <>
            {gameWon?(
                <>
                    <Greeting/>
                    <Confetti width={window.innerWidth}
                    height={window.innerHeight}/>
                </>
            ):null}
            
            <div className="box">
                <div className="text-section">
                    <h2>Tenzies</h2>
                    <p>Roll until all dice are same. Click each die to freeze it at its current value between rolls.</p>
                </div>
                <div className="dice-section">
                    {diceElements}
                </div>
                <button className="roll-btn" 
                ref={refElement}
                onClick={rollTheDice}>{gameWon?"New Game": "Roll"}</button>
            </div>
        </>
    )
}