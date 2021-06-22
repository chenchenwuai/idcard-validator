export declare type areaInfo = {
    provinceCode: string;
    cityCode: string;
    areaCode: string;
    province: string;
    city: string;
    area: string;
    address: string;
};
export declare const calculateArea: (areaCode: string) => areaInfo | boolean;
