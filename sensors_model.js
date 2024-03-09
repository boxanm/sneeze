import * as THREE from "three";

import { MTLLoader } from "three/addons/loaders/MTLLoader.js";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

console.log("Hello");
let camera, scene, renderer;

init();
animate();

function init() {
  const canvasWidth = 0.6 * window.innerWidth;
  const canvasHeight = 400;

  camera = new THREE.PerspectiveCamera(45, canvasWidth / canvasHeight, 0.1, 20);

  // scene

  scene = new THREE.Scene();

  const ambientLight = new THREE.AmbientLight(0xffffff);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xffffff, 15);
  camera.add(pointLight);
  scene.add(camera);

  // model

  const onProgress = function (xhr) {
    if (xhr.lengthComputable) {
      const percentComplete = (xhr.loaded / xhr.total) * 100;
      console.log(percentComplete.toFixed(2) + "% downloaded");
    }
  };

  new MTLLoader()
    .setPath("resources/assembly/")
    .load("assembly.mtl", function (materials) {
      materials.preload();

      new OBJLoader()
        .setMaterials(materials)
        .setPath("resources/assembly/")
        .load(
          "assembly.obj",
          function (object) {
            object.position.x = 0.5;
            object.position.y = -0.5;
            scene.add(object);
          },
          onProgress,
        );
    });

  //

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(canvasWidth, canvasHeight);

  // Select the specific div by its id
  const renderContainer = document.getElementById("three-container");

  // Append the renderer's DOM element to the selected div
  renderContainer.appendChild(renderer.domElement);

  //

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.minDistance = 0.5;
  controls.maxDistance = 3;

  //
  camera.position.set(0.6, 0.4, 2.0);
  camera.rotation.set(-0.33, 0.39, 0.14);

  window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
  const newWidth = 0.6 * window.innerWidth;
  const newHeight = 400;
  camera.aspect = newWidth / newHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(newWidth, newHeight);
}

//

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
