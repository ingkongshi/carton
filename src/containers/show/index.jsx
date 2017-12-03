import './index.less'
import Time from '../../compoents/time/index.jsx'
import IndexHeader from '../../compoents/indexHeader/index.jsx';
import '../../static/css/font1/iconfont.css'
class Show extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			item:{}
		}
	}
	render(){
		console.log(this.state.item)
		return <div className="container-title" style={{background:'#fff'}}>
			<IndexHeader title="正文" back="true"/>
			<article className="content">
				<h4>{this.state.item.title}</h4>
				<div className="bottom">
					<Time  time={this.state.item.time}/>
					<Favorite item={this.state.item} match={this.props.match}/>
				</div>
				<div className="img-list">
					{this.state.item.imgList?this.state.item.imgList.map((v,i)=>{
						return <img src={v} key={v} />
					}):null}
				</div>
			</article>
		</div>
	}
	componentDidMount(){
		var id = this.props.match.params.id.replace(/\-/g,'/');
//		console.log(id)
		fetch("api.php?type=show&id="+id).then((res)=>{
			return res.json()
		}).then((data)=>{
			this.setState({
				item:data['showapi_res_body'].item,
			})
		})
	}
}
class Favorite extends React.Component{

	handleSave(){
		var saveArr = JSON.parse(localStorage.getItem("save")||"[]");
		var flag = true;
		saveArr.forEach((v,i)=>{
			if(v.title==this.props.item.title){
				flag= false;
			}
		})
		if(flag){
			saveArr.push({"title":this.props.item.title,state:true,id:this.props.match.params.id});
			console.log(saveArr)
			localStorage.save=JSON.stringify(saveArr);
			alert("收藏成功")
		}else{
			alert("已收藏")
		}

	}
	render(){
		return <div className="favorite" onClick={this.handleSave.bind(this)}>
			<span className="iconfont">&#xe6dc;</span>收藏
		</div>
	}
}
export default Show;
