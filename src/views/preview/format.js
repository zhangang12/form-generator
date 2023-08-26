
import generate from "@babel/generator"
import * as parser from "@babel/parser"
import traverse from "@babel/traverse"

export default function(codeStr){
    let varKey = []
    let ast = parser.parse(codeStr, {sourceType:'module'})
    traverse(ast, {
        ImportDeclaration: path => {
            path.remove()
        },
        VariableDeclaration: path => {
            let _ids = path.getBindingIdentifiers()
            varKey.push(_ids)
            path.skip()
        },
        FunctionDeclaration: path => {
            let { node } = patj
            let { name } = node.id
            varKey.push({ [name]: node })
            path.skip()
        }
    })

    let formatVarKey = () => {
        let keys = []
        let keysStr = `;return {}`
        if(varKey.length){
            varKey.forEach(item => {
                keys.push(...Object.keys(item))
            })
            keysStr = `;return {${keys.join(',')}}`
        }
        return keysStr
    }
    let { code } = generate(ast)

    return `{
        setup(props, ctx){
            ${code}
            ${formatVarKey()}
        }
    }`
}