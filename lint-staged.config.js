module.exports = {
  '**/*.ts?(x)': (filenames) => {
    filenames.map((filename) => `prettier --write '${filename}'`);

    return 'tsc -p tsconfig.json --noEmit';
  },
  // '**/*.ts?(x)': () => 'tsc -p tsconfig.json --noEmit',
  // '*.ts': ['eslint', 'prettier --write'],
};
