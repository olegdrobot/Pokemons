import React, { Component } from "react";
import Pop from '../components/pop.js';
import '../styles/app.css';

class App extends Component{
	constructor(props){
	 	super(props);
		this.state = {
			listOfPokemons: [],
			listOfTags: [],
			checkedTags: [],
			quantity: 10,
			quantityChanged: true,
			pokemonIsChose: false,
			curPokemon: {
				name: "",
				url: "",
				type: "",
				img: "",
				base_experience: "",
				height: "",
				order: "",
				weight: "",
				effect: "",
				abilityURL: "",
				effect_entries: []
			},
			prevPokemon: ''
			
		} 
		this.isForward = true;
		this.prevStep = 0;
		this.step = 0;
		this.quantityPokemos;
		this.pop;
		this.clickForward = this.clickForward.bind(this);
		this.clickBack = this.clickBack.bind(this);
		this.checkTag = this.checkTag.bind(this);
		this.chosePokemon = this.chosePokemon.bind(this);
		this.addInfoToPokemon = this.addInfoToPokemon.bind(this); 
	 	this.rand = this.rand.bind(this);
	}

	clickForward(){
		this.isForward = true;
		this.rand();
	}

	clickBack() {
		this.isForward = false;
		this.rand();
	}

	checkTag(e){
		let arr = [...this.state.checkedTags];
		if(e.target.checked == true) {
			if(this.state.checkedTags.indexOf(e.target.value) == -1) {
				arr.push(e.target.value);	
			}
		} else {
			let i = arr.indexOf(e.target.value);
			arr.splice(i, 1);
		}
		this.setState({checkedTags: arr});
	}

	chosePokemon(el, item){		
		fetch(item.abilityURL)
    	.then(response => response.json())
		.then(result=>{
			item.effect_entries = [...result.effect_entries];
			this.setState({pokemonIsChose: true, curPokemon: item});
		})
		.catch(error => console.log('error', error));
		
		this.setState({pokemonIsChose: true, curPokemon: item});
		this.pop.style.display='block';
	}

	addInfoToPokemon(name, data) {
		let arr = [...this.state.listOfPokemons];
		let arrTags = [];
		arr.map((item)=>{
			if(item.name == name){
				item.type = data.types[0].type.name;
				item.img = data.sprites.front_default;
				item.base_experience = data.base_experience; 
				item.height = data.height;
				item.order = data.order;
				item.weight = data.weight;
				item.abilityURL = data.abilities[0].ability.url;
				return item;
			}
		});
		for (let i=0; i<arr.length; i++) {
			if(arrTags.indexOf(arr[i].type) == -1) arrTags.push(arr[i].type);
		}
		this.setState({listOfTags: arrTags});
		return arr;

	}

	componentDidMount(){
		this.quantityPokemos = document.querySelector('.quantity');
		this.quantityPokemos.addEventListener('change', (e)=>{
			this.setState({quantity: +e.target.value, quantityChanged: true, checkedTags: []}, ()=>{
				this.rand();
			});
			
		});
		this.pop = document.querySelector('.pop');
		this.pop.style.display='none';
		this.rand();
	}

 	rand(){ 
	this.quantityPokemos.value = this.state.quantity;	 
	if(!this.state.quantityChanged) {
		if(this.isForward) this.step += this.state.quantity
		else {
			this.step -= this.state.quantity;
			if(this.step <= 0) this.step = 0 
		}
	}
 		fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${this.state.quantity}&offset=${this.step}`)
    		.then(response => response.json())
    		.then(result => {
				let arr = result.results.map((item)=>{
					return {
						name: item.name,
						url: item.url,
						type: "",
						img: "",
						base_experience: "",
						height: "",
						order: "",
						weight: "",
						effect: "",
						abilityURL: "",
						effect_entries: []
					}
				});
				
    			this.setState({listOfPokemons: arr, 
							   quantityChanged: false}, ()=>{
					
					this.state.listOfPokemons.map((item)=>{
					fetch(item.url)
					.then(response => response.json())
					.then(result => {
						let arr = this.addInfoToPokemon(item.name, result);
						this.setState({listOfPokemons: arr});			
					})
					.catch(error => console.log('error', error));
					});
					
				});

    		})
    		.catch(error => console.log('error', error));

	}

    render(){
	
        return (
            <div class="wrapper">
                <div class="main">
					<p>
						{this.state.listOfTags.map((item)=>{
							return (<label><input type="checkbox" name="ap" value={item} onClick={this.checkTag}/>{item}</label>) 
						})}
					</p>
                	<div class="quantity"> Кол-во покемонов в таблице:
                		<select>
                			<option value="10">10</option>
                    		<option value="20">20</option>
                    		<option value="50">50</option>
                		</select>  
                	</div>
                	<div class="arrows">
                		<div class="arrow" onClick = {this.clickBack}><i class="arrow-left"></i></div>
                		<div class="arrow" onClick = {this.clickForward}><i class="arrow-right"></i></div>
                	</div>	
					<table>
						<caption >Pokemons!</caption>
            			<thead>
            				<tr>
            					<th class="name">Name</th>
            					<th class="type">Type</th>
            					<th class="avatar">Avatar</th>
            					<th >General characteristics</th>
            				</tr>
            			</thead>
            			<tbody>
							{this.state.listOfPokemons.map((item)=>{
								if(this.state.checkedTags.length == 0 || this.state.checkedTags.indexOf(item.type) != -1){
									return (
										<tr>
            								<td data-label="Name" onClick={(el)=>{this.chosePokemon(el, item)}} url={item}>{item.name}</td>
            								<td data-label="Type" onClick={(el)=>{this.chosePokemon(el, item)}} >{item.type}</td>
            								<td data-label="Avatar" onClick={(el)=>{this.chosePokemon(el, item)}} ><img src={item.img} /></td>
            								<td data-label="General characteristics" onClick={(el)=>{this.chosePokemon(el, item)}} >order: {item.order} height: {item.height} weight: {item.weight}</td>
										</tr>
									)
								}
							})}
            			</tbody>
            		</table>
                </div>
				<Pop curPokemon = {this.state.curPokemon}/>
            </div>
        );
    }
}

export default App;