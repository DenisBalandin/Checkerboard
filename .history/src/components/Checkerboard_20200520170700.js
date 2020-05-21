import React, { Component } from 'react';

class Checkeredboard extends Component{
    constructor(props){
        super(props);
        this.state ={
            startArray:[],
            matrixArray:[],
            circletop:'circle circlecolorred',
            circletdown:'circle circlecolorblack',
            color: '',
            shape:'',
            shapeMove:[{id:1,piece:3}]
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeShape = this.handleChangeShape.bind(this);
    }
    handleChange(event) {
        this.setState({
            color: event.target.value
        });
        this.setState({
            circletop:'circle circlecolorred',
            circletdown:'circle  circlecolorblack',
        })
      }
      handleChangeShape(event){
        this.setState({
            shape: event.target.value
        });
        this.setState({
            circletop:event.target.value+' circlecolorblack',
            circletdown:event.target.value+'  circlecolorred',
        })
      }
    componentDidMount = () =>{
        let n = 8 * 8;
        let finalArray = [];
        //I take n number of cells and use two loops 
        for(let i = 0; i < n; i++){
            //First i take twoo loop
            if(i % 2 == 0 ){
                if(i < 18){
                    finalArray.push({id:i,cell:1,piece:2})
                }else if( i >= n - 18){
                    finalArray.push({id:i,cell:1,piece:3})
                }else{
                    finalArray.push({id:i,cell:1,piece:0})
                }
            }else{
                if(i < 18){
                    finalArray.push({id:i,cell:0,piece:2})
                }else if( i >= n - 18){
                    finalArray.push({id:i,cell:0,piece:3})
                }else{
                    finalArray.push({id:i,cell:0,piece:0})
                }
            }
        }
        this.setState({
            startArray:finalArray
        });
        let matrixArray = [];
        let midArray = [];
        for(let i = 0; i < finalArray.length; i++){
            if(i % 9 == 0 ){
                matrixArray.push(midArray);
                midArray = [];
            }else{
                midArray.push(finalArray[i]);
            }
        }
        this.setState({
            matrixArray:matrixArray
        });
    }
    movetToShape = (id) =>{

        if(id !== this.state.shapeMove.id ){
            console.log(this.state.shapeMove);
            const itemsst = this.state.startArray;
            const item = itemsst.find(item => item.id === this.state.shapeMove.id);
            console.log(item);
            const itemIndex = itemsst.indexOf(item);
            if(typeof this.state.shapeMove.id !== 'undefined'){
                console.log(itemIndex);
                itemsst[itemIndex]['piece'] = 3;
                this.setState({
                    startArray: itemsst,
                }); 
            }

        }
    


        const itemsst = this.state.startArray;
        const item = itemsst.find(item => item.id === id);
        const itemIndex = itemsst.indexOf(item);
        itemsst[itemIndex]['piece'] = 4;
        this.setState({
            startArray: itemsst,
            shapeMove:{id:id,piece:4}
        }); 








    }
    render(){
         console.log(this.state.matrixArray);
        return(
            <div className="checkerboardMain">
                <div className="checkerboard">
                    {this.state.matrixArray.map((number) =>
                        <div className="boardRow">{number.map((a) =>
                            <div>{a.cell == 0 ? 
                                <div className="blackcels">
                                   {a.piece == 2 ? <div className={this.state.circletop} onClick={this.movetToShape.bind(this,a.id)}></div>:<div></div> } 
                                   {a.piece == 3 ? <div className={this.state.circletdown} onClick={this.movetToShape.bind(this,a.id)}></div>:<div></div> } 
                                   {a.piece == 4 ? <div id="circlepurple" className={this.state.circletdown} onClick={this.movetToShape.bind(this,a.id)}></div>:<div></div> } 
                                </div> 
                                : 
                                <div className="whitecels">
                                   {a.piece == 2 ? <div className={this.state.circletop} onClick={this.movetToShape.bind(this,a.id)}></div>:<div></div> } 
                                   {a.piece == 3 ? <div className={this.state.circletdown} onClick={this.movetToShape.bind(this,a.id)}></div>:<div></div> } 
                                   {a.piece == 4 ? <div id="circlepurple" className={this.state.circletdown} onClick={this.movetToShape.bind(this,a.id)}></div>:<div></div> } 

                                </div>}
                            </div>
                        )}</div>
                    )}
                </div>
                <div className="change_button_block">
                    <div>Color</div>
                    <div>
                    <span>Red</span>
                    <input
                        type="radio"
                        value="red"
                        checked={this.state.color === "circlecolorred"}
                        onChange={this.handleChange}
                        />
                        <br/>
                        <span>Black</span>
                    <input
                        type="radio"
                        value="black"
                        checked={this.state.color === "circlecolorblack"}
                        onChange={this.handleChange}
                        />
                    </div>
                    <div>Shape</div>
                    <div>
                    <span>Circle</span>
                    <input
                        type="radio"
                        value="circle"
                        checked={this.state.shape === "circle"}
                        onChange={this.handleChangeShape}
                        />
                        <br/>
                        <span>box</span>
                    <input
                        type="radio"
                        value="cube"
                        checked={this.state.shape === "cube"}
                        onChange={this.handleChangeShape}
                        />
                    </div>
                </div>
            </div>
        )
    }

}
export default Checkeredboard;