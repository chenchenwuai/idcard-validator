// import { calculateArea, areaInfo } from './area'
import { isString, isLeapYear, isNumber } from './utils'

/**
 * 18位身份证解析
 *
 * 1  至 6  位: [1-2]省份、[3-4]城市、[5-6]区县
 * 7  至 14 位: [7-10]年、[11-12]月、[13-14]日
 * 15 至 16 位: 当地派出所代码
 * 17       位: 性别,奇数男、偶数女
 * 18       位: 校检码,根据 numberRatio 和 codeMap 计算出来,可以是0~9或x
 */

const numberRatio = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2] // 身份证号码前17位数分别乘以不同的系数
const ratioValue = 11
const codeMap = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'] // 将这17位数字和系数相乘的结果相加,对ratioValue进行求余，得出身份证最后一个字符
export const idcardLength = 18

export const isValid = function (idcard: string): boolean {
	if (!isString(idcard) || !/^[0,9]{17}([0,9]|[x,X])$/.test(idcard)) {
		return false
	}
	if (idcard.length !== idcardLength) {
		return false
	}

	const isValidCode = checkCode(idcard)
	if (!isValidCode) {
		return false
	}

	const birthday = calculateBirthday(idcard)
	if (birthday === false) {
		return false
	}

	// 去掉省市区校验，打包代码太大
	// const areaCode = idcard.slice(0, 6)
	// const areaInfo = calculateArea(areaCode)
	// if (areaInfo === false) {
	// 	return false
	// }

	return true
}

export const calculateIDCard = function (idcard: string): any | boolean {
	if (!isString(idcard) || !/^[0,9]{17}([0,9]|[x,X])$/.test(idcard)) {
		return false
	}
	if (idcard.length !== idcardLength) {
		return false
	}

	const isValidCode = checkCode(idcard)
	if (!isValidCode) {
		return false
	}
	const code = idcard.substr(-1, 1)

	const birthday = calculateBirthday(idcard)
	if (birthday === false) {
		return false
	}

	// 去掉省市区数据，打包代码太大
	// const areaCode = idcard.slice(0, 6)
	// const areaInfo = calculateArea(areaCode)
	// if (areaInfo === false) {
	// 	return false
	// }

	const sexCode = idcard.substr(-2, 1)
	const sex = (Number(sexCode) % 2) ? 1 : 2

	return {
		...birthday,
		// ...areaInfo as areaInfo,
		code,
		sex
	}
}

// 计算当前身份证号的校验码
export const calculateCode = function (idcard: string): string | boolean {
	if (!isString(idcard) || !/^[0,9]{17}/.test(idcard)) {
		return false
	}
	const head17Str = idcard.slice(0, 17)
	const head17List = head17Str.split('')
	let totalCount = 0
	for (let index = 0; index < head17List.length; index++) {
		totalCount += Number(head17List[index]) * numberRatio[index]
	}
	const code = codeMap[totalCount % ratioValue]
	return code.toUpperCase()
}
// 检查校验码时候正确
const checkCode = function (idcard: string): boolean {
	let lastStr = idcard.slice(-1, 1)
	lastStr = lastStr.toUpperCase()
	const code = calculateCode(idcard)
	return code === lastStr
}

// 计算当前身份证生日数据
const calculateBirthday = function (idcard: string): any {
	if (!isString(idcard) || !/^[0,9]{14}/.test(idcard)) {
		return false
	}
	const birthday = idcard.substr(6, 8)

	const y = birthday.slice(0, 4)
	const m = birthday.slice(4, 6)
	const d = birthday.slice(6, 8)

	const year = Number(y)
	const month = Number(m)
	const date = Number(d)
	if (checkBirthday(year, month, date)) {
		return {
			year, month, date,
			birthday: `${year}-${month}-${date}`
		}
	} else {
		return false
	}
}
// 检查年月日是否正确
const checkBirthday = function (year: number, month: number, date: number): boolean {
	if (!isNumber(year) || isNumber(month) || isNumber(date)) {
		return false
	}
	if (year > new Date().getFullYear()) {
		return false
	}
	let febDaysNum = 28
	if (isLeapYear(year)) {
		febDaysNum = 29
	}

	switch (month) {
		case 1:
		case 3:
		case 5:
		case 7:
		case 8:
		case 10:
		case 12:
			return (date >= 1 && date <= 31)
			break
		case 4:
		case 6:
		case 9:
		case 11:
			return (date >= 1 && date <= 30)
			break
		case 2:
			return (date >= 1 && date <= febDaysNum)
			break
		default:
			return false
	}
}
