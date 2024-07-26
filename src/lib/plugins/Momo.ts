import { petSay } from "../stores/petStore";
import type { Plugin } from "../../types";

interface MomoPlugin extends Plugin {
    everyPing: (status: string) => void;
    stopPing: () => void;
    contentext: string[][];
    interval: number | null | undefined;
}

const momoPlugin: MomoPlugin = {
    name: "momoPlugin",
    interval: null,
    contentext: [
        ['点不到我点不到我', '跳跳跳喵', '不要再点肚子了喵'],
        ['不要摸耳朵', '啊,右耳好痒喵'],
        ['不要摸左耳', '啊,左耳好痒喵'],
        ['尾巴尾巴', '点不到点不到', '晃晃尾巴']
    ],
    enabled: false,
    async init() {
        console.log("Momo Plugin Initialized");
    },

    start() {
        this.enabled = true;
        this.contentext = [
            ['点不到我点不到我', '跳跳跳喵', '不要再点肚子了喵'],
            ['不要摸右耳', '啊,右耳好痒喵'],
            ['不要摸左耳', '啊,左耳好痒喵'],
            ['尾巴尾巴', '点不到点不到', '晃晃尾巴']
        ];
    },

    stop() {
        this.stopPing();
    },

    everyPing(status: string) {
        if (status == 'jump' && this.contentext[0]) {
            petSay.set(this.contentext[0][Math.floor(Math.random() * this.contentext[0].length)]);
        } else if (status == 'idle_R_ear' && this.contentext[1]) {
            petSay.set(this.contentext[1][Math.floor(Math.random() * this.contentext[1].length)]);
        } else if (status == 'idle_L_ear' && this.contentext[2]) {
            petSay.set(this.contentext[2][Math.floor(Math.random() * this.contentext[2].length)]);
        } else if (status == "Tail_an" && this.contentext[3]) {
            petSay.set(this.contentext[3][Math.floor(Math.random() * this.contentext[3].length)]);
        } else if (status == "idle") {
            // petSay.set("喵~");
            // continue;
            console.log("idle");
        }
        else {
            console.warn(`Unknown status: ${status}`);
        }
    },

    stopPing() {
        this.enabled = false;
    }
};

export default momoPlugin;