import { Injectable } from "@nestjs/common";
const redis = require("redis");
import { RedisService } from "@liaoliaots/nestjs-redis";

@Injectable()
export class RedisCacheService {
    private client;
    constructor(private redisService: RedisService) {
        this.getClient();
    }

    callBackList = [];
    private async getClient() {
        this.client = await this.redisService.getClient();
        this.client.on("message", (channel, message) => {
            const item = this.callBackList.find((it) => it.channel == channel);
            item.callBack && item.callBack(message);
        });
    }
    subscribe(channel: string, callBack) {
        this.client.subscribe(channel);
        const item = { channel, callBack };
        this.callBackList.push(item);
    }

    publish(channel: string, message: string) {
        this.client.publish(channel, message);
    }

    /**
     * 设置redis
     * @param key key值
     * @param value value值
     * @param expire 过期时间，单位:秒
     */
    setValue(key: string, value: any, expire?: number) {
        //this.client.set(key, value)
        //if (expire) {
        //    this.client.expire(key, expire);
        //}
        if (typeof value === "string") {
            this.client.set(key, value);
            if (expire) {
                this.client.expire(key, expire);
            }
        } else if (typeof value === "object") {
            this.client.set(key, JSON.stringify(value));
            if (expire) {
                this.client.expire(key, expire);
            }
        }
    }

    /**
     * 设置redis哈希值
     * @param key key值
     * @param value value值
     * @param expire 过期时间，单位:秒
     */
    setHashValue(key: string, value: any, expire?: number) {
        if (typeof value === "object") {
            for (const item in value) {
                this.client.hmset(key, item, value[item], redis.print);
            }
            if (expire) {
                this.client.expire(key, expire);
            }
        }
    }

    /**
     * 获取redis(string)信息
     * @param key key
     * @param isparse 是否格式化
     * @returns
     */
    async getValue(key: string, isparse?: boolean) {
        return new Promise((resolve, reject) => {
            this.client.get(key, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    if (isparse) res = JSON.parse(res);
                    resolve(res);
                }
            });
        });
    }
    /**
     * 获取多个redis值
     * @param key 多个key值
     */
    async mgetValue(key: string) {
        return new Promise((resolve, reject) => {
            this.client.mget(key, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        });
    }
    /**
     * 删除键值
     * @param key key值
     */
    async removeKey(key: string) {
        return new Promise((resolve, reject) => {
            this.client.del(key, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        });
    }

    async getKeys(key: string) {
        return new Promise((resolve, reject) => {
            this.client.keys(key, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        });
    }

    /**
     * 获取数量
     * @param key 键
     */
    async llen(key: string) {
        return new Promise((resolve, reject) => {
            this.client.llen(key, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        });
    }

    /**
     * 哈希列表添加值
     * @param key 键
     * @param value 值
     * @param expire 过期时间，单位:秒
     */
    async lpush(key: string, value: any, expire?: number) {
        this.client.lpush(key, value);
        if (expire) {
            this.client.expire(key, expire);
        }
    }

    // 获取hash
    /**
     * 获取HashSet值
     * @param key 键值
     */
    async getHashValue(key) {
        return new Promise((resolve, reject) => {
            this.client.hgetall(key, function (err, value) {
                if (err) {
                    reject(err);
                } else {
                    resolve(value);
                }
            });
        });
    }

    /**
     * 获取过期时间
     * @param key 键
     */
    async ttl(key) {
        return new Promise((resolve, reject) => {
            this.client.ttl(key, function (err, value) {
                if (err) {
                    reject(err);
                } else {
                    resolve(value);
                }
            });
        });
    }

    /**
     * 获取哈希列表
     * @param key 键
     * @param start 开始
     * @param end 结束
     */
    async getList(key, start, end) {
        return new Promise((resolve, reject) => {
            this.client.lrange(key, start, end, function (err, value) {
                if (err) {
                    reject(err);
                } else {
                    resolve(value);
                }
            });
        });
    }
}
