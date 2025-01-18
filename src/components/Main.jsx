
import React from "react"

export default function Main() {
    
    const [meme, setMeme] = React.useState(
        {
            topText: "One does not simply",
            bottomText: "Walk into Mordor",
            imageUrl: "http://i.imgflip.com/1bij.jpg"
        }
    )

    const [memesData, setMemesData] = React.useState([])

    React.useEffect(()=>{
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setMemesData(data.data.memes))
    }, [])


    function getImageMeme(){

        const randomIndex = Math.floor(Math.random() * memesData.length)
        setMeme(prevMeme => (
            {
                ...prevMeme,
                imageUrl: memesData[randomIndex].url
            }
        ))
    }


    function handleChange(e){
        const {value, name} = e.currentTarget
        setMeme(prevMeme =>(
            {
                ...prevMeme,
                [name]: value
            }
        ))
    }

    return (
        <main>
            <div className="form">
                <label>Top Text
                    <input
                        onChange={handleChange}
                        value={meme.topText}
                        type="text"
                        placeholder="One does not simply"
                        name="topText"
                    />
                </label>

                <label>Bottom Text
                    <input
                        onChange={handleChange}
                        value={meme.bottomText}
                        type="text"
                        placeholder="Walk into Mordor"
                        name="bottomText"
                    />
                </label>
                <button onClick={getImageMeme} >Get a new meme image 🖼🎇</button>
            </div>
            <div className="meme">
                <img src={meme.imageUrl} />
                <span className="top">{meme.topText}</span>
                <span className="bottom">{meme.bottomText}</span>
            </div>
        </main>
    )
}