import './cate.less';
import {
  HashRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import IndexHeader from '../../compoents/indexHeader/index.jsx';
import Loading from '../../compoents/loading/index.jsx';
export default class Cate extends React.Component{
	constructor(props){
		super(props);
		this.state={
			itemVal:[
				{
					img:"./images/1.png",
					color:"#C61473"
				},
				{
					img:"./images/2.png",
					color:"#DEC3C6"
				},
				{
					img:"./images/3.png",
					color:"#C69A6B"
				},
				{
					img:"./images/4.png",
					color:"#BD5D18"
				},
				{
					img:"./images/5.png",
					color:"#F7E3F7"
				},
				{
					img:"./images/6.png",
					color:"#3951A5"
				},
				{
					img:"./images/7.png",
					color:"#6B499C"
				},
				{
					img:"./images/8.png",
					color:"#212C73"
				},
				{
					img:"./images/9.png",
					color:"#216D84"
				},
				{
					img:"./images/10.png",
					color:"#5265B5"
				},
			],
			cates:[],
			loading:true
		}
	}
	render(){
		return <div className="container cate-box">
		<IndexHeader  title="分类"/>
			{this.state.loading?<Loading />:null}
			{this.state.cates.map((v,i)=>{
				 return <Item key={v.catid} image={this.state.itemVal[i].img} catid={v.catid} catname={v.catname} colors={this.state.itemVal[i].color}/>
			})}
		</div>
	}
	componentDidMount(){
		fetch("api.php?type=category").then((res)=>{
			return res.json()
		}).then((data)=>{
			this.setState({
				cates:data.categorys,
				loading:false
			})

		})
	}

}
class Item extends React.Component{
	render(){
		return <div className="item-box" style={{'backgroundImage':'url('+this.props.image+')'}}>
			<Link to={`/list/${this.props.catid}/${this.props.catname}`} className="item" style={{color:this.props.colors}}>
				<span>{this.props.catname}</span>
			</Link>
		</div>
	}
}
