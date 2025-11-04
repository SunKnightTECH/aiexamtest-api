import { Guid } from "guid-typescript";
import * as _ from "lodash";
import * as dayjs from "dayjs";

export function getip(req): string {
    let ip = "";
    if (req.headers["x-forwarded-for"]) {
        ip = req.headers["x-forwarded-for"];
    } else if (req.headers["x-real-ip"]) {
        ip = req.headers["x-real-ip"];
    } else if (req.headers["remote_addr"] && req.headers["client_ip"]) {
        ip = req.headers["client_ip"];
    } else if (req.headers["remote_addr"]) {
        ip = req.headers["remote_addr"];
    } else if (req.headers["client_ip"]) {
        ip = req.headers["client_ip"];
    } else {
        ip = "0.0.0.0";
    }
    return ip;
}
/**
 * 检查是否是guid
 * @param testID
 */
export function isGuid(guid: string): boolean {
    const reg = new RegExp(/^[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}$/i);
    return reg.test(guid);
}
/**
 * 获取随机数
 * @param len 随机数长度
 */
export function getfnd(len: number) {
    let rnd = "";
    for (let i = 0; i < len; i++) rnd += Math.floor(Math.random() * 10);
    return rnd;
}
/**
 * 检查字符串是否是json对象
 * @param str json字符串
 */
export function isJson(str: string) {
    let json: any = null;
    try {
        if (typeof JSON.parse(str) == "object") {
            json = JSON.parse(str);
            return json;
        }
    } catch (e) {}
    return json;
}
/**
 * 检查是否是url链接
 * @param url ulr链接
 */
export function isValidURL(url: string): boolean {
    const urlRegExp = /^((https|http|ftp|rtsp|mms)?:\/\/)+[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/;
    if (urlRegExp.test(url)) {
        return true;
    } else {
        return false;
    }
}
/**
 * 是否是数字
 * @param val 字符串
 */
export function isIntNum(val: string): boolean {
    const regPos = /^\d+(\.\d+)?$/; //非负浮点数
    const regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
    if (regPos.test(val) || regNeg.test(val)) {
        return true;
    } else {
        return false;
    }
}
/**
 * 是否是日期
 * @param val 字符串
 */
export function isDate(str) {
    if (str) {
        const b = dayjs(str);
        return b.isValid();
    } else {
        return true;
    }
}
/**
 * 是否是时间
 * @param val 字符串
 */
export function isDateTime(str): boolean {
    if (str) {
        const b = dayjs(str);
        return b.isValid();
        //let result = str.match(/^(\d{4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/);
        //if (result == null) return false;
        //let d = new Date(result[1], result[3] - 1, result[4], result[5], result[6], result[7]);
        //return (d.getFullYear() == result[1] && (d.getMonth() + 1) == result[3] && d.getDate() == result[4] && d.getHours() == result[5] && d.getMinutes() == result[6] && d.getSeconds() == result[7]);
    } else {
        return true;
    }
}
/**
 * 是否是邮箱
 * @param str
 */
export function isEmail(str): boolean {
    const result = str.match(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/);
    if (result == null) return false;
    return true;
}
export function randomSort() {
    return Math.random() > 0.5 ? -1 : 1;
}
/**
 * 生成UUID
 * */
export function createUUID() {
    return Guid.create().toString();
}
/**
 * 判断字符串是否为空或undefined,不判断为0,不判断为false
 * @param str
 * @returns {boolean}
 */
export function isEmptyObj(str: any) {
    if (str) {
        const s = JSON.stringify(str);
        return s == "{}" || s == "[]";
    }
    return true;
}

export function encryptphone(phone: string) {
    if (phone) {
        phone = phone.replace(/(?<=\d{3})\d{5}(?=\d{2})/, "*****");
    }
    return phone;
}

export function getRandomCustomerId(customerId: string) {
    const targetList = ["10000000-1000-1000-1000-100000000000"];
    if (targetList.indexOf(customerId) > -1) {
        let id = "10000000-1000-1000-1000-100000000";
        const num = _.random(1, 100).toString();
        if (num.length == 1) {
            id = id + "00" + num;
        }
        if (num.length == 2) {
            id = id + "0" + num;
        }
        if (num.length == 3) {
            id = id + num;
        }
        return id;
    } else {
        return customerId;
    }
}

/**我的金币 */
type myCoin = {
    /**总数 */
    coinCount: number;
    /**金币名称 */
    coinStr: string;
    /**金币 */
    gold: number;
    /**银币 */
    silver: number;
    /**铜币 */
    copper: number;
};
export const getCoinCount = (coinCount: number): myCoin => {
    const gold = ~~(coinCount / 10000);
    const silver = ~~((coinCount - gold * 10000) / 100);
    const copper = coinCount - gold * 10000 - silver * 100;
    let coinStr = "";
    if (gold) coinStr = gold + "金币";
    if (silver) coinStr += silver + "银币";
    if (copper) coinStr += copper + "铜币";
    const reord: myCoin = {
        coinCount,
        coinStr,
        gold,
        silver,
        copper,
    };
    return reord;
};
export function findValuesByKey(obj, targetKey) {
    const results = [];
    function recursiveSearch(obj) {
        if (Array.isArray(obj)) {
            obj.forEach((item) => recursiveSearch(item));
        } else if (typeof obj === "object" && obj !== null) {
            Object.keys(obj).forEach((key) => {
                if (key === targetKey) {
                    results.push(obj[key]);
                }
                recursiveSearch(obj[key]);
            });
        }
    }

    recursiveSearch(obj);
    return results;
}

export function largeNumberModulus(numStr: string, mod: number) {
    let remainder = 0;
    for (const char of numStr) {
        remainder = (remainder * 10 + parseInt(char)) % mod;
    }
    return remainder;
}

export const validateCardNum = (number: string) => {
    if (!number) return false;
    const digits = number.replace(/\D/g, ""); // 移除所有非数字字符
    if (digits.length !== 16) return false;
    let sum = 0;
    let shouldDouble = false;

    // 从右向左遍历数字
    for (let i = digits.length - 1; i >= 0; i--) {
        let digit = parseInt(digits.charAt(i), 10);

        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }

        sum += digit;
        shouldDouble = !shouldDouble;
    }

    return sum % 10 === 0;
};

export const createTransactionID = () => {
    // 生成订单流水号
    const now = dayjs();
    const dateStr = now.format("YYYYMMDDHHmmss");
    const randomNum = Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, "0");
    return `T${dateStr}${randomNum}`;
};
