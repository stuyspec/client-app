import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import injectSheet from 'react-jss';

import { fetch } from '../actions';
import { getCondensedArticles } from '../selectors';

const styles = {
}

const HomePage = ({ classes, sections, articles }) => {
	const createSectionListItems = () => {
		return Object.keys(sections).map(function(key) {
		   return (
				<li key={ sections[key].id }>
					<Link to={ sections[key].slug }>{ sections[key].name }</Link>
				</li>
			)
		});
	}
	return (
		<div>
			<h1>Home page</h1>
			<ul>
				{ createSectionListItems() }
			</ul>
		</div>
	)
}

const mapStateToProps = (state) => ({
    articles: getCondensedArticles(state),
    sections: state.core.entities.sections,
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators({fetch: fetch}, dispatch)
} 

export default connect(
	mapStateToProps, 
	mapDispatchToProps
)( injectSheet(styles)(HomePage) );