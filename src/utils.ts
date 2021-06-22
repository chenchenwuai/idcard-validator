/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const isType = function (obj: any, type: string): boolean {
	return Object.prototype.toString.call(obj) === '[object ' + type + ']'
}

export const isObject = function (val: any): boolean {
	return isType(val, 'Object')
}

export const isString = function (val: string): boolean {
	return isType(val, 'String')
}

export const isFunction = function (val: any): boolean {
	return isType(val, 'Function')
}

export const isNumber = function (val: any): boolean {
	return isType(val, 'Number')
}

export const isLeapYear = function (year) {
	return isNumber(year) && (year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0))
}
