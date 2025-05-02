import reportImage from "./../Items/Report.jpeg"
const Report=(props)=>{
    
    return(
        <div onClick={()=>props.onClick(props.path)}>
            <img src={reportImage} alt="Report Illustration" className=""/>
            <h1>{`Report ${props.idx+1}`}</h1>
        </div>
    )
}

export default Report;