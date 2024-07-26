<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { readTextFile, writeFile, BaseDirectory } from "@tauri-apps/api/fs";
  import ConfigBox from "./ConfigBox.svelte";
  import { petBackGround } from "../lib/stores/themes";
  import { status } from "../lib/stores/petStore";
  let showconfig = false;
  let riveFileSelected = false;
  let chatMessages: string[] = ["请先选择一个Rive文件。"];

  let canvas: HTMLCanvasElement;
  let bgColor: string;

  const unsubscribe = petBackGround.subscribe((value) => {
    bgColor = value;
    if (canvas) {
      canvas.style.backgroundColor = bgColor;
    }
  });

  async function addLog(message: string) {
    const timestamp = new Date().toLocaleTimeString();
    const logMessage = `[${timestamp}] ${message}\n`;
    console.log(logMessage);

    try {
      const existingLogs = await readTextFile("app.log", {
        dir: BaseDirectory.App,
      });
      const updatedLogs = existingLogs + logMessage;

      await writeFile(
        {
          path: "app.log",
          contents: updatedLogs,
        },
        { dir: BaseDirectory.App }
      );
    } catch (error) {
      if (
        error &&
        typeof error.message === "string" &&
        error.message.includes("No such file or directory")
      ) {
        try {
          await writeFile(
            {
              path: "app.log",
              contents: logMessage,
            },
            { dir: BaseDirectory.App }
          );
        } catch (writeError) {
          console.error("Failed to write log:", writeError);
        }
      } else {
        console.error("Failed to write log:", error);
      }
    }
  }

  async function loadRiveAnimation(assetUrl: string) {
    try {
      await addLog("Loading Rive animation...");
      const rive = await import("@rive-app/canvas");
      const r = new rive.Rive({
        src: assetUrl,
        canvas: document.getElementById("canvas") as HTMLCanvasElement,
        autoplay: true,
        stateMachines: "State Machine 1",
        onload: (rive) => {
          addLog("Rive animation loaded.");
          r.resizeDrawingSurfaceToCanvas();
          const canvasElement = document.getElementById("canvas");
          if (canvasElement) {
            const childElements = canvasElement.querySelectorAll("*");
            childElements.forEach((child) => {
              child.setAttribute("data-tauri-drag-region", "true");
            });
          }
        },
        onStateChange: (event) => {
          if (
            Array.isArray(event.data) &&
            event.data.length > 0 &&
            typeof event.data[0] === "string"
          ) {
            status.set(event.data[0]);
          }
          // addLog(`State changed: ${event}`);
          // console.log(event);
        },
      });
    } catch (error) {
      await addLog(`Error loading Rive animation: ${error}`);
    }
  }

  function toggleConfigBox() {
    showconfig = !showconfig;
  }

  onMount(() => {
    addLog("Component mounted.");
    const canvasElement = document.getElementById("canvas");
    if (canvasElement) {
      canvasElement.addEventListener("dblclick", toggleConfigBox);
    }
  });

  onDestroy(() => {
    addLog("Component destroyed.");
    const canvasElement = document.getElementById("canvas");
    if (canvasElement) {
      canvasElement.removeEventListener("dblclick", toggleConfigBox);
    }
    unsubscribe();
  });
</script>

<div class="can_box">
  <canvas
    bind:this={canvas}
    id="canvas"
    class="fox_con"
    data-tauri-drag-region
    style="background-color: {bgColor};"
  ></canvas>
  {#if showconfig}
    <ConfigBox
      {riveFileSelected}
      {chatMessages}
      {addLog}
      {loadRiveAnimation}
      {toggleConfigBox}
    />
  {/if}
</div>

<style scoped>
  /* 垂直对齐子元素 */
  .can_box {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: auto;
    width: auto;
  }
  canvas {
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: aliceblue;
  }
  .fox_con {
    width: auto;
    height: auto;
    position: relative;
    overflow: hidden;
  }
</style>
