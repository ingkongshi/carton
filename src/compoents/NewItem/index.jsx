import './index.less';
import '../../static/css/font1/iconfont.css'
import Time from '../time/index.jsx'
import {
  HashRouter as Router,
  Route,
  Link,
  NavLink,
  Switch
} from 'react-router-dom'
export default class NewItem extends React.Component{
	render(){
		return <div className="new-item" >
			<Link to={"/show/"+this.props.id.replace(/\//g,'-')}>
			
				<h3>{this.props.title}</h3>
				<div className="imgList">
					{this.props.thumbnailList.map((v,i,arr)=>{
						if(arr.length>1){
							return <img style={{backgroundImage:"url("+v+")"}} key={v}/>
						}else{
							return <img style={{backgroundImage:"url("+v+")",paddingTop:'75%',height:"auto"}} key={v} />
						}
						
					})}	
				</div>
				<Time time={this.props.time} />
			</Link>
		</div>
	}
}
