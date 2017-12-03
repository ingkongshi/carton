import IndexHeader from '../../compoents/indexHeader/index.jsx';
import './index.less'
import {
	Link,
	HashRouter as Router,
	Route,
} from "react-router-dom";
class Fav extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			save:JSON.parse(localStorage.getItem("save")||"[]")
		}
	}
	render(){
		console.log(this.state.save)
		var saveArr = this.state.save;
//		console.log(saveArr)
		return <div className="fav-box">
			<IndexHeader  title="收藏" back="true"/>
			{this.state.save.map((v,i)=>{
				return <FavItem {...v} key={i}/>
			})}
		</div>
	}
}

class FavItem extends React.Component{
	delet(e){
		var saveArr = JSON.parse(localStorage.getItem('save'));
		saveArr.map(function(v,i){
			if(e.target.parentNode.firstElementChild.innerHTML==v.title){
				saveArr.splice(i,1);
				localStorage.setItem('save',JSON.stringify(saveArr)||'[]')
				var box = e.target.parentNode.parentNode;
				box.removeChild(e.target.parentNode)
			}
		})

	}
	render(){
		return <div className="container-title">
			<div className="fav-list">
				<Link to={`/show/${this.props.id}`} className="fav-aa">{this.props.title}</Link>
				<span onClick={this.delet.bind(this)} className="fav-del">删除</span>
			</div>
		</div>
	}
}
export default Fav;
