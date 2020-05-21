import React, { Component } from 'react';

class Checkeredboard extends Component{
    constructor(props){
        super(props);
        this.state ={
            startArray:[],
            midArray:[],
            matrixArray:[],
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
            circletop:'circle circlecolorred',
            circletdown:'circle  circlecolorblack',
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
        let i = 0;
        // finalArray.map((a)=>{

           // console.log(a);

        //     if(i <= 8 ){
            let matrixArray = [];
            let midArray = [];
            for(let i = 0; i < finalArray.length; i++){

                //console.log(finalArray[i])
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

            // this.setState({
            //     matrixArray:[...this.state.matrixArray, finalArray]
            // });

      
        //     }else{
                // this.setState({
                //     midArray:[...this.state.midArray, a]
                // });
               
            // }
            // i++;

        // });



    }
    movetToShape = (id) =>{

        console.log(id);
        const itemsst = this.state.value;
        const item = itemsst.find(item => item.id === id);
        console.log(item);
        const itemIndex = itemsst.indexOf(item);

        // this.state.value.map((array) => {
        //     const itemsst = array;
        //     const item = itemsst.find(item => item.id === id);
        //     const itemIndex = itemsst.indexOf(item);
        //     if(typeof item !== 'undefined'){
        //         console.log(itemsst[itemIndex]['piece']);
        //         itemsst[itemIndex]['piece'] = 0;
        //         console.log(itemsst);
        //         // this.setState({
        //         //     value: itemsst
        //         // }); 
        //     }

        //     //const itemsst = this.state.value;
        //     // const item = array.find(item => item.id === id);
        //     // console.log(item);
        //     // const itemIndex = array.indexOf(item);

        //     // console.log(array[itemIndex]['piece'] );

        //     // array[itemIndex]['piece'] = 0;
        //     // this.setState({
        //     //     value: array
        //     // }); 
        // });



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
                    {this.state.matrixArray.map((number) =>
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