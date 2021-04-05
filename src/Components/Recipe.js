import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import '../App.css';
import {Link} from 'react-router-dom';

let url = "https://api.spoonacular.com/recipes/{id}/analyzedInstructions";
const apikey = "02d28dbbd0d04c0da034ea324932d2f7";
let randomnumber = Math.floor(Math.random() * 5)

function Recipe() {
    const [statusdenied, setstatusdenied] = useState(false);
    const [caloriecarbs, setcc] = useState(0);
    const [percentStaf, setps] = useState(0);
    const [percentprotien, setpp] = useState(0);
    const [dataretrieved, setdataretrieved] = useState(false);
    let { id } = useParams();
    useEffect(() => {
        window.scrollTo(0, 0);
        fetchrecipe();
    }, [])
    const [nutition, setnutrition] = useState([]);
    const [image, setimage] = useState("");
    console.log(`https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=${apikey}`);
    const fetchrecipe = async () => {
        const data = await fetch(`https://api.spoonacular.com/food/menuItems/${id}/?apiKey=${apikey}`)
        if (data.status == 402) {
            setstatusdenied(true);
            return;
        }
        else {
        
            setstatusdenied(false);

            const dataitems = await data.json();
            setTimeout(()=>{
                console.log(dataitems.nutrition);
                setimage(dataitems.images[0])
                // setrecipe(dataitems[0].steps)
                setnutrition(dataitems.nutrition.nutrients)
                console.log(dataitems.nutrition.nutrients);
                console.log(dataitems.nutrition.caloricBreakdown);
                setcc(dataitems.nutrition.caloricBreakdown.percentProtein);
                setps(dataitems.nutrition.caloricBreakdown.percentCarbs);
                setpp(dataitems.nutrition.caloricBreakdown.percentProtein);
                setdataretrieved(true);
            },1000)
          
        }

    }
    return (
        <div className="card">
            {
                statusdenied && <div style={{ background: "#fff" }}><h2 className="loading">Oh no! You! yes You! Consumed all my daily api requests. This app won't work until 12 hours from now. Go back and learn React you fool!</h2><img className="gifs" src="/gifs/statusdenied.gif" alt="" /></div>
            }
            {
                !dataretrieved && <div className="loadingdiv"><h1>Getting your search results... Please wait</h1>
                    <img className="gifs" src={`/gifs/food${randomnumber}.gif`} alt="" />
                </div>
            }
            { dataretrieved &&
                <div className="imgheader">
                    {
                        image && dataretrieved && <img className="image" src={image} alt="" />
                    }
                </div>
            }
            {dataretrieved &&
                <ul className="ing">

                    <div>
                        <h1 className="ingheader">Caloric Breakdown :</h1>

                        <div>
                            <h2>percentProtein : {caloriecarbs}</h2>
                            <h2>percentFat : {percentStaf}</h2>
                            <h2>percentCarbs : {percentprotien}</h2>
                        </div>
                    </div>

                </ul>
            }
            {
                dataretrieved &&
                <ul className="ing">
                    <h1 className="nutheader">Nutrition Breakdown:</h1>
                    {
                        nutition.map((nut,index)=>(
                            <div key={index}>
                                <h3>{nut.name} ({nut.amount}{nut.unit})</h3> 
                            </div>
                        ))

                    }
                </ul>
            }
            <Link className="goback"to="/"><button className="button">Go Back</button></Link>
        </div>
    )
}

export default Recipe
