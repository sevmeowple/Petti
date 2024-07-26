<script lang="ts">
  // 获取pluginstore
  import { plugins } from "../stores/plugin";
  import type { Plugin } from "../../types";
  import { onMount } from "svelte";
  import { show } from "@tauri-apps/api/app";
  let pluginL: Plugin[] = [];
  // 获取插件列表
  onMount(() => {
    plugins.subscribe((pluginList) => {
      console.log(pluginList);
      pluginL = pluginList;
    });
  });
  function showPlugin() {
    console.log(pluginL);
  }
</script>

<div class="box">
  <h1>插件管理</h1>
  <div>
    {#each pluginL as plugin}
      <div>{plugin.name}</div>
    {/each}
  </div>
  <button on:click={showPlugin}> showPlugin</button>
</div>

<style>
  .box {
    width: 100%;
    height: 100%;
    background-color: #f0f0f0;
    margin-left: 10px;
  }
</style>
