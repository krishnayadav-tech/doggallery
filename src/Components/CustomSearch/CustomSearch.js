import React, { Component } from "react";
import axios from 'axios';
import customSearchCss from './CustomSearch.module.css';
// reduce inline css
class CustomSearch extends Component {
    constructor(props){
        super(props);
        this.inputref = React.createRef(null);
        this.numberref = React.createRef(null);
        this.state = {
            allbreed : [],
            url : []
        }
    }

    optionforbreed = ()=>{
        return this.state.allbreed.map(x=>{
            return <option key={x} value={x}>{x}</option>
        })
    }

    downloadimage = ()=>{
        let breed  = this.inputref.current.value;
        let number = this.numberref.current.value;
        if(breed == "" || number == ""){
            return;
        }
        axios.get(`https://dog.ceo/api/breed/${breed}/images/random/${number}`).then(res=>{
            if(res.status == 200){
                this.setState(x=>{
                    x.url = res.data.message;
                    return x;
                })
            }
        })
    }

    imageviewer = ()=>{

        return (
            <>
            <p style={{margin:'10px'}}>Showing {this.state.url.length} images of {this.inputref.current.value}</p>
            <div>
                <div className={customSearchCss.imageviewer}>
                    {this.state.url.map(x=>{
                        return (
                            <div style={{
                                minWidth : '150px',
                                minHeight : '180px',
                                width : '150px',height:'180px',overflow:'hidden',
                                margin: "10px",
                                textAlign:'center'
                            }} key={x}>
                                <img style={{width : "100%", maxWidth:"150px",
                                    height : '100%',
                                    maxHeight : '180px'
                                }} src={x}/>
                            </div>
                        )
                    })}
                </div>
            </div>
            </>
        )
    }

    render(){
        return (
            <div style={{position:"fixed",height:'100vh',width:"100vw",zIndex:"1000",
                backgroundColor:'rgba(0,0,0,0.5)',
                backdropFilter : 'blur(3px)'
            }}>
                <div className={customSearchCss.customsearch}>
                    <div className={customSearchCss.header}>
                        <p>Custom Search</p>
                        <span onClick={
                            ()=>{this.props.customsearchclose()}
                        } className={customSearchCss.close}>&times;</span>
                    </div>

                    <div className={customSearchCss.selection}>
                        <div className={customSearchCss.form}>
                            <div className={customSearchCss.breedselect}>
                                <select ref={this.inputref} name="Breed" id="Breed">
                                    <option value="">Select a breed</option>
                                    {this.optionforbreed()}
                                </select>
                                <input ref={this.numberref} placeholder="Number of images" type="text"/>
                            </div>
                            <input onClick={this.downloadimage} className={customSearchCss.submitbtn} type="submit" value="GET IMAGES"/>
                        </div>
                    </div>
                    
                    {this.state.url.length > 0 ? this.imageviewer() : null}
                </div>
            </div>
        )
    }

    componentDidMount(){
        //fetch all breed and store it in a state 
        axios.get('https://dog.ceo/api/breeds/list/all').then(res=>{
            if(res.status == 200){
                let temp = [];
                for(let value in res.data.message){
                    temp.push(value);
                }
                this.setState(x=>{
                    x.allbreed = temp;
                    return x;
                })
            }
        })
    }
}

export default CustomSearch;