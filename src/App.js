import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

//some mui components;
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import Input from 'muicss/lib/react/input';



class App extends Component {
    constructor(props){
        super(props)

       
        //for keep objects from call
        this.arr=[],
        //for updating
        this.up=[];
        //state for updating & fetching
        this.state = {
            pictures:[],
            load:0,
            update:[],
            inputValue:''
        }
        //to bind other mbmers on code;
        this.loader=this.loader.bind(this);
        this.handleOnChange=this.handleOnChange.bind(this);
    }

componentDidMount(){
      //lifecycle 1
      // fetching data & mounting the first 9 members

    fetch(`https://randomuser.me/api/?results=50&nat=US`)
      .then(results=>{ return results.json()})
      .then(data=>{
           //arr to care all 50 members
           this.arr.push(data.results);

                //up for updating arr 
                for(var i=0 ;i <= 8; i++){
                  this.up.push(this.arr[0][i])
                }

            // fetch template for the state;
            let ftch1=this.up.map((pack)=>{

              var picURL=""; 
                if (pack.gender=="male") {
                  picURL="img/male.png"
                }else{
                  picURL="img/female.png"
                }

                return(                 
                  <div key={pack.email} className="card">           
                    <img className="profilePic" src={pack.picture.medium} /> 
                    <br />
                    <img className="genderPic" src={picURL} />
                    <h5 className="profileTitle"> {pack.name.first + " " + pack.name.last } </h5>  
                    <code className="emailText">{pack.email}</code>
                  </div> 
              )
              
            })
            //setting the new state;
             this.setState({ pictures:ftch1,load:this.up.length,up:this.up}) 
         })
        
}
//function for load more pictures from data arr;
loader(){
      //for loop for update 
      /*
      this.up-update array;
      */
      for(var i=this.state.load ;i <= (this.state.load+8); i++){
          if ( i > (this.arr[0].length-1)) {
            break;
          }
          else{this.up.push(this.arr[0][i])} 
      }

      //updating the fetch;
      let ftch1=this.up.map((pack)=>{ 
        //detecting gender pic;
        var picURL=""; 
                if (pack.gender=="male") {
                  picURL="img/male.png"
                }else{
                  picURL="img/female.png"
                }  
            //return to render;
              return(                 
                <div key={pack.email} className="card">           
                  <img className="profilePic" src={pack.picture.medium} /> 
                  <br />
                  <img className="genderPic" src={picURL} />
                   <h5 className="profileTitle"> {pack.name.first + " " + pack.name.last } </h5>  
                   <code className="emailText">{pack.email}</code>
                </div> 
              )
            })
        //set a new state;
      this.setState({ pictures:ftch1,load:this.up.length,up:this.up})  
}

handleOnChange(e) {
   // console.log(evt.target.value);
   var typedValue= e.target.value;

   //search all h5 tags to array;
   var cardAmount= document.getElementsByTagName("h5");

        //start scan the array (if input change)
        for (var str=0 ; str < cardAmount.length ; str++ ){
              //if input is not empty,start to check include;
            if ( typedValue != ""){
              //if h5 (in card) include the input text then...
                  if((cardAmount[str].innerHTML).includes(typedValue)){
                    // paint the card in yellow;
                  cardAmount[str].parentElement.style.background="yellow";
                  }
                  else{ 
                    //if not paint the card with original color;
                    cardAmount[str].parentElement.style.background="ghostwhite";
                  }
                //if input is empty,paint the card with original color;
              }else{
                cardAmount[str].parentElement.style.background="ghostwhite";
              }
        }
}

render() {
   return (
      <div className="App">
        <Input className="searchBar" value={this.state.value}
         onChange={evt =>this.handleOnChange(evt)}
          placeholder="Search" />

        <div className="container">
        { this.state.pictures}
        <br />
         <button className="loadButton" onClick={this.loader}>Load More Contacts</button>
        </div>

      </div>
    );
  }
}




export default App;
