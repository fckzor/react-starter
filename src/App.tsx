import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Home } from './pages/Home/Home'
import { Auth } from './pages/Auth/Auth'
import { NotFound } from './pages/NotFound/NotFound'

export default function App() {
	return (
		<>
			<Router>
				<main>
					<div className="container">
						<Switch>
							<Route exact path="/" component={Home} />
							<Route exact path="/auth" component={Auth} />
							<Route component={NotFound} />
						</Switch>
					</div>
				</main>
			</Router>
		</>
	)
}
