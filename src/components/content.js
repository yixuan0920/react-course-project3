// import memesData from '../Datas.js'
import React from 'react'
import { saveAs } from 'file-saver';

export default function Content(){

    // Local memes data
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg"
    })

    function saveMeme(event){
        const {name, value} = event.target
        setMeme(prevMeme =>{
            return{
                ...prevMeme,
                [name] : value
            }
        })
    }

    // function getRandomMeme(){
    //     const memesArray = memesData.data.memes
    //     const randomNumber = Math.floor(Math.random() * memesArray.length)
    //     const url = memesArray[randomNumber].imgURL
    //     setMeme(prevMeme =>({
    //         ...prevMeme,
    //         randomImage: url
    //     })
    //     )
    // }


    // Online Memes data
    const [allMemes, setAllMemes] = React.useState([])
    
    // React.useEffect(() =>{
    //     fetch("https://api.imgflip.com/get_memes")
    //         .then(res => res.json())
    //         .then(data => setAllMemes(data.data.memes))
    // },[])

    // Using async and await will get more cleaner and easy to repair.
    React.useEffect(() =>{
        async function getMeme(){
            const res = await fetch("https://api.imgflip.com/get_memes")
            const data = await res.json()
            setAllMemes(data.data.memes)
        }
        getMeme();
    },[])

    const stringify = JSON.stringify(allMemes)
    console.log("  ")
    console.log(stringify)

    function getRandomMeme(){
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomNumber].url
        setMeme(prevMeme =>({
            ...prevMeme,
            randomImage: url
        })
        )
    }

    // Save Image function
    function saveImage() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
    
        // Create an image element to load the meme image
        const img = new Image();
        img.crossOrigin = "anonymous"; // Set to "crossOrigin"
        img.src = meme.randomImage;
        
        img.onload = () => {
            // Set canvas dimensions to match image dimensions
            canvas.width = img.width;
            canvas.height = img.height;
    
            // Draw the meme image
            ctx.drawImage(img, 0, 0);
    
            // Set font properties
            ctx.font = "50px Impact";
            ctx.fillStyle = "white";
            ctx.strokeStyle = "black";
            ctx.lineWidth = 2;
    
            ctx.textAlign = "center";
            ctx.fillText(meme.topText, canvas.width / 2, 55);
            ctx.strokeText(meme.topText, canvas.width / 2, 55);
    
            ctx.textAlign = "center";
            ctx.fillText(meme.bottomText, canvas.width / 2, canvas.height - 10);
            ctx.strokeText(meme.bottomText, canvas.width / 2, canvas.height - 10);
    
            // Convert the canvas to a data URL and save the image
            canvas.toBlob((blob) => {
                saveAs(blob, "Meme-Image.png");
            });
        };
    }
   
    return(
        <main>
            <div className="form">
                <input 
                    name="topText"
                    type="text"
                    className="form-input"
                    placeholder="Top text"
                    value={meme.topText}
                    onChange={saveMeme}/>

                <input 
                    name="bottomText"
                    type="text"
                    className="form-input"
                    placeholder="Bottom text"
                    value={meme.bottomText}
                    onChange={saveMeme}/>

                <button
                    className="form-button"
                    onClick={getRandomMeme}>Get a new meme image 😁</button>

                <button
                    onClick={saveImage}>Save Image now ⬇️</button>

                <div className='meme'>
                    <img
                            className='meme-design'
                            src={meme.randomImage} 
                            alt="Meme" />
                    <h1 className='memeTextTop'>{meme.topText === "" ? "Top Text" : meme.topText}</h1>
                    <h1 className='memeTextBottom'>{meme.bottomText === "" ? "Bottom Text" : meme.bottomText}</h1>
                </div>
            
            </div>

        </main>
    )
}