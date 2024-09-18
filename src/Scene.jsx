import { useEffect } from 'react';
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

function ThreeScene() {
  useEffect(() => {
    // Create the scene
    const scene = new THREE.Scene();
    scene.background = null; // Set the scene background to transparent

    // Set up the camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Set up the renderer with transparency
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('3dModel').appendChild(renderer.domElement);

    // Add basic lighting to the scene
    const ambientLight = new THREE.AmbientLight(0x404040, 2); // Soft white light
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);

    const loader = new GLTFLoader();
    const modelUrl = '/models/scene.gltf';

    loader.load(modelUrl, (gltf) => {
      const model = gltf.scene;

      // Compute the bounding box of the model to center it
      const boundingBox = new THREE.Box3().setFromObject(model);
      const center = boundingBox.getCenter(new THREE.Vector3());

      // Move the model to its center
      model.position.sub(center);

      // Optionally scale or position the model
      model.scale.set(1.8, 1.8, 1.8); // Adjust scale as needed

      // Add the model to the scene
      scene.add(model);
      model.position.x -= 0.5;
      model.position.y += 0.1;
    }, undefined, (error) => {
      console.error('An error occurred while loading the model:', error);
    });

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);

      // Rotate the model (assuming the model is the only child in the scene)
      if (scene.children.length > 0) {
        const model = scene.children.find(child => child.isMesh || child.isGroup);
        if (model) {
          model.rotation.y += 0.001; // Rotate around the Y-axis
        }
      }

      // Render the scene from the perspective of the camera
      renderer.render(scene, camera);
    }

    animate();

    // Adjust camera aspect ratio and renderer size on window resize
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    window.addEventListener('resize', onWindowResize);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', onWindowResize);

      const container = document.getElementById('3dModel');
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []); // Empty dependency array ensures this effect runs only on mount and unmount

  return null; // This component does not render any visible DOM elements
}

export default ThreeScene;
