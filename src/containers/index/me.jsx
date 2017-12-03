import IndexHeader from '../../compoents/indexHeader/index.jsx';
import './me.less';
import '../../static/css/font1/iconfont.css'
import {Link} from 'react-router-dom';
export default class Me extends React.Component{
	render(){
		return <div>
			<IndexHeader  title="我的"/>
			<div className="myself">
				<div className="me">
					<img src="./images/1.png" />
				</div>
				<p>&nbsp;&nbsp;Hello</p>
			</div>
			<FavList />
		</div>
	}

}
class FavList extends React.Component{
	render(){
		return <div className="fav-list">
			<div className="fav">
				<span className="iconfont">&#xe600;</span>我的收藏
			</div>
			<Link to="/me"><div className="iconfont you">&#xe634;</div></Link>
		</div>
	}
}
