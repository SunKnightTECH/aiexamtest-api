import { stdout as slog } from 'single-line-log'

class progressBar {                  // 进度条的长度(单元：字符)，默许设为 25
    description: string
    length: number;
    constructor(description, length) {
        this.description = description || 'Progress';       // 命令行开首的笔墨信息
        this.length = length || 25; // 进度条的长度(单元：字符)，默许设为 25
    }
    render(opts) {
        let percent: any = (opts.completed / opts.total).toFixed(4);    // 盘算进度(子使命的 完成数 除以 总数)
        let cell_num = Math.floor(percent * this.length);             // 盘算须要若干个 █ 标记来拼集图案
        // 拼接黑色条
        let cell = '';
        for (let i = 0; i < cell_num; i++) {
            cell += '█';
        }
        // 拼接灰色条
        let empty = '';
        for (let i = 0; i < this.length - cell_num; i++) {
            empty += '░';
        }
        // 拼接终究文本
        let cmdText = this.description + ': ' + (100 * percent).toFixed(2) + '% ' + cell + empty + ' ' + opts.completed + '/' + opts.total + ' ';
        // 在单行输出文本
        slog(cmdText);
    }
}

export default progressBar;