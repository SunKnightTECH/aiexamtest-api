import { execSync } from 'child_process'
import progressBar from './progressBar';
import * as fs from 'fs';
import * as path from 'path'
import * as _ from 'lodash'

const file = process.argv[2].toLowerCase();  //文件
let folder = process.argv[3];  //文件夹

folder = folder ? folder : 'controller';

const pb = new progressBar('生成文件', 0);
pb.render({ completed: 0, total: 4 });
try {
    execSync('nest g module ' + file + ' ' + folder)
    pb.render({ completed: 1, total: 4 });
    execSync('nest g controller ' + file + ' ' + folder)
    pb.render({ completed: 2, total: 4 });
    execSync('nest g service ' + file + ' ' + folder)
    pb.render({ completed: 3, total: 4 });
    const str = 'import { IsString } from "class-validator";\n\n'
    const filepath = '/src/' + folder + '/' + file + '/' + file + '.dto.ts'
    const filename = path.join(__dirname, '/' + filepath);
    fs.access(filename, fs.constants.F_OK, () => {
        fs.writeFile(filename, str, function (err?) {
            if (err) {
                return console.log(err);
            } else {
                pb.render({ completed: 4, total: 4 });
            }
        });
    })
} catch (ex) {
    console.error('生成文件失败，请重试', ex.message);
    process.exit(1)
}