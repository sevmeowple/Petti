<script lang="ts">
  import Config_Plugin from "./lib/components/Config_Plugin.svelte";
  import Config_Theme from "./lib/components/Config_Theme.svelte";
  import { onMount } from "svelte";
  // import Database from "tauri-plugin-sql-api";
  onMount(async () => {});
  let showwhich: number = 0;
</script>

<!-- layout 布局 -->

<div class="container">
  <!-- 侧边栏区域 -->
  <div class="sidebar">
    <button on:click={() => (showwhich = 0)} class="tab">插件管理</button>
    <button on:click={() => (showwhich = 1)} class="tab">主题配置</button>
  </div>
  <!-- 主体区域 -->
  <div class="main">
    {#if showwhich === 0}
      <Config_Plugin />
    {/if}
    {#if showwhich === 1}
      <Config_Theme />
    {/if}
  </div>
</div>

<style>
  /* 现代感觉 */
  .tab {
    width: 100%;
    height: 50px;
    background-color: #f0f0f0;
    border: none;
    cursor: pointer;
    font-size: 15px;
    /* 加个线 */
    border-bottom: 1px solid #e0e0e0;
  }
  .tab:hover {
    background-color: #e0e0e0;
  }
  /* 水平队齐,最左边是sidebar,main在右边 */
  .container {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: stretch;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
  }
  /* 左对齐 */
  .sidebar {
    width: 15%;
    height: 100%;
    background-color: #f0f0f0;
    overflow: hidden;
    /* 加个线区分一下 */
    border-right: 1px solid #e0e0e0;
  }
  .main {
    width: 92%;
    height: 100%;
    background-color: #f0f0f0;
    overflow: hidden;
  }
</style>
