<script lang="ts">
  import LottieFox from "./lib/LottieFox.svelte";
  import Fox from "./lib/Fox.json";
  import Cat from "./lib/Cat.json";
  import games from "../src-tauri/data/plugin.json";

  import { onMount } from "svelte";
  import { petSay } from "./lib/stores/petStore";
  import type { Plugin } from "./types";
  import {
    plugins,
    registerPlugin,
    startPlugin,
    stopPlugin,
  } from "./lib/stores/plugin";
  import Meow from "./lib/plugins/Meow";
  import Timer from "./lib/plugins/Timer";

  let content: string = "";
  let message: string = "";
  let showContent: boolean = true;
  petSay.subscribe((value) => {
    content = value;
  });
  let plist: Plugin[] = [];
  let intervalId: number;

  onMount(() => {
    // registerPlugin(Timer);
    // plugins.subscribe((pluginList) => {
    //   plist = pluginList;
    //   console.log(plist);
    //   pluginList.forEach((plugin) => {
    //     plugin.init();
    //   });
    // });
    // startPlugin(Timer.name);
    // setRandomInterval();
    // const now = new Date();
    // const hours = now.getHours();
    // const minutes = now.getMinutes();
    // const seconds = now.getSeconds();
    // const time = `${hours}:${minutes}:${seconds}`;
    // message = `已经${time}了,该睡觉了喵`;
    // // 每秒更新一次时间
    // setInterval(() => {
    //   const now = new Date();
    //   const hours = now.getHours();
    //   const minutes = now.getMinutes();
    //   const seconds = now.getSeconds();
    //   const time = `${hours}:${minutes}:${seconds}`;
    //   message = `已经${time}了,该睡觉了喵`;
    // }, 1000);
    // return () => {
    //   stopPlugins();
    //   clearTimeout(intervalId);
    //   console.log(plist);
    // };
  });
</script>

<main class="container" id="app" data-tauri-drag-region>
  <div class="content-container">
    <div class="chat-container">
      {#if showContent}
        <div class="chat">{content}</div>
      {/if}
    </div>

    <div class="animation-container">
      <LottieFox />
    </div>
  </div>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
  }
  :global(body) {
    background-color: transparent;
  }

  :global(#app) {
    background-color: transparent;
  }
  .chat {
    margin-bottom: 20px;
    font-size: 1.2rem;
    background-color: rgba(255, 255, 255, 0.8);
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    user-select: none;
  }
  .chat-container {
    width: 200px;
    height: 100px;
  }
  .animation-container {
    cursor: pointer;
  }
  .container {
    display: flex;
    flex-direction: coludn;
    justify-content: center;
    align-items: center;
    height: 90vh;
  }
  .content-container {
    display: flex;
    flex-direction: column; /* 垂直排列子元素 */
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
</style>
