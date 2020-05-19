import React, { Component } from 'react';

class Checkeredboard extends Component{
    constructor(props){
        super(props);
        this.state ={
            value:[]
        }
    }
    componentDidMount = () =>{
        let finalArray = [];
        for(let i = 0; i < 8; i++){
            let arrayRow = [];
            if(i % 2 ==0 ){
                for(let i = 0; i < 8; i++){
                    if(i % 2 ==0 ){
                        arrayRow.push(1)
                    }else{
                        arrayRow.push(0)
                    }
                }
            }else{
                for(let i = 0; i < 8; i++){
                    if(i % 2 == 0 ){
                        arrayRow.push(0)
                    }else{
                        arrayRow.push(1)
                    }
                }
            }
            finalArray.push(arrayRow);
        }
        this.setState({
            value:finalArray
        })        
    }
    render(){
        return(
            <div className="checkerboard" >
                    {this.state.value.map((number) =>
                        <div className="boardRow">{number.map((a) =>
                            <div>{a == 0 ? <div className="blackcels"></div> : <div className="whitecels"></div> }</div>
                        )}</div>
                    )}
            </div>
        )
    }

}
export default Checkeredboard;