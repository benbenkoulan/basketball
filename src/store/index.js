import Vue from 'vue'
import Vuex from 'vuex'

import league from './modules/league'

Vue.use(Vuex)

export default function createStore(){
	return new Vuex.Store({
		//state,
		//actions,
		//mutations,
		//getters
		modules: {
			league
		}
	})
}