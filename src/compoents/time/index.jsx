import './index.less'
class Time extends React.Component{
	render(){
		return <div className="time">
					<span className="iconfont">&#xe627;</span>{this.props.time}
				</div>
	}
	
}

export default Time;