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
interface MeowPlugin extends Plugin {
  contents: string[];
  contentIndex: number;
  startInterval: () => void;
  stopInterval: () => void;
  interval: number | null | undefined;
}

const meowPlugin: MeowPlugin = {
  name: "meowPlugin",
  interval: null,
  contents: ["你好，喵喵在这里！", "多来看看我哦", "吃什么好呢喵"],
  contentIndex: 0,

  async init() {
    console.log("Meow Plugin Initialized");
  },

  start() {
    this.startInterval();
  },

  stop() {
    this.stopInterval();
  },

  startInterval() {
    this.interval = setInterval(() => {
      petSay.set(this.contents[this.contentIndex]);
      this.contentIndex = (this.contentIndex + 1) % this.contents.length;
    }, 2000); // 每2秒更新一次内容
    console.log(petSay);
  },

  stopInterval() {
    // @ts-ignore
    clearInterval(this.interval);
  },
};
export default meowPlugin;
