// JavaScript code for Solar System page with enhanced content and 3D model
import * as THREE from 'three';

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.152.2/examples/jsm/loaders/GLTFLoader.js';

// Initialize scene, camera, and renderer
const container = document.getElementById('solar-system-model');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000c1a);

const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
camera.position.set(0, 2, 10);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

// Add lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Load Solar System 3D model
toaster('Loading Solar System 3D Model...');
const loader = new GLTFLoader();
loader.load('./models/solar_system.glb', (gltf) => {
    const model = gltf.scene;
    model.scale.set(2, 2, 2);
    model.position.set(0, -2, 0);
    scene.add(model);

    function animate() {
        requestAnimationFrame(animate);
        model.rotation.y += 0.005;
        renderer.render(scene, camera);
    }
    animate();
    toaster('3D Model Loaded Successfully!');
}, undefined, (error) => {
    console.error('Error loading the Solar System model:', error);
    toaster('Failed to load 3D model.');
});

// Window resize handling
window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});

// Simple notification toaster
function toaster(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.right = '20px';
    toast.style.background = '#333';
    toast.style.color = '#fff';
    toast.style.padding = '10px';
    toast.style.borderRadius = '5px';
    toast.style.zIndex = '1000';
    document.body.appendChild(toast);
    setTimeout(() => document.body.removeChild(toast), 3000);
}

// Interactive info sections
document.querySelectorAll('.info-title').forEach(title => {
    title.addEventListener('click', () => {
        title.nextElementSibling.classList.toggle('hidden');
    });
});
