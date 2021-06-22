/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const babel = require('rollup-plugin-babel')
import typescript from 'typescript'
import commonjs from 'rollup-plugin-commonjs'
import json from '@rollup/plugin-json'
import typescript2 from 'rollup-plugin-typescript2'
import filesize from 'rollup-plugin-filesize'
const pkg = require('./package.json')

const resolve = function (...args) {
	return path.resolve(__dirname, ...args)
}
const extensions = ['.js', '.ts']

const banner =
`/*!
 *  idcard-validator v${pkg.version}
 *  (c) 2020-${new Date().getFullYear()} chenwuai
 * Released under the MIT License.
 */`

export default {
	input: resolve('./src/index.ts'),

	plugins: [
		typescript2({
			exclude: 'node_modules/**',
			useTsconfigDeclarationDir: true,
			typescript,
			tsconfig: './tsconfig.json'
		}),
		babel({
			exclude: 'node_modules/**',
			extensions
		}),
		filesize(),
		commonjs(),
		json()
	],

	output: [
		{
			format: 'cjs',
			// 生成的文件名和路径
			// package.json的main字段, 也就是模块的入口文件
			file: pkg.main,
			banner
		},
		{
			format: 'es',
			// rollup和webpack识别的入口文件, 如果没有该字段, 那么会去读取main字段
			file: pkg.module,
			banner
		},
		{
			format: 'umd',
			name: 'IDCardValidator',
			file: pkg.browser,
			banner,
			sourcemap: true
		},
		{
			file: 'lib/idcard-validator-iife.js',
			format: 'iife',
			name: 'IDCardValidator'
		}
	]
}
