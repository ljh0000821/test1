module.exports = {
    root: true,
    env: {
        node: true
    },
    "parserOptions": {
        "ecmaVersion": 12,
        "parser": "@typescript-eslint/parser",
        "sourceType": "module"
    },
    plugins: ["vue", "@typescript-eslint"],
    "extends": [
        "plugin:vue/essential",
        "eslint:recommended"
    ],
    "globals": {
        document: true,
        window: true,
        uni: true,
        AMap:true,
        wx:true,
        jWeixin:true
    },
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
        "semi": 2,//语句强制分号结尾
        "no-const-assign": 2, //禁止修改const声明的变量
        "no-dupe-keys": 2, //在创建对象字面量时不允许键重复 {a:1,a:1}
        "no-dupe-args": 2, //函数参数不能重复
        "no-duplicate-case": 2, //switch中的case标签不能重复
        "no-extra-semi": 2, //禁止多余的冒号
        "no-floating-decimal": 2, //禁止省略浮点数中的0 .5 3.
        "no-func-assign": 2, //禁止重复的函数声明
        "no-mixed-spaces-and-tabs": [2, false], //禁止混用tab和空格
        "no-multi-spaces": 2, //不能用多余的空格
        "no-var": 2, //禁用var，用let和const代替
        "brace-style": [2, "1tbs"], //大括号风格
        // "camelcase": 2, //强制驼峰法命名
        "quotes": [1, "double"],//引号类型 `` "" ''
        "space-in-parens": 2, // 强制在圆括号内使用一致的空格
        "space-infix-ops": 2, // 要求操作符周围有空格
    },
    // parserOptions: {
    //     parser: 'babel-eslint'
    // }
};