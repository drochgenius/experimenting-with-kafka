import resolve from 'rollup-plugin-node-resolve';

export default {
    context: 'self',
    input: 'dist/client/index.js',
    output: {
        file: 'dist/client/app.js',
        format: 'esm',
        name: 'Client'
    },
    plugins: [resolve()]
};
