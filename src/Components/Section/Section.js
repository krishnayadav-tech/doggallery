import axios from 'axios';
import React from 'react';
import DogDetails from '../DogInfo/DogDetails';
import sectioncss  from './Section.module.css';
class Section extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            searchvalue : "",
            allbreed : [],
            dogimage : [],
            imagedownload : false,
            informationprompt : null
        }
    }

    renderListOfImage = ()=>{

        if(this.state.searchvalue === ""){
            return this.state.dogimage.map(x=>{
                return (
                    <div key={x.name} data-breed-type={x.name} style={{width : '200px',height:'220px',overflow:'hidden',
                        margin: "10px",
                        textAlign:'center'
                    }}>
                        <img data-breed-type={x.name} style={{width : "100%", maxWidth:"200px",
                            height : '100%',
                            maxHeight : '200px'
                        }} src={x.url}/>

                        <p data-breed-type={x.name}>{x.name.toUpperCase()}</p>
                    </div>
                )
            })
        }
        else{

            return this.state.dogimage.filter(x=>{
                if(String(x.name).startsWith(this.state.searchvalue)){
                    return x;
                }
            }).map(x=>{
                return (
                    <div key={x.name} data-breed-type={x.name} style={{width : '200px',height:'220px',overflow:'hidden',
                        margin: "10px",
                        textAlign:'center'
                    }}>
                        <img data-breed-type={x.name} style={{width : "100%", maxWidth:"200px",
                            height : '100%',
                            maxHeight : '200px'
                        }} src={x.url}/>

                        <p data-breed-type={x.name}>{x.name.toUpperCase()}</p>
                    </div>
                )
            })
        }
    }   

    searchinputchange = (x)=>{
        this.setState(last=>{
            last.searchvalue = x.target.value;
            return last;
        })
    }

    showtheinfo = (e)=>{
       let element = e.target;
       if(element.hasAttribute("data-breed-type")){
            let attributeValue = element.getAttribute("data-breed-type");
            this.setState(last=>{
                last.informationprompt = attributeValue;
                return last;
            })
       }
    }

    closetheinfo = ()=>{
        this.setState(last=>{
            last.informationprompt = null;
            return last;
        })
    }

    render(){
    
        return (
            
            <div className={sectioncss.section}>
                <div style={{width:'100%', margin : '20px auto', display:"flex",
                justifyContent : 'center', alignItems : 'center'}} id="searchbar">
                <input onChange={this.searchinputchange} style={{width:'60%',height:'50px',
                        padding : '20px'
                }} type="text" placeholder="Type here to filter by breed"></input>
                </div>
                <div onClick={this.showtheinfo} className={sectioncss.photopreview} id="actualsection">
                    {this.state.imagedownload == true ? this.renderListOfImage() : null}
                </div>

                {this.state.informationprompt ? <DogDetails breed={this.state.informationprompt} closetheinfo={this.closetheinfo}/> : null}
            </div>
            
        )
    }

    componentDidMount(){

        let tempimage = [];
        if(this.state.imagedownload == false){
            axios.get('https://dog.ceo/api/breeds/list/all').then(res=>{
            let breed;
            if(res.status == 200){
                breed = res.data.message;
            }
            if(breed){
                
                const breedArray = Object.getOwnPropertyNames(breed);
                for(let i=0;i<breedArray.length;i++){
                    let x = breedArray[i];
                    let y = `https://dog.ceo/api/breed/${x}/images/random`;
                    axios.get(y).then(res=>{
                        
                        if(res.status == 200){
                            let temp = {
                                name : x,
                                url : res.data.message
                            }
                            tempimage.push(temp);
                            
                        }

                        if(i == breedArray.length-1){
        
                            this.setState(last=>{
                                last.imagedownload = true;
                                last.dogimage = tempimage;
                                last.allbreed = breed;
                                return last;
                            })
                        }
                    })
                }
            }
        
            }).catch((error)=>{
                
            })
        }
    }
}

export default Section;