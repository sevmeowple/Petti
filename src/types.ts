/*
 * @Author: Qmm 1259598502@qq.com
 * @Date: 2024-07-24 16:26:28
 * @LastEditors: Qmm 1259598502@qq.com
 * @LastEditTime: 2024-07-24 16:26:36
 * @FilePath: \Apps\Petti\Petti\src\types.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export interface Plugin {
    name: string;
    init: () => void;
    start?: () => void;
    stop?: () => void;
  }
  