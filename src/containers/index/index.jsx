import {
  HashRouter as Router,
  Route,
  Link,
  NavLink,
  Switch
} from 'react-router-dom';
import './index.less';
import Cate  from './cate.jsx';
import Home  from './home.jsx';
import Me  from './me.jsx';
import '../../static/css/font/iconfont.css'
import IndexHeader from '../../compoents/indexHeader/index.jsx';
class Index extends React.Component{
	constructor(props){
		super(props);
		this.state ={
			headerTitle:"爆笑漫画"
		}
	}
	render(){
		return <div className="container">
		
		<div className="container">
			<Router>
				<Switch>
					<Route path="/cate" component={Cate} />
					<Route path="/mes" component={Me} />
					<Route path="/" component={Home} />
				</Switch>
			</Router>
		</div>
		<div className="nav-box">
			<NavLink exact className="link" activeClassName="active" to="/" >
				<span className="iconfont icon">&#xe631;</span>
				<span className="text">首页</span>				
			</NavLink>
			<NavLink activeClassName="active" to="/cate" className="link" >
				<span className="iconfont icon">&#xe7f9;</span>
				<span className="text">分类</span>
			</NavLink>
			<NavLink activeClassName="active" to="/mes" className="link" >
				<span className="iconfont icon">&#xe622;</span>
				<span className="text">我的</span>
			</NavLink>
		</div>
	</div>
	}

}
export default Index;
