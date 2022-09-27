"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const move_1 = __importDefault(require("./move"));
describe('move', () => {
    it('moves given file to another folder', () => {
        const list = [
            {
                id: '1',
                name: 'Folder 1',
                files: [
                    { id: '2', name: 'File 1' },
                    { id: '3', name: 'File 2' },
                    { id: '4', name: 'File 3' },
                    { id: '5', name: 'File 4' },
                ],
            },
            {
                id: '6',
                name: 'Folder 2',
                files: [{ id: '7', name: 'File 5' }],
            },
        ];
        const result = [
            {
                id: '1',
                name: 'Folder 1',
                files: [
                    { id: '2', name: 'File 1' },
                    { id: '3', name: 'File 2' },
                    { id: '5', name: 'File 4' },
                ],
            },
            {
                id: '6',
                name: 'Folder 2',
                files: [
                    { id: '7', name: 'File 5' },
                    { id: '4', name: 'File 3' },
                ],
            },
        ];
        expect(move_1.default(list, '4', '6')).toStrictEqual(result);
    });
    it('throws error if given source is not a file', () => {
        const list = [
            {
                id: '1',
                name: 'Folder 1',
                files: [{ id: '2', name: 'File 1' }],
            },
            { id: '3', name: 'Folder 2', files: [] },
        ];
        expect(() => move_1.default(list, '3', '1')).toThrow('You cannot move a folder');
    });
    it('throws error if given destination is not a folder', () => {
        const list = [
            {
                id: '1',
                name: 'Folder 1',
                files: [{ id: '2', name: 'File 1' }],
            },
            { id: '3', name: 'Folder 2', files: [{ id: '4', name: 'File 2' }] },
        ];
        expect(() => move_1.default(list, '2', '4')).toThrow('You cannot specify a file as the destination');
    });
});
//# sourceMappingURL=move.spec.js.map