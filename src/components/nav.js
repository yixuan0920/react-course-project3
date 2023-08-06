
export default function Nav(){
    return(
        <navbar className='nav' 
            style={{
                display:"flex",
                justifyContent:"space-between",
                padding:"10px 25px 10px 25px",
                background: "linear-gradient(to right, #9306A2 , #D616EA)",
                color:"white"}}>
            <div style={{display:"flex"}}>
                <img style={{width:"40px",height:"40px"}} src={require("../images/logo.png")}/>
                <h4 style={{margin:"auto 0 auto 10px"}}>Meme Generator</h4>
            </div>

            <p>React Course - Project 3</p>
        </navbar>
    )
}