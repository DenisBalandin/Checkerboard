import React, { Component } from 'react';

class Checkeredboard extends Component{
    constructor(props){
        super(props);
        this.state ={
            permArray:[],
            startArray:[],
            matrixArray:[],
            circletop:'circle circlecolorred',
            circletdown:'circle circlecolorblack',
            color: '',
            shape:'',
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
    //    console.log(JSON.parse(localStorage.getItem('saveGame')));
     ///   if(this.state.newGame === 0){

            // localStorage.setItem('saveGame',  JSON.stringify(finalArray));
      //  }else{
            this.setState({
                startArray:finalArray
            });
      //  } 
    //    this.setState({
    //     startArray:JSON.parse(localStorage.getItem('saveGame')),
    // });
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
            matrixArray:matrixArray
        });
        if(this.state.newGame === 0){

            // for(let i =0 ; i < 9; i++){
            //     console.log(localStorage.getItem('matrixArray'));
            // }

            // JSON.parse(localStorage.getItem('matrixArray')).map((a)=>{
            //     console.log(a);
            // //                 this.setState({
            // //     matrixArray:[...this.state.matrixArray,a]
            // //     // startArray:JSON.parse(localStorage.getItem('startArray')),
            // // });
            // });

            matrixArray.map((a)=>{
                console.log(a);
            //                 this.setState({
            //     matrixArray:[...this.state.matrixArray,a]
            //     // startArray:JSON.parse(localStorage.getItem('startArray')),
            // });
            });

        


            // this.setState({
            //     matrixArray:this.state.permArray,
            //     newGame:1
            //     // startArray:JSON.parse(localStorage.getItem('startArray')),
            // });


        }else{

        }
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
      
        //const itemIndex = itemsst.indexOf(item);

    }
    movetToShape = (id, type) =>{
        console.log('Game',this.state.newGame);

        if(type === this.state.nextPlayer){
            if(id !== this.state.shapeMove.id ){
                console.log(id);
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
        // localStorage.setItem('startArray',  JSON.stringify(this.state.startArray));
        localStorage.setItem('matrixArray',  JSON.stringify(this.state.matrixArray));
        console.log(this.state.startArray);
    }
    LoadGame = () =>{
        this.setState({
            matrixArray:JSON.parse(localStorage.getItem('matrixArray')),
            // startArray:JSON.parse(localStorage.getItem('startArray')),
        });
        console.log(this.state);
    }
    render(){
         console.log(this.state);
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
                    <div onClick={this.saveGame}>Save Game</div>
                    <div onClick={this.LoadGame}>Load Game</div>
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