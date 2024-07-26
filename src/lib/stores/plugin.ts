import { writable } from "svelte/store";
import type { Plugin } from "../../types";

export const plugins = writable<Set<Plugin>>(new Set());

// 注册插件函数，使用 Plugin 类型
export function registerPlugin(plugin: Plugin) {
  plugins.update((currentPlugins) => {
    // 检查插件是否已经存在
    const pluginExists = [...currentPlugins].some(p => p.name === plugin.name);
    if (!pluginExists) {
      // 初始化 enabled 属性
      const pluginWithEnabled = { ...plugin, enabled: plugin.enabled ?? false };
      currentPlugins.add(pluginWithEnabled);
    }
    return new Set(currentPlugins); // 返回新的 Set 实例
  });
}

// 启动指定插件
export function startPlugin(pluginName: string) {
  plugins.update((currentPlugins) => {
    const updatedPlugins = new Set(currentPlugins); // 创建新的 Set 实例
    updatedPlugins.forEach((plugin) => {
      if (plugin.name === pluginName && plugin.start) {
        plugin.start();
        plugin.enabled = true; // 启动时设置 enabled 为 true
      }
    });
    return updatedPlugins; // 返回新的 Set 实例
  });
}

// 停止指定插件
export function stopPlugin(pluginName: string) {
  plugins.update((currentPlugins) => {
    const updatedPlugins = new Set(currentPlugins); // 创建新的 Set 实例
    updatedPlugins.forEach((plugin) => {
      if (plugin.name === pluginName && plugin.stop) {
        plugin.stop();
        plugin.enabled = false; // 停止时设置 enabled 为 false
      }
    });
    return updatedPlugins; // 返回新的 Set 实例
  });
}