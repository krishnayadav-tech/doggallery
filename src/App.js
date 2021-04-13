import {Component} from 'react'
import Header from './Components/Header/Header'
import Section from './Components/Section/Section'
import appcss from  './App.module.css';
class App extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className={appcss.App}>
                <Header/> 
                <Section/>
            </div>
        )
    }
}

export default App;