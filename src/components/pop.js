import React, { Component } from "react";
import '../styles/pop.css';

class Pop extends Component{
	constructor(props){
		super(props);
		this.closePop = this.closePop.bind(this);
	}
	
	closePop(){
		const closeButton = document.querySelector('.close-button');
		const pop = document.querySelector('.pop');

		pop.style.display='none';

	}

	render(){		
		return (
			<section class="pop">
				<div class="modal-window">
					<div class="close-button" onClick={this.closePop}>
						<div>
        					<div class="leftright"></div>
        					<div class="rightleft"></div>
    					</div>
					</div>
					<div class="pop-window-pokemon">
						<div class="pop-pokemon">
							<div class="pop-info-img">
								<img src={this.props.curPokemon.img} alt="foto"/>
							</div>
							<div class="pop-info">
								<h4>Effect: </h4>
								{this.props.curPokemon.effect_entries.map((item)=>{
									if(item.language.name == "en") {
									return (<p>{item.effect}</p>)
									}
								})}
							</div>
						</div>
					</div>
				</div>
			</section>
		)
	}
}

export default Pop;