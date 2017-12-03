import {
  HashRouter as Router,
  Route,
  Link,
  NavLink,
  Switch
} from 'react-router-dom';
import List from '../containers/list/index.jsx';
import Show from '../containers/show/index.jsx';
import Fav from '../containers/fav/index.jsx';
import Index from '../containers/index/index.jsx';

function Lists({match}){
	return <List match={match}/>
}
function Shows({match}){
	return <Show match={match}/>
}


const Routes = <Router>
		
		<Switch>
			<Route path="/list/:id/:catname" component={Lists} />
			<Route path="/show/:id" component={Shows} />
			<Route path="/me" component={Fav} />	
			<Route path="/" component={Index} />	
		</Switch>
	</Router>;
export default Routes;