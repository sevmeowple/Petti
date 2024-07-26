<script lang="ts">
  import { onMount } from 'svelte';
  import { petBackGround, alpha, alwaysOnTop } from "../stores/themes";
  import { invoke } from '@tauri-apps/api/tauri';

  let color = '#ffffff';
  let alphaValue = 1.0;
  let isAlwaysOnTop = false;

  onMount(() => {
    petBackGround.subscribe(value => {
      color = value.slice(0, 7); // 提取颜色部分
    });

    alpha.subscribe(value => {
      alphaValue = value;
    });

    alwaysOnTop.subscribe(value => {
      isAlwaysOnTop = value;
    });
  });

  function handleColorChange(event) {
    color = event.target.value;
    updateBackground();
  }

  function handleAlphaChange(event) {
    alpha.set(event.target.value);
    updateBackground();
  }

  function updateBackground() {
    alpha.subscribe(value => {
      const rgbaColor = `${color}${Math.floor(value * 255).toString(16).padStart(2, '0')}`;
      petBackGround.set(rgbaColor);
    });
  }

  function toggleAlwaysOnTop() {
    alwaysOnTop.update(value => {
      const newValue = !value;
      invoke('set_always_on_top', { alwaysOnTop: newValue });
      return newValue;
    });
  }
</script>

<div class="box">
  <h1>主题配置</h1>
  <p>Pet背景颜色设置</p>
  <input type="color" on:input={handleColorChange} value={color} />
  <p>透明度设置</p>
  <input type="range" min="0" max="1" step="0.01" on:input={handleAlphaChange} value={alphaValue} />
  <p>窗口置顶</p>
  <button on:click={toggleAlwaysOnTop}>
    {#if isAlwaysOnTop}
      取消置顶
    {:else}
      设置置顶
    {/if}
  </button>
</div>

<style>
  .box {
    width: 100%;
    height: 100%;
    background-color: #f0f0f0;
    margin-left: 10px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
  }

  h1 {
    font-size: 24px;
    margin-bottom: 10px;
  }

  p {
    font-size: 16px;
    margin-bottom: 10px;
  }

  input[type="color"] {
    width: 50px;
    height: 50px;
    border: none;
    cursor: pointer;
    border-radius: 50%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    transition: box-shadow 0.3s ease;
  }

  input[type="color"]::-webkit-color-swatch-wrapper {
    padding: 0;
    border-radius: 50%;
  }

  input[type="color"]::-webkit-color-swatch {
    border: none;
    border-radius: 50%;
  }

  input[type="color"]:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }

  input[type="color"]:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(100, 149, 237, 0.5);
  }

  input[type="range"] {
    width: 100%;
    margin-top: 10px;
  }

  button {
    margin-top: 10px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    background-color: #007bff;
    color: white;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: #0056b3;
  }
</style>