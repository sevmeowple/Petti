<script lang="ts">
  import LottieFox from "./lib/LottieFox.svelte";
  import Fox from "./lib/Fox.json";
  import Cat from "./lib/Cat.json";

  import { WebviewWindow } from "@tauri-apps/api/window";
  import { onMount } from "svelte";
  import petSay from "./lib/stores/petStore";
  import type { Plugin } from "./types";
  import {
    plugins,
    registerPlugin,
    startPlugins,
    stopPlugins,
  } from "./lib/plugin";
  import Meow from "./lib/plugins/Meow";

  const webview = new WebviewWindow("config_window", {
    url: "http://localhost:3000/config.html",
  });
  let content: string = "";
  let message: string = "";
  let showContent: boolean = true;
  petSay.subscribe((value) => {
    content = value;
  });
  let plist: Plugin[] = [];
  let intervalId: number;

  // function updateContent() {
  //   petSay.set(content); // 触发 petSay 更新
  //   showContent = !showContent; // 切换 showContent 状态
  // }

  // function setRandomInterval() {
  //   const randomTime = Math.floor(Math.random() * 5000) + 1000; // 随机时间间隔 1-6 秒
  //   intervalId = setTimeout(() => {
  //     updateContent();
  //     setRandomInterval();
  //   }, randomTime);
  // }

  onMount(() => {
    registerPlugin(Meow);
    plugins.subscribe((pluginList) => {
      plist = pluginList;
      console.log(plist);
      pluginList.forEach((plugin) => {
        plugin.init();
      });
    });
    startPlugins();
    // setRandomInterval();
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const time = `${hours}:${minutes}:${seconds}`;
    message = `已经${time}了,该睡觉了喵`;
    // 每秒更新一次时间
    setInterval(() => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      const time = `${hours}:${minutes}:${seconds}`;
      message = `已经${time}了,该睡觉了喵`;
    }, 1000);
    return () => {
      stopPlugins();
      clearTimeout(intervalId);
      console.log(plist);
    };
  });
</script>

<main class="container" id="app" data-tauri-drag-region>
  <div class="chat-container">
    {#if showContent}
      <div class="chat">{message}</div>
    {/if}
  </div>

  <div class="animation-container">
    <LottieFox />
  </div>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    /* height: 100vh; */
    overflow: hidden;
  }
  :global(body) {
    background-color: transparent;
  }

  :global(#app) {
    background-color: transparent;
  }
  /* 圆角边框 */
  .chat {
    margin-bottom: 20px;
    font-size: 1.2rem;
    background-color: rgba(255, 255, 255, 0.8); /* 半透明背景 */
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 添加轻微阴影 */
    user-select: none; /* 禁止选中文本 */
  }
  /* 固定 chat 容器的位置 */
  .chat-container {
    position: fixed;
    /* bottom: 100px; */
    top: 175px;
    left: 50px; /* 将 chat 容器移得更靠左 */
    width: 200px; /* 固定宽度 */
    height: 100px; /* 固定高度 */
  }
  /* 固定动画容器的位置 */
  .animation-container {
    position: fixed;
    bottom: 10px;
    right: 5px; /* 将 animation 容器移到右侧 */
    cursor: pointer; /* 添加鼠标指针样式 */
  }
  /* 列队齐 */
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>
