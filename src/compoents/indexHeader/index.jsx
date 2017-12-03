import './index.less';
import '../../static/css/font1/iconfont.css'
export default class IndexHeader extends React.Component{
	handleClick(){
		history.back();
	}
	render(){
		return <div className="header-box">
		{this.props.back?<span className="iconfont icon" onClick={this.handleClick}>&#xe680;</span>:null}
			<span className="title">{this.props.title}</span>
			{this.props.back?<span className="icon"></span>:null}
		</div>
	}
}
IndexHeader.defaultProps={
	back:false
}
