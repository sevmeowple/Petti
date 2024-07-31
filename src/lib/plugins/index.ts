const pluginList: any[] = [];

// 使用 Vite 的 import.meta.glob 动态导入所有插件
const modules = import.meta.glob('./*.ts', { eager: true });

for (const path in modules) {
    if (path !== './index.ts') {
        const module = modules[path];
        const plugin = module.default;
        pluginList.push(plugin);
    }
}

export default pluginList;