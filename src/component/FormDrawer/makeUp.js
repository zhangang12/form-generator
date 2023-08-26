
import buildHtml from './builder/buildHtml'
import buildJs from './builder/buildJs'
import buildCss from './builder/buildCss'

let  ctx = null

function makeGlobel({ fields, formRule }, proxy){
	ctx = {}
	ctx.proxy = proxy
	ctx.$t = proxy.$t
	ctx.maxSpan = fields.reduce((pre, next) => {
		const { span } = next.__config__
		if(span != 24){ ctx.someSpanIsNot24 = true }
		if(span > pre){ pre = span }
		return pre
	}, 0)
	ctx.formRule = formRule
}

export default function(formData, codeTypeData, proxy){
	makeGlobel(formData, proxy)
	let result = {
		html: buildHtml.apply(ctx, [formData, codeTypeData.type]),
		js: buildJs.apply(ctx, [formData, codeTypeData.type]),
		css: buildCss.apply(ctx, [formData])
	}
	ctx = null
	return result
}
