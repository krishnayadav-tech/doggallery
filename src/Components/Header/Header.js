import {Component} from 'react'
import headercss from  './Header.module.css';
import CustomSearch from './../CustomSearch/CustomSearch';
class Header extends Component{
    constructor(props){
        super(props);
        this.state = {
            customsearch : false
        }
    }
    
    customsearchclose = ()=>{
        this.setState(x=>{
            x.customsearch = false;
            return x;
        })
    }
    render(){
        return (
            <div className={headercss.Header}>
                <h1>Dog Gallery</h1>
                <button onClick = {()=>{
                    this.setState(x=>{
                        x.customsearch = true;
                        return x;
                    })
                }} className={headercss.customsearch} id="customsearch">Custom Search</button>

                {this.state.customsearch ? <CustomSearch customsearchclose={this.customsearchclose}/> : null}
            </div>
        )
    }
}

export default Header;