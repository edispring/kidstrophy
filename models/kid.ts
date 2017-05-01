import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const runSchema = new Schema({
    year: { type: Number, default: 2017 },
    number: { type: Number, default: 1 },
    stage1: { type: Number, default: 0 },
    stage2: { type: Number, default: 0 },
    stage3: { type: Number, default: 0 },
    stage4: { type: Number, default: 0 },
    stage5: { type: Number, default: 0 },
    stage6: { type: Number, default: 0 },
});

export const kidSchema = new Schema({
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    category: { type: Number, default: 1 },
    runs: [runSchema]
});

mongoose.model('Kid', kidSchema);