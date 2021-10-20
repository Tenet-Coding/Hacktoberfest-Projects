const playlist = [
    {
      keyCode: 81,
      keyTrigger: 'Q',
      id: 'Heater-1',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
    },
    {
      keyCode: 87,
      keyTrigger: 'W',
      id: 'Heater-2',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
    },
    {
      keyCode: 69,
      keyTrigger: 'E',
      id: 'Heater-3',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
    },
    {
      keyCode: 65,
      keyTrigger: 'A',
      id: 'Heater-4',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
    },
    {
      keyCode: 83,
      keyTrigger: 'S',
      id: 'Clap',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
    },
    {
      keyCode: 68,
      keyTrigger: 'D',
      id: 'Open-HH',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
    },
    {
      keyCode: 90,
      keyTrigger: 'Z',
      id: "Kick-n'-Hat",
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
    },
    {
      keyCode: 88,
      keyTrigger: 'X',
      id: 'Kick',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
    },
    {
      keyCode: 67,
      keyTrigger: 'C',
      id: 'Closed-HH',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
    }
  ];
  
 
function App(){
  const [volume,setvolume]=React.useState(0);
  const [recording,setrecording]=React.useState("");
  const [speed,setspeed]=React.useState(0.5); 
  
  const playrecording=()=>{
    let index=0;
    let recordarray=recording.split(" ");
    const interval=setInterval(()=>{
      const at=document.getElementById(recordarray[index]);
      at.volume=volume;
      at.currentTime=0;
      at.play();
      index++;
    },speed*600);
    setTimeout(()=>clearInterval(interval),600*speed*recordarray.length-1);
  };
    return(
     <div className="bg-info min-vh-100 text-white">
        <div className="text-center">
<h1>Drum Machine</h1>
{/* <h6>hssssf</h6> */}
        {playlist.map((clip)=>
<Pad key={clip.id} clip={clip} volume={volume} setrecording ={setrecording}/>
        )}
        <br />
        <h4>Volume</h4>
        <input type="range" max="1" onChange={(e)=>setvolume(e.target.value)} value={volume} min="0" step="0.01" className="w-50" />
      <h3>{recording}</h3>
      {recording&&(
        <>
        <button onClick={playrecording} className="btn btn-success m-4">play</button>
        <button onClick={()=>setrecording(" ")} className="btn btn-danger m-4">clear</button>
        <br/>
        <h3>Speed</h3>
        <input type="range" max="1.2" onChange={(e)=>setspeed(e.target.value)} value={speed} min="0.1" step="0.01" className="w-50" />

        </>
      )}
       </div>
        </div>
    );
    
}


function Pad({clip,volume ,setrecording}){

React.useEffect(()=>{
document.addEventListener("keydown",handlekey);

  return()=>{
  document.removeEventListener("keydown",handlekey);
  };
},[])

const handlekey=(e)=>{
if(e.keyCode===clip.keyCode){
  playsound();
}
}

const playsound=()=>{
  const at=document.getElementById(clip.keyTrigger);
  at.volume=volume;
  at.currentTime=0;
  at.play();
  setrecording((prev)=>prev+clip.keyTrigger+" ");
}

    return(
        <div onClick={playsound} className="btn btn-secondary p-4 m-3">
            <audio className="clip"  id={clip.keyTrigger} src={clip.url}/>
          {clip.keyTrigger}
        </div>
    );
}
ReactDOM.render(<App />,document.getElementById('root'));
