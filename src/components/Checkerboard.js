import React, { Component } from 'react';

class Checkeredboard extends Component{
    constructor(props){
        super(props);
        this.state ={
            startArray:[],
            matrixArray:[],
            baseMatrix:[],
            baseStartArray:[],
            circletop:'circle circlecolorred',
            circletdown:'circle circlecolorblack',
            color: 'circlecolorred',
            shape:'circle',
            shapeMove:[{id:1,piece:3,type:0}],
            cellMove:[{idleft:'',idrighr:''}],
            nextPlayer:2,
            newGame:0
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeShape = this.handleChangeShape.bind(this);
    }
    handleChange(event) {
        this.setState({
            color: event.target.value
        });
        this.setState({
            circletop:'circle '+event.target.value,
            circletdown:'circle  '+event.target.value,
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
    createStartArrays = () =>{
        //Here I am create base array for main work and updeitng
        let n = 8 * 8;
        let finalArray = [];
        //I take n number of cells and use two loops 
        for(let i = 0; i < n; i++){
            //First i take twoo loop
            if(i % 2 === 0 ){
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
            baseStartArray:finalArray
        });
        if(this.state.newGame === 0){
            this.setState({
                startArray:JSON.parse(localStorage.getItem('startArray')),
                newGame:1
            });
       }else{
            this.setState({
                startArray:finalArray
            });
       }
       //Here I am create Matrix array for rendering in jsx
       let matrixArray = [];
       let midArray = [];
       for(let i = 0; i < finalArray.length; i++){
           if(i % 9 === 0 ){
               matrixArray.push(midArray);
               midArray = [];
           }else{
               midArray.push(finalArray[i]);
           }
       }
        this.setState({
            baseMatrix:matrixArray
        });

       if(this.state.newGame === 0){
            this.setState({
               matrixArray:JSON.parse(localStorage.getItem('matrixArray')),
               newGame:1
            });
        }else{
            this.setState({
               matrixArray:matrixArray
            });
        }
    }
    componentDidMount = () =>{
        this.createStartArrays();
    }
    deletShape = (id) =>{
        const itemsst = this.state.startArray;
        const item = itemsst.find(item => item.id === id);
        const itemIndex = itemsst.indexOf(item);
        itemsst[itemIndex]['piece'] = 0;
        this.setState({
            startArray: itemsst,
        }); 
    }
    checkId = (id) =>{
        const itemsst = this.state.startArray;
        const item = itemsst.find(item => item.id === id);
        console.log(item);
        if(typeof item === 'undefined'){
            return '';
        }else{
            if(item.piece < 1 ){
                return id;
            }else{
                return '';
            }
        }
    }
    movetToShape = (id, type) =>{
        if(type === this.state.nextPlayer){
            if(id !== this.state.shapeMove.id ){
                const itemsst = this.state.startArray;
                const item = itemsst.find(item => item.id === this.state.shapeMove.id);
                const itemIndex = itemsst.indexOf(item);
                if(typeof this.state.shapeMove.id !== 'undefined'){
                    itemsst[itemIndex]['piece'] = this.state.shapeMove.type;
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
            }); 
            if(id !== this.state.shapeMove.id ){
                console.log(this.state.shapeMove);
                const itemsst = this.state.startArray;
                const item = itemsst.find(item => item.id === id);
                const itemIndex = itemsst.indexOf(item);
                itemsst[itemIndex]['piece'] = 4;
                this.setState({
                    startArray: itemsst,
                    shapeMove:{id:id,piece:4,type:type}
                }); 
            }
            if(type === 3){
                let getMovecell = id - 9;
                let idleft =  this.checkId(getMovecell-1);
                let idrighr =  this.checkId(getMovecell+1);
                this.setState({
                    cellMove:{idleft:idleft,idrighr:idrighr}
                }); 
            }
            if(type === 2){
                let getMovecell = id + 9;
                let idleft =  this.checkId(getMovecell-1);
                let idrighr =  this.checkId(getMovecell+1);
        
                this.setState({
                    cellMove:{idleft:idleft,idrighr:idrighr}
                }); 
            }
        }   
        let matrixArray = [];
        let midArray = [];
        for(let i = 0; i < this.state.startArray.length; i++){
            if(i % 9 === 0 ){
                matrixArray.push(midArray);
                midArray = [];
            }else{
                midArray.push(this.state.startArray[i]);
            }
        }
        this.setState({
            matrixArray:matrixArray
        });
    }
    moveCell = (id) =>{
        const itemsst = this.state.startArray;
        const item = itemsst.find(item => item.id === id);
        const itemIndex = itemsst.indexOf(item);
        itemsst[itemIndex]['piece'] = this.state.shapeMove.type;
        var nextpl = 0;
        if(this.state.shapeMove.type === 2){
            nextpl = 3;
        }else{
            nextpl = 2;
        }
        this.setState({
            startArray: itemsst,
            shapeMove:{id:id,piece:this.state.shapeMove.piece,type:this.state.shapeMove.type},
            cellMove:[{idleft:'',idrighr:''}],
            nextPlayer:nextpl
        }); 
        this.deletShape(this.state.shapeMove.id);
    }
    saveGame = () =>{
        localStorage.setItem('startArray',  JSON.stringify(this.state.startArray));
        localStorage.setItem('matrixArray',  JSON.stringify(this.state.matrixArray));
    }
    ResetGame = () =>{
        this.createStartArrays();

        this.setState({
            shapeMove:[{id:1,piece:3,type:0}],
        });
        localStorage.setItem('startArray',  JSON.stringify(this.state.baseStartArray));
        localStorage.setItem('matrixArray',  JSON.stringify(this.state.baseMatrix));

        this.createStartArrays();
    }
    render(){
        return(
            <div className="checkerboardMain">
                <div className="checkerboard">
                    {this.state.matrixArray.map((number) =>
                        <div className="boardRow">{number.map((a) =>
                            <div>{a.cell === 0 ? 
                                <div className="blackcels">
                                    {a.id === this.state.cellMove.idleft ? <div className="movecell" onClick={this.moveCell.bind(this, a.id)}></div>: <div></div> }
                                    {a.id === this.state.cellMove.idrighr ? <div className="movecell" onClick={this.moveCell.bind(this, a.id)}></div>: <div></div> }

                                    {a.piece === 2 ? <div className={this.state.circletop} onClick={this.movetToShape.bind(this,a.id,a.piece)}></div>:<div></div> } 
                                    {a.piece === 3 ? <div className={this.state.circletdown} onClick={this.movetToShape.bind(this,a.id,a.piece)}></div>:<div></div> } 
                                    {a.piece === 4 ? <div id="circlepurple" className={this.state.circletdown} onClick={this.movetToShape.bind(this,a.id)}></div>:<div></div> } 
                                </div> 
                                : 
                                <div className="whitecels">
                                    {a.id === this.state.cellMove.idleft ? <div className="movecell" onClick={this.moveCell.bind(this, a.id)}></div>: <div></div> }
                                    {a.id === this.state.cellMove.idrighr ? <div className="movecell" onClick={this.moveCell.bind(this, a.id)}></div>: <div></div> }

                                    {a.piece === 2 ? <div className={this.state.circletop} onClick={this.movetToShape.bind(this,a.id,a.piece)}></div>:<div></div> } 
                                    {a.piece === 3 ? <div className={this.state.circletdown} onClick={this.movetToShape.bind(this,a.id,a.piece)}></div>:<div></div> } 
                                    {a.piece === 4 ? <div id="circlepurple" className={this.state.circletdown} onClick={this.movetToShape.bind(this,a.id)}></div>:<div></div> } 
                                </div>}
                            </div>
                        )}</div>
                    )}
                </div>
                <div className="change_button_block">
                    <div className="ChangeCollor">
                        <p>Change color</p>   
                        <span>Black</span>
                        <input type="radio"  value="circlecolorred" checked={this.state.color === "circlecolorred"} onChange={this.handleChange} /><br/>
                        <span>Red</span>
                        <input type="radio" value="circlecolorblack" checked={this.state.color === "circlecolorblack"} onChange={this.handleChange}/>
                    </div>
                    <div className="ChangeShape">
                        <p>Change shape</p>
                        <span>Circle</span>
                        <input type="radio" value="circle" checked={this.state.shape === "circle"} onChange={this.handleChangeShape}/><br/>
                        <span>Cube</span>
                        <input type="radio" value="cube" checked={this.state.shape === "cube"} onChange={this.handleChangeShape}/>
                    </div>
                    <div className="buttons">
                        <div onClick={this.saveGame}>Save Game</div>
                        <div onClick={this.ResetGame}>Reset Game</div>
                    </div>
                </div>

            </div>
        )
    }

}
export default Checkeredboard;