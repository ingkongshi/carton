import IndexHeader from '../../compoents/indexHeader/index.jsx';
import "./index.less";
import NewItem from '../../compoents/NewItem/index.jsx'
import Loading from '../../compoents/loading/index.jsx';
class List extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			page:1,
			lists:[],
			loading:'加载中....',
			loadings:true
		}
	}
	render(){
		var catname = this.props.match.params.catname;
		return <div className="container-title">
					<IndexHeader title={catname} back="true"/>
					<ListTitle title={catname} />
			<div>
				{this.state.lists.map((v,i)=>{
					return <NewItem key={i} {...v}/>
				})}

			</div>
			{this.state.loadings?<Loading />:null}
			<div className="loading" onClick={this.handleClick.bind(this)}>{this.state.loading}</div>
		</div>
	}
	handleClick(){
		var page = this.state.page+1;
		this.setState(
			{
				page:page,
				loading:'加载中...',
				loadings:true
			}
		)
		this.getLists.call(this,page);
	}
	getLists(page){
		var id=this.props.match.params.id;
		console.log(id)
		id = id.replace(/\-/g,'/');
		fetch("api.php?type=list&catid="+id+"&page="+page).then((res)=>{
			return res.json()
		}).then((data)=>{
			var lists = data['showapi_res_body']['pagebean']['contentlist'];
			this.setState({
				lists:lists,
				loading:'加载完成',
				loadings:false
			})
		})
	}
	componentDidMount(){
		this.getLists.call(this,this.state.page);
	}
}
function ListTitle(props){
	return <div className="listtitle">
				<span className="title">{props.title}</span>
		</div>
}
export default List;
