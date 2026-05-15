const fs = require('fs');

function printGlbNodes(filepath) {
  const buffer = fs.readFileSync(filepath);
  // GLB header: magic (4), version (4), length (4)
  const magic = buffer.readUInt32LE(0);
  if (magic !== 0x46546C67) { // 'glTF'
    console.log(filepath, 'is not a valid GLB');
    return;
  }
  
  const chunkLength = buffer.readUInt32LE(12);
  const chunkType = buffer.readUInt32LE(16);
  if (chunkType !== 0x4E4F534A) { // 'JSON'
    console.log(filepath, 'First chunk is not JSON');
    return;
  }
  
  const jsonBuffer = buffer.slice(20, 20 + chunkLength);
  const jsonString = jsonBuffer.toString('utf8');
  const gltf = JSON.parse(jsonString);
  
  console.log('Nodes in', filepath, ':');
  if (gltf.nodes) {
    gltf.nodes.forEach((n, i) => console.log('  ', i, n.name));
  } else {
    console.log('  No nodes found.');
  }
}

printGlbNodes('public/DiamondRing.glb');
printGlbNodes('public/RGold.glb');
printGlbNodes('public/EGreen.glb');
printGlbNodes('public/HBlue.glb');
