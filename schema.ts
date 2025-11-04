import * as fs from 'fs';
import * as path from 'path'
import * as _ from 'lodash'

const file = process.argv[2];  //文件
let folder = process.argv[3];  //文件夹

folder = folder ? folder : 'schema';

try {
    const first = _.upperFirst(file);
    const str = `import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
export type ${first}Document = ${first} & Document;
@Schema({ collection: "${first}" })
export class ${first} {
    @Prop({ required: true, unique: true })
    id: string;
}
export const ${first}Schema = SchemaFactory.createForClass(${first});`
    const filepath = '/src/' + folder + '/' + file + '.schema.ts'
    const filename = path.join(__dirname, '/' + filepath);
    fs.access(filename, fs.constants.F_OK, () => {
        fs.writeFile(filename, str, function (err?) {
            console.log('生成数据文件成功');
        });
    })
} catch (ex) {
    console.error('生成文件失败，请重试', ex.message);
    process.exit(1)
}