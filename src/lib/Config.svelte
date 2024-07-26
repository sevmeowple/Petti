<script lang="ts">
  import Meow from "../lib/plugins/Meow";
  import Timer from "../lib/plugins/Timer";
  import Momo from "../lib/plugins/Momo";
  import { onMount } from "svelte";
  import {
    registerPlugin,
    startPlugin,
    stopPlugin,
    plugins,
  } from "../lib/stores/plugin";
  import type { Plugin } from "../types";
  import Config_Theme from "./components/Config_Theme.svelte";
  import { status } from "../lib/stores/petStore";
  //  列出列表让用户选择是否启用插件
  let plist: Set<Plugin> = new Set();
  let activeTab = "plugins";
  onMount(() => {
    let status_now;
    registerPlugin(Timer);
    registerPlugin(Meow);
    registerPlugin(Momo);
    plugins.subscribe((pluginList) => {
      plist = pluginList;
      pluginList.forEach((plugin) => {
        plugin.init();
      });
    });
    // 订阅状态
    status.subscribe((value) => {
      status_now = value;
      console.log(status_now);
      // console.log(Momo.enabled);
      // Momo.
      // console.log("Momo is enabled");
      Momo.everyPing(status_now);
    });
  });

  function togglePlugin(plugin: Plugin) {
    if (plugin.enabled) {
      stopPlugin(plugin.name);
    } else {
      startPlugin(plugin.name);
    }
  }

  function setActiveTab(tab) {
    activeTab = tab;
  }
</script>

<div class="config_box">
  <h1>配置管理</h1>
  <div class="tabs">
    <button
      class:active={activeTab === "plugins"}
      on:click={() => setActiveTab("plugins")}>插件管理</button
    >
    <button
      class:active={activeTab === "theme"}
      on:click={() => setActiveTab("theme")}>主题配置</button
    >
  </div>
  {#if activeTab === "plugins"}
    <div>
      {#each Array.from(plist) as plugin}
        <div class="plugin-item">
          <div>{plugin.name}</div>
          <label class="switch">
            <input
              type="checkbox"
              checked={plugin.enabled}
              on:change={() => togglePlugin(plugin)}
            />
            <span class="slider round"></span>
          </label>
        </div>
      {/each}
    </div>
  {:else if activeTab === "theme"}
    <Config_Theme />
  {/if}
</div>

<style>
  .config_box {
    width: 100%;
    height: 500px;
    background-color: #f0f0f0;
    margin-left: 10px;
  }
  .tabs {
    display: flex;
    margin-bottom: 20px;
  }
  .tabs button {
    flex: 1;
    padding: 10px;
    cursor: pointer;
    background-color: #e0e0e0;
    border: none;
    outline: none;
    transition: background-color 0.3s;
  }
  .tabs button.active {
    background-color: #007bff;
    color: white;
  }
  .plugin-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px 0;
  }
  .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
  }
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: 0.4s;
    border-radius: 34px;
  }
  .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
  input:checked + .slider {
    background-color: #007bff;
  }
  input:checked + .slider:before {
    transform: translateX(26px);
  }
</style>
