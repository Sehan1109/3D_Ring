import fs from 'fs';

function printGlbMaterials(filepath) {
  const buffer = fs.readFileSync(filepath);
  const magic = buffer.readUInt32LE(0);
  if (magic !== 0x46546C67) return;
  const chunkLength = buffer.readUInt32LE(12);
  const jsonBuffer = buffer.subarray(20, 20 + chunkLength);
  const gltf = JSON.parse(jsonBuffer.toString('utf8'));
  
  console.log('Materials in', filepath, ':');
  if (gltf.materials) {
    gltf.materials.forEach((m, i) => console.log('  ', i, m.name));
  } else {
    console.log('  No materials found.');
  }
}

printGlbMaterials('public/DiamondRing.glb');
printGlbMaterials('public/RGold.glb');
printGlbMaterials('public/EGreen.glb');
printGlbMaterials('public/HBlue.glb');
