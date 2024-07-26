import { petSay } from "../stores/petStore";
import type { Plugin } from "../../types";
// 拓展PLugin接口
// 1. 添加contents属性，用于存储需要展示的内容
// 2. 添加contentIndex属性，用于记录当前展示的内容索引
// 3. 添加startInterval方法，用于启动定时器
// 4. 添加stopInterval方法，用于停止定时器
// 5. 添加interval属性，用于存储定时器的引用
// 6. 修改init方法，用于初始化插件
// 7. 修改start方法，用于启动插件
// 8. 修改stop方法，用于停止插件
// 继承覆盖Plugin接口
interface TimerPlugin extends Plugin {
    contentIndex: number;
    startInterval: () => void;
    stopInterval: () => void;
    interval: number | null | undefined;
}

const timerPlugin: TimerPlugin = {
    name: "timerPlugin",
    interval: null,
    // contents: ["你好，喵喵在这里！", "多来看看我哦", "吃什么好呢喵"],
    contentIndex: 0,

    async init() {
        console.log("Timer Plugin Initialized");
    },

    start() {
        this.startInterval();
    },

    stop() {
        this.stopInterval();
    },

    startInterval() {
        this.interval = setInterval(() => {
            const now = new Date();
            const hour = now.getHours();
            const minute = now.getMinutes();
            const second = now.getSeconds();
            const time = `${hour}:${minute}:${second}`;
            // 分不同时段显示不同内容
            // 凌晨, 早上, 中午, 下午, 晚上, 深夜
            // 给予不同的喵喵回复,学猫娘说话
            // 例如晚上`已经${time}了,该睡觉了喵`
            let say = "";
            if (hour >= 0 && hour < 6) {
                say = `深夜${time}喵,还不睡觉吗喵`;
            } else if (hour >= 6 && hour < 8) {
                say = `早上${time}喵,本喵起了你起床了吗喵`;
            } else if (hour >= 8 && hour < 12) {
                say = `上午${time}喵,今天有什么计划喵`;
            }
            else if (hour >= 12 && hour < 14) {
                say = `现在是${time}喵,有没有记得吃午饭呢喵`;
            } else if (hour >= 14 && hour < 18) {
                say = `下午${time}喵,有没有感觉活力满满喵`;
            } else if (hour >= 18 && hour < 24) {
                say = `已经${time}了喵,该睡觉了喵`;
            }

            petSay.set(say);

        }, 1000); // 每秒更新一次内容

    },

    stopInterval() {
        // @ts-ignore
        clearInterval(this.interval);
    },
};
export default timerPlugin;
