<script lang="ts">
  import { onMount } from "svelte";
  import lottie from "lottie-web";
  import * as rive from "@rive-app/canvas";
  // export let animationData;

  // let animationContainer;

  onMount(() => {
    // const animation = lottie.loadAnimation({
    //   container: animationContainer,
    //   renderer: "svg",
    //   loop: true,
    //   autoplay: true,
    //   animationData: animationData,
    // });

    // animation.addEventListener("DOMLoaded", () => {
    //   // 添加data-tauri-drag-region属性到所有SVG子元素
    //   const svgElement = animationContainer.querySelector("svg");
    //   if (svgElement) {
    //     const childElements = svgElement.querySelectorAll("*");
    //     childElements.forEach((child) => {
    //       child.setAttribute("data-tauri-drag-region", "true");
    //     });
    //   }

    const r = new rive.Rive({
      src: "/src/lib/bouncy_cat.riv",
      canvas: document.getElementById("canvas") as HTMLCanvasElement,
      autoplay: true,
      // fit: "contain",
      stateMachines: "State Machine 1",

      onload: (rive) => {
        r.resizeDrawingSurfaceToCanvas();
        // 添加 data-tauri-drag-region 属性到所有 Canvas 子元素
        const canvasElement = document.getElementById("canvas");
        if (canvasElement) {
          const childElements = canvasElement.querySelectorAll("*");
          childElements.forEach((child) => {
            child.setAttribute("data-tauri-drag-region", "true");
          });
        }
      },
      onStateChange: (event) => {
        console.log("State changed:", event);
        // 你可以在这里处理状态机转换的逻辑
      },
    });
  });
  // return () => {
  //   animation.destroy();
  // };
  // });
</script>

<!-- 
<div
  bind:this={animationContainer}
  class="fox_con"
  data-tauri-drag-region
></div> -->
<canvas id="canvas" class="fox_con" data-tauri-drag-region></canvas>

<style scoped>
  canvas {
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 添加轻微阴影 */
  }
  .fox_con {
    width: auto;
    height: auto;
    position: relative;
    overflow: hidden;
  }
</style>
