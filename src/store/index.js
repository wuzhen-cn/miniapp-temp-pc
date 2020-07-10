import Vue from 'vue'
import Vuex from 'vuex'
import util from '@/utils/util'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		user: {
			USER_NAME: 'ZHANG_SAN',
			CARD_NO: '1234567899'
		},
		formId: '',
		baseInfo: {},
		busiInfo: {},
		materials: [],
		mateInfo: [],
		postInfo: {}
	},
	mutations: {
		setUser(state, val) {
			state.user = val
		},
		setFormId(state, val) {
			state.formId = val
		},
		setBaseInfo(state, val) {
			state.baseInfo = val
		},
		setBusiInfo(state, val) {
			state.busiInfo = val
		},
		setMaterialsInfo(state, val) {
			state.materials = val
		},
		setMateInfo(state, val) {
			state.mateInfo = val
		},
		setPostInfo(state, val) {
			state.postInfo = val
		},
		resetForm(state) {
			state.formId = ''
			state.baseInfo = {}
			state.busiInfo = {}
			state.materials = []
			state.postInfo = {}
		}
	},
	actions: {
		commitFormData() {
			let form = {
				baseData: util.stringify(this.state.baseInfo),
				busiData: util.stringify(this.state.busiInfo),
				mateData: util.stringify(util.formatMaterials(this.state.materials)),
				postData: util.stringify(this.state.postInfo)
			}
			let method = 'add'
			if (this.state.formId) {
				method = 'update'
				form.id = this.state.formId
			}
			return this._vm.$ns.post(`api-data/${method}`, form)
				.then((res) => {
					if (res.success && res.data) {
						this.state.formId = res.data
						return true
					} else {
						return false
					}
				})
				.catch((res) => {
					console.error(res)
					this._vm.$message.error('网络错误')
				})
		}
	},
	modules: {
	}
})

export default store
