import { petSay } from "../stores/petStore";
import { invoke } from "@tauri-apps/api/tauri";
import type { Plugin } from "../../types";

interface MusicInfo {
    title: string;
    artist: string;
    album_title: string;
    album_artist: string;
    track_number: number;
}

interface MusicPlugin extends Plugin {
    contentIndex: number;
    startInterval: () => void;
    stopInterval: () => void;
    interval: number | null | undefined;
}

const musicPlugin: MusicPlugin = {
    name: "musicPlugin",
    interval: null,
    contentIndex: 0,

    async init() {
        console.log("Music Plugin Initialized");
    },

    start() {
        this.startInterval();
    },

    stop() {
        this.stopInterval();
    },

    startInterval() {
        this.interval = setInterval(async () => {
            try {
                const musicInfo = await invoke<MusicInfo>("music_g");
                const say = "是" + musicInfo.artist + "的" + musicInfo.title + "呢喵";
                petSay.set(say);
            } catch (error) {
                console.error("Failed to fetch music info:", error);
            }
        }, 1000); // 每秒更新一次内容
    },

    stopInterval() {
        clearInterval(this.interval as number);
    },
};

export default musicPlugin;