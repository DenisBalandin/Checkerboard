import React, { Component } from 'react';

class Checkeredboard extends Component{
    constructor(props){
        super(props);
        this.state ={
            value:[],
            circletop:'circle circlecolorred',
            circletdown:'circle circlecolorblack',
            color: '',
            shape:''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeShape = this.handleChangeShape.bind(this);
    }
    handleChange(event) {
        this.setState({
            color: event.target.value
        });
        this.setState({
            circletop:'circle circlecolorblack',
            circletdown:'circle  circlecolorred',
        })
      }
      handleChangeShape(event) {
        this.setState({
            shape: event.target.value
        });
        this.setState({
            circletop:event.target.value+' circlecolorblack',
            circletdown:event.target.value+'  circlecolorred',
        })
      }
    componentDidMount = () =>{
        let n = 8;
        let finalArray = [];
        //I take n number of cells and use two loops 
        let id = 0;
        for(let i = 0; i < n; i++){
            //First i take twoo loop
            
            let arrayRow = [];
            if(i % 2 ==0 ){
                for(let k = 0; k < n; k++){
                    if(k % 2 ==0 ){
                        if(i < 2){
                            arrayRow.push({id:id,cell:1,piece:2})
                        }else if( i >= n - 2){
                            arrayRow.push({id:id,cell:1,piece:3})
                        }else{
                            arrayRow.push({id:id,cell:1,piece:0})
                        }
                    }else{
                        if(i < 2){
                            arrayRow.push({id:id,cell:0,piece:2})
                        }else if( i >= n - 2){
                            arrayRow.push({id:id,cell:0,piece:3})
                        }else{
                            arrayRow.push({id:id,cell:0,piece:0})
                        }
                    }
                    id++;
                }
            }else{
                for(let k = 0; k < n; k++){
                    if(k % 2 == 0 ){
                        if(i < 2){
                            arrayRow.push({id:id,cell:0,piece:2})
                        }else if( i >= n - 2){
                            arrayRow.push({id:id,cell:0,piece:3})
                        }else{
                            arrayRow.push({id:id,cell:0,piece:0})
                        }
                    }else{
                        if(i < 2){
                            arrayRow.push({id:id,cell:1,piece:2})
                        }else if( i >= n - 2){
                            arrayRow.push({id:id,cell:1,piece:3})
                        }else{
                            arrayRow.push({id:id,cell:1,piece:0})
                        }
                    }
                    id++;
                }
            }
            finalArray.push(arrayRow);
        }
        this.setState({
            value:finalArray
        });
    }
    movetToShape = (id) =>{
        console.log(id);

        const itemsst = this.state.items;
        const item = itemsst.find(item => item.id === parseInt(event.target.name));
        const itemIndex = itemsst.indexOf(item);

        // const itemsst = this.state.items;
        // const item = itemsst.find(item => item.id === parseInt(event.target.name));
        // const itemIndex = itemsst.indexOf(item);
        // if(typeof item !== 'undefined'){
        //     itemsst[itemIndex]['count'] = parseInt(event.target.value);
        //     this.setState({
        //         items: itemsst
        //     }); 
        // }else{
        //     this.setState({
        //         items:[...this.state.items,{count: parseInt(event.target.value), id: parseInt(event.target.name),buy:false}]
        //     });
        // }
    }
    render(){
        console.log(this.state);
        return(
            <div className="checkerboardMain">
                <div className="checkerboard">
                    {this.state.value.map((number) =>
                        <div className="boardRow">{number.map((a) =>
                            <div>{a.cell == 0 ? 
                                <div className="blackcels">
                                   {a.piece == 2 ? <div className={this.state.circletop} onClick={this.movetToShape.bind(this,a.id)}></div>:<div></div> } 
                                   {a.piece == 3 ? <div className={this.state.circletdown} onClick={this.movetToShape.bind(this,a.id)}></div>:<div></div> } 
                                </div> 
                                : 
                                <div className="whitecels">
                                    {a.piece == 2 ? <div className={this.state.circletop} onClick={this.movetToShape.bind(this,a.id)}></div>:<div></div> } 
                                   {a.piece == 3 ? <div className={this.state.circletdown} onClick={this.movetToShape.bind(this,a.id)}></div>:<div></div> } 
                                </div> 
                                }</div>
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
                        checked={this.state.color === "red"}
                        onChange={this.handleChange}
                        />
                        <br/>
                        <span>Black</span>
                    <input
                        type="radio"
                        value="black"
                        checked={this.state.color === "black"}
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