import Vue from 'vue'
import Vuex from 'vuex'

import team from './modules/team'
import league from './modules/league'

Vue.use(Vuex)

export default function createStore(){
	return new Vuex.Store({
		//state,
		//actions,
		//mutations,
		//getters
		modules: {
			team,
			league
		}
	})
}