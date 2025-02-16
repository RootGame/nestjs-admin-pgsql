import { ElMessage } from 'element-plus'
export function useTemplate(hiprintTemplate) {
	/* 编辑模板 */
	const jsonShow = ref(false)
	const jsonContent = ref('')
	const jsonLoading = ref(false)
	async function editTemplate() {
		jsonShow.value = true
		jsonLoading.value = true
		let json = tidMode.value
			? hiprintTemplate.getJsonTid()
			: hiprintTemplate.getJson()
		jsonContent.value = JSON.stringify(json, null, beautify.value)
		await nextTick()
		jsonLoading.value = false
	}
	/* 编辑模板确定 */
	function editConfirm() {
		try {
			hiprintTemplate.update(JSON.parse(jsonContent.value))
			jsonShow.value = false
		} catch (e) {
			ElMessage.error('更新失败：' + e)
		}
	}
	/* 预览模板 */
	const preViewShow = ref(false)
	async function preView(printData) {
		preViewShow.value = true
		console.log(hiprintTemplate)
		await nextTick()
		$('#preview_content_design').html(hiprintTemplate.getHtml(printData))
	}

	/* 美化模版 */
	const tidMode = ref(false)
	const beautify = ref(0)
	function onModeChange() {
		editTemplate()
	}
	return {
		jsonLoading,
		jsonShow,
		jsonContent,
		editTemplate,
		editConfirm,
		preViewShow,
		preView,
		tidMode,
		beautify,
		onModeChange,
	}
}
