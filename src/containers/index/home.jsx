import IndexHeader from '../../compoents/indexHeader/index.jsx';
import {Link} from "react-router-dom";
import ReactSwipe from 'react-swipe';
import NewItem from "../../compoents/newItem/index.jsx"
import './home.less'
import Loading from '../../compoents/loading/index.jsx';
export default class Home extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			wheelImgs:['images/w1.jpg','images/w2.jpg','images/w3.jpg'],
			datas: [],
			loading:true
		}
	}
	render(){
		return <div className="container-bottom">
			<IndexHeader title="首页"/>
			<Carousel wheelImgs={this.state.wheelImgs}></Carousel>
			{this.state.loading?<Loading />:null}
			{this.state.datas.map((v,i)=>{
				return <HomeCateList {...v} key={i}/>
			})}
		</div>

	}
	componentDidMount(){
		fetch("api.php?type=category").then((res)=>{
			return res.json()
		}).then((data)=>{
			this.setState({
				datas:data.categorys,
				loading:false
			})

		})
	}

}
class Carousel extends React.Component {
    render() {
        return (
            <ReactSwipe className="carousel" swipeOptions={{continuous: false}}>
                   {this.props.wheelImgs.map((v,i)=>{
                	return <img src={require('./'+v)} key={i}/>
                })}
            </ReactSwipe>

        );
    }
}
class HomeCateList extends React.Component{
	constructor(props){
		super(props);
		this.state ={
			lists:[]
		}
	}

	render(){

		return <div className="home-cate-list">
			<div className="cate-list-title">
				<h4>
					<span className="line"></span>{this.props.catname}
				</h4>
				<Link to={`/list/${this.props.catid}/${this.props.catname}`} className="more">
					更多
				</Link>
			</div>
			<div className="cate-list">
				{this.state.lists.map((v,i)=>{
					return <NewItem key={i} {...v}/>
				})}
			</div>
		</div>

	}
	componentDidMount(){
		var id=this.props.catid;
		id = id.replace(/\-/g,'/');
		fetch("api.php?type=list&catid="+id+"&page=1").then((res)=>{
			return res.json()
		}).then((data)=>{
			var lists = (data['showapi_res_body']['pagebean']['contentlist']).slice(0,5);
			this.setState({
				lists:lists,

			})

		})
	}
}
