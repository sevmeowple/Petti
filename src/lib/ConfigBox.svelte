<!-- ConfigBox.svelte -->
<script lang="ts">
    import { open } from "@tauri-apps/api/dialog";
    import { readTextFile, writeFile, BaseDirectory } from "@tauri-apps/api/fs";
    import { convertFileSrc } from "@tauri-apps/api/tauri";
    import Config from "./Config.svelte";
    export let riveFileSelected: boolean = false;
    export let chatMessages: string[] = ["请先选择一个Rive文件。"];
    export let addLog: (message: string) => Promise<void>;
    export let loadRiveAnimation: (assetUrl: string) => Promise<void>;
    export let toggleConfigBox: () => void;
  
    async function openFile() {
      try {
        await addLog("Opening file dialog...");
        const selectedFile = await open({
          multiple: false,
          filters: [
            {
              name: "Rive Files",
              extensions: ["riv"],
            },
          ],
        });
  
        if (typeof selectedFile === "string") {
          await addLog(`Selected file: ${selectedFile}`);
          const assetUrl = convertFileSrc(selectedFile);
          await addLog(`Asset URL: ${assetUrl}`);
          await loadRiveAnimation(assetUrl);
          riveFileSelected = true;
          chatMessages.push("Rive文件已加载成功！");
        } else {
          await addLog("No file selected.");
        }
      } catch (error) {
        await addLog(`Error opening file: ${error}`);
        chatMessages.push("打开文件时出错，请重试。");
      }
    }
  </script>
  
  <div class="config_box">
    <button class="close_button" on:click={toggleConfigBox}>关闭</button>
    <button id="openFileButton" on:click={openFile}>Open Rive File</button>
    <Config></Config>
  </div>
  
  <style scoped>
    .config_box {
      height: 100vh;
      width: 85vw;
      position: relative;
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 10px; /* 添加圆角 */
      background-color: #f9f9f9;
      overflow-y: auto; /* 允许竖直滑动 */
    }
    .config_box button {
      margin: 10px 0;
      padding: 10px 20px;
      font-size: 16px;
      cursor: pointer;
      background-color: #007bff;
      color: #fff;
      border: none;
      border-radius: 5px;
      transition: background-color 0.3s ease;
    }
    .config_box button:hover {
      background-color: #0056b3;
    }
    .close_button {
      position: absolute;
      top: 10px;
      right: 10px;
      background-color: #dc3545;
    }
    .close_button:hover {
      background-color: #c82333;
    }
    /* 自定义滚动条样式 */
    .config_box::-webkit-scrollbar {
      width: 12px;
    }
    .config_box::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 10px;
    }
    .config_box::-webkit-scrollbar-thumb {
      background: #888;
      border-radius: 10px;
    }
    .config_box::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
  </style>