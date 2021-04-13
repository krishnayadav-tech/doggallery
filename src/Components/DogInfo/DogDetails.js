import axios from 'axios';
import React from 'react';
import dogDetailsCss from './DogDetails.module.css';
class DogDetails extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            subbreed : [],
            threerandom : [],
            informationreceived : false
        }
    }
    
    subbreed = ()=>{
        

        return(
        <>
            <p style={{margin:'10px'}}>Subbreed</p>
            <div>
                <div className={dogDetailsCss.subbreedviewer}>
                    {this.state.subbreed.map(x=>{
                        return (
                            <div style={{
                                minWidth : '150px',
                                minHeight : '220px',
                                width : '150px',height:'180px',overflow:'hidden',
                                margin: "10px",
                                textAlign:'center',
                                color : 'black'
                            }} key={x.name}>
                                <img style={{width : "100%", maxWidth:"150px",
                                    height : '100%',
                                    maxHeight : '180px'
                                }} src={x.url}/>

                                <p style={{color : 'black'}}>{x.name.toUpperCase()}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
        )
    }

    threeimages = ()=>{
    
        return (
           
            <div className={dogDetailsCss.threeimages}>
                <p>Showing three images of "{this.props.breed.toUpperCase()}"</p>
                <div className={dogDetailsCss.threeimagephoto}>
                    {this.state.threerandom.map(x=>{
                        return <div key={x} style={{width : '200px',height:'200px',overflow:'hidden',
                            margin:"10px",textAlign:"center"
                        }}>
                        <img style={{width : "100%", maxWidth:"200px",
                            height : '100%',
                            maxHeight : '200px'
                        }} src={x}/>
                    </div>
                    })}
                </div>
            </div>
        )
    }

    render(){
        
        return (
            <div style={{position:'fixed', width: '100vw', height : '100vh',
                top:'0',
                left:'0',
                backgroundColor : 'rgba(0,0,0,0.5)',
                backdropFilter : 'blur(3px)'
            }}>

                <div className={dogDetailsCss.doginfo}>
                    <div className={dogDetailsCss.header}>
                        <p>Selected Dog Breed Name</p>
                        <span onClick={this.props.closetheinfo} className={dogDetailsCss.close}>&times;</span>
                    </div>

                    {this.state.informationreceived && this.state.subbreed.length > 0 ? this.subbreed() : null}
                    {this.state.informationreceived ? this.threeimages() : null}
                </div>
            </div>
        )
    }

    


    componentDidMount(){
        if(this.state.informationreceived == false){
            axios.get(`https://dog.ceo/api/breed/${this.props.breed}/images/random/3`).then(random=>{
                if(random.status == 200){
                    axios.get(`https://dog.ceo/api/breed/${this.props.breed}/list`).then(res=>{
                        if(res.status == 200){  
                            if(res.data.message.length == 0){
                                this.setState(last=>{
                                    last.threerandom = random.data.message;
                                    last.informationreceived = true;
                                    last.subbreed = res.data.message;
                                    return last;
                                })
                            }else{
                                let customdata = [];
                                let arr = res.data.message;
                                for(let i=0;i<arr.length;i++){
                                    let temp = {};
                                    temp.name = arr[i];
                                    axios.get(`https://dog.ceo/api/breed/${this.props.breed}/${arr[i]}/images/random`).then(imglink=>{
                                        if(imglink.status == 200){
                                            temp.url = imglink.data.message;
                                            customdata.push(temp);
                                        }
                                        if(i == arr.length -1){
                                            this.setState(last=>{
                                                last.threerandom = random.data.message;
                                                last.informationreceived = true;
                                                last.subbreed = customdata;
                                                return last;
                                            })
                                        }
                                    })
                                }
                            }
                        }
                    })
                }
            })
        }
    }
}

export default DogDetails;