import React, { useState, useEffect } from 'react'
import '../App.css';
import { BiSearchAlt } from "react-icons/bi";
import { Link } from 'react-router-dom';
let fooditems = [];
let randomnumber;
const apikey = "02d28dbbd0d04c0da034ea324932d2f7";

function Searchbar() {
    const [items, setitems] = useState([]);
    const [typingtext, setypingtext] = useState("");
    const [resultheader, setresultheader] = useState("");
    const [searched, setsearched] = useState(false);
    const [dataitems, setdataitems] = useState([]);
    const [dataitemsfetched, setdataitemsfetched] = useState(false);
    const [searchitemempty, setsearchitemsempty] = useState(false);
    const [statusdenied, setstatusdenied] = useState(false);
    useEffect(() => {
        window.scrollTo(0, 0);
        foodlist();
    }, [])

    useEffect(() => {
        fetchfoodlist();
    }, [typingtext])

    const fetchfoodlist = async () => {
        if (typingtext.length != 0) {
            setsearched(false);
            const regex = new RegExp(`${typingtext}`, "i")
            let arrayitems = fooditems.filter((v) => regex.test(v));
            let limiteditems = [];
            for (let i = 0; i < 5; i++) {
                if (arrayitems[i] != undefined) {
                    limiteditems[i] = arrayitems[i];
                }
            }

            setitems(limiteditems)
        }
        else {
            setitems([])
        }
    }
    const foodlist = async () => {
        const data = await fetch("/food.json");
        const food = await data.json();
        let foodarray = food[0].foodItems;
        fooditems = foodarray.map((item) => {
            return item.foodName
        })
        fooditems.sort();
    }
    const searchfood = async (searchedfood) => {
        const data = await fetch(`https://api.spoonacular.com/food/menuItems/search?apiKey=${apikey}&query=${searchedfood}`);
        if (data.status == 402) {
            setstatusdenied(true);
            setsearched(false);
            return;
        }
        else {
            setstatusdenied(false);
            const food = await data.json();
            setTimeout(() => {
                console.log(food.menuItems);
                if (food.menuItems.length != 0) {
                    setsearchitemsempty(false);
                    setdataitems(food.menuItems);
                    setdataitemsfetched(true);
                    setsearched(false)
                }
                else {
                    setsearched(false);
                    setsearchitemsempty(true);
                }

            }, 2000)
        }
    }
    function clickeditem(item) {
        setypingtext(item);
        setitems([]);
    }
    const submithandler = (e) => {
        setsearchitemsempty(false);
        e.preventDefault();
        setdataitems([]);
        console.log("here")
        setsearched(true);
        setresultheader(typingtext);
        searchfood(typingtext);
        randomnumber = Math.floor(Math.random() * 5)
        setypingtext("");
    }
    const loadfullpage = (id) => {

    }
    return (
        <div className="searchcomponent">
            <h1 className="header">NUTRINÓ</h1>
            <form onSubmit={submithandler}>
                <div className="searchdiv">
                    <input className="searchbar" placeholder="Search for a Food Item..." type="text" value={typingtext} onChange={(e) => setypingtext(e.target.value)} /><button className="icon" type="submit" ><BiSearchAlt /></button>
                </div>
            </form>
            <ul>
                {
                    items.map((item, i) => (<li onClick={(e) => clickeditem(item)} className="list" key={i}>{item}</li>))
                }
                {
                    statusdenied && <div><h2 className="loading">Oh no! You! yes You! Consumed all my daily api requests. This app won't work until 12 hours from now. Go back and learn React you fool!</h2><img className="gifs" src="/gifs/statusdenied.gif" alt="" /></div>
                }
            </ul>
            <div className="Resultheader">
                {
                    searched && <div className="loading"><h1>Getting your search results... Please wait</h1>
                        <img className="gifs" src={`/gifs/food${randomnumber}.gif`} alt="" />
                    </div>
                }{
                    !searchitemempty && !searched && dataitemsfetched && <h1 className="resultsheader">Showing results for "{resultheader}"</h1>
                }
                {
                    dataitemsfetched && dataitems.map((item) => (<Link key={item.id} to={`/recipe/${item.id}`}><div onClick={() => loadfullpage(item.id)} key={item.id} className="cardwrapper">
                        <span className="foodtitle">{item.title}</span>
                        <img className="foodimage" src={item.image} alt="" />
                    </div></Link>))
                }
                {
                    searchitemempty && <div className="loading"><h2 >We did'nt find any food like that </h2><img className="gifs" src="/gifs/notfound.gif" alt="" /></div>
                }
            </div>
            <div className="results">

            </div>
        </div>
    )
}

export default Searchbar
