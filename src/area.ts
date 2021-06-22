// const AREA_DATA =  require('china-area-data')
import AREA_DATA  from 'china-area-data'
import { isString } from './utils'

export type areaInfo = {
	provinceCode: string,
	cityCode: string,
	areaCode: string,
	province: string,
	city: string,
	area: string,
	address: string
}

const countryCode = '86'

export const calculateArea = function (areaCode: string): areaInfo | boolean {
	if (!isString(areaCode) || !/^[0,9]{6}/.test(areaCode)) {
		return false
	}
	const provinceCode = areaCode.slice(0, 2) + '0000'
	const cityCode = areaCode.slice(2, 4) + '00'

	let province = ''
	let city = ''
	let area = ''

	if (isKeyInData(countryCode, provinceCode)) {
		province = AREA_DATA[countryCode][provinceCode]
	} else {
		return false
	}
	if (isKeyInData(provinceCode, cityCode)) {
		city = AREA_DATA[provinceCode][cityCode]
	} else {
		return false
	}
	if (isKeyInData(cityCode, areaCode)) {
		area = AREA_DATA[cityCode][areaCode]
	} else {
		return false
	}

	return {
		provinceCode,
		province,
		cityCode,
		city,
		areaCode,
		area,
		address: province + city + area
	}
}

const isKeyInData = function (key1, key2) {
	return (typeof AREA_DATA[key1] !== 'undefined' && typeof AREA_DATA[key1][key2] !== 'undefined')
}
