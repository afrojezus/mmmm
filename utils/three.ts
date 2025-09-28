import type * as THREE from "three"
export function getMaterial(mesh: THREE.Mesh) {
  if (Array.isArray(mesh.material)) {
    return mesh.material[0] as THREE.MeshStandardMaterial
  }
  return mesh.material as THREE.MeshStandardMaterial
}
