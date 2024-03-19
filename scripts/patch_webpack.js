const fs = require('fs');

const configPath = './config/webpack/';
// const moduleConfigPath = 'node_modules/custom-react-scripts/config/';

const rollbackFile = (fileName) => {
  fs.renameSync(`${moduleConfigPath + fileName}.bak`, moduleConfigPath + fileName, (err) => {
    if (err) {
      console.warn(`Could not move backup file ${fileName} (consider doing it manually)`);
      throw err;
    }
  });
};

const moveFile = (fileName) => {
  console.log(fileName);
  // Check if the file already exists in node_modules
  fs.stat(moduleConfigPath + fileName, (statErr) => {
    if (statErr) {
      console.warn(`No current file with that name could be found! (${fileName})`);
    } else {
      // If the backup file already exists, it will be overwritten
      fs.renameSync(moduleConfigPath + fileName, `${moduleConfigPath + fileName}.bak`, (err) => {
        if (err) {
          console.error(`Could not create backup file for ${fileName} exiting`);
          throw err;
        }
      });
    }

    // Read from the custom config
    const rd = fs.createReadStream(configPath + fileName);
    rd.on('error', (err) => {
      console.error('Something went wrong when reading from the file');
      throw err;
    });

    // Write to the file found in node_modules
    const wr = fs.createWriteStream(moduleConfigPath + fileName);
    wr.on('error', (err) => {
      console.error('Something went wrong when writing from the file');
      rollbackFile(fileName);
      throw err;
    });
    wr.on('close', () => {
      console.log(`Done writing: ${fileName}`);
    });
    rd.pipe(wr);

    // This works even when the file does not exist
    fs.unlinkSync(`${moduleConfigPath + fileName}.bak`);
  });
};

// Read all the files from the local config dir
fs.readdir(configPath, (err, files) => {
  files.forEach((file) => {
    moveFile(file);
  });
});
