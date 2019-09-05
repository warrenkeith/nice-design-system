import React, { Component } from "react";
// import Faker from "faker";
import { Router, Route, Link } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Checkbox } from "@nice-digital/nds-checkbox";
import { FormGroupView } from "./views/FormGroupView";
import { PageHeaderView } from "./views/PageHeaderView";
import "./App.scss";

const browserHistory = createBrowserHistory();

class App extends Component {
	render() {
		return (
			<Router history={browserHistory}>
				<nav>
					<p>
						<Link to="/formgroup">FormGroup</Link> |{" "}
						<Link to="/pageheader">Page Header</Link>
					</p>
				</nav>
				<main>
					<Route path="/formgroup" component={FormGroupView} />
					<Route path="/pageheader" component={PageHeaderView} />
				</main>
			</Router>
		);
	}
}

export default App;
