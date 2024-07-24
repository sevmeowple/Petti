/*
 * @Author: Qmm 1259598502@qq.com
 * @Date: 2024-07-24 15:52:25
 * @LastEditors: Qmm 1259598502@qq.com
 * @LastEditTime: 2024-07-24 16:35:17
 * @FilePath: \Apps\Petti\Petti\src\lib\plugin.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { writable } from "svelte/store";
import type { Plugin } from "../types";

export const plugins = writable<Plugin[]>([]);

// 注册插件函数，使用 Plugin 类型
export function registerPlugin(plugin: Plugin) {
  plugins.update((currentPlugins) => [...currentPlugins, plugin]);
}

// 启动所有插件
export function startPlugins() {
  plugins.update((currentPlugins) => {
    currentPlugins.forEach((plugin) => plugin.start && plugin.start());
    return currentPlugins;
  });
}

// 停止所有插件
export function stopPlugins() {
  plugins.update((currentPlugins) => {
    currentPlugins.forEach((plugin) => plugin.stop && plugin.stop());
    return currentPlugins;
  });
}
