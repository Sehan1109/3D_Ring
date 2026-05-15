import fs from 'fs';

function inspectNodes(filepath) {
  const buffer = fs.readFileSync(filepath);
  const magic = buffer.readUInt32LE(0);
  if (magic !== 0x46546C67) return;
  const chunkLength = buffer.readUInt32LE(12);
  const jsonBuffer = buffer.subarray(20, 20 + chunkLength);
  const gltf = JSON.parse(jsonBuffer.toString('utf8'));
  
  console.log('---', filepath, '---');
  if (gltf.meshes) {
    gltf.nodes.forEach((n, i) => {
      if (n.mesh !== undefined) {
        const mesh = gltf.meshes[n.mesh];
        const matIdx = mesh.primitives[0].material;
        const matName = gltf.materials[matIdx] ? gltf.materials[matIdx].name : 'none';
        console.log(`Node [${i}] ${n.name} uses Material [${matIdx}] ${matName}`);
      }
    });
  }
}

inspectNodes('public/DiamondRing.glb');
inspectNodes('public/RGold.glb');
inspectNodes('public/EGreen.glb');
inspectNodes('public/HBlue.glb');
