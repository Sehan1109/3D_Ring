import fs from 'fs';

function inspectMaterials(filepath) {
  const buffer = fs.readFileSync(filepath);
  const magic = buffer.readUInt32LE(0);
  if (magic !== 0x46546C67) return;
  const chunkLength = buffer.readUInt32LE(12);
  const jsonBuffer = buffer.subarray(20, 20 + chunkLength);
  const gltf = JSON.parse(jsonBuffer.toString('utf8'));
  
  console.log('---', filepath, '---');
  if (gltf.materials) {
    gltf.materials.forEach((m, i) => {
      let isTransparent = m.alphaMode === 'BLEND' || m.alphaMode === 'MASK' || (m.extensions && m.extensions.KHR_materials_transmission);
      console.log(`[${i}] ${m.name} - transparent: ${!!isTransparent}, pbr:`, m.pbrMetallicRoughness);
    });
  }
}

inspectMaterials('public/DiamondRing.glb');
inspectMaterials('public/RGold.glb');
inspectMaterials('public/EGreen.glb');
inspectMaterials('public/HBlue.glb');
