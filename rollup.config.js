import typescript from 'rollup-plugin-typescript'
const babel = require('rollup-plugin-babel')
import typescript from 'typescript'
import typescript2 from 'rollup-plugin-typescript2'
import filesize from 'rollup-plugin-filesize'
import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'

const extensions = ['.js', '.ts']

const banner =
`/*!
 *  ${pkg.name} v${pkg.version}
 *  (c) 2020-${new Date().getFullYear()} ${pkg.auther || ''}
 *  https://github.com/chenchenwuai/rollup-template.git
 * Released under the MIT License.
 */`

export default {
  input: './src/index.ts',
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
		filesize()
		// terser()
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
      // 类的名称
      name: '*',
      file: pkg.browser,
      banner,
      sourcemap: true
    },
    {
			file: 'lib/websocket-reconnect-iife.js',
			format: 'iife',
			name: 'ReconnectingWebSocket'
		}
  ]
}
