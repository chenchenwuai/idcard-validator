# idcard-validator
简单的18位身份证校验器（因省市区数据文件过大，去掉了校验省市区逻辑）

## 使用方法

### 安装
```bash
npm i idcard-validator -S
```

### 引入
```javascript
import { calculateIDCard, isValid, calculateCode } from 'idcard-validator-china'

const valid = isValid('101010202106225426') // 此身份证号为随机编造，无真实意义
```

## API

### calculateIDCard
获取身份证的信息，合法的身份证返回一个对象，否则返回 `false`
```javascript
const obj =calculateIDCard('101010202106225426')
console.log(obj)
// {
// 	year:2021, // 出生年份
// 	month:6,   // 出生月份
// 	date:22,   // 出生日期
// 	sex:1,     // 性别 1男 2女
// 	code:6     // 身份证校验码, 身份证最后一位
// }
```
### isValid
检验身份证号码是否正确的格式，返回 `true` 或 `false`
```javascript
const valid =isValid('101010202106225426')
console.log(valid) // false
```

### calculateCode
计算传入身份证号的最后一位字符 返回 `0~9` 或 `X`,字符串格式
```javascript
// 可以传17位或18位字符串
const code =calculateCode('10101020210622542X')
console.log(code) // X
```
