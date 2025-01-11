import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

// Set up the scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Load the HDRI file
const rgbeLoader = new RGBELoader();
rgbeLoader.load('images/HDR_multi_nebulae.hdr', (texture) => {
  texture.mapping = THREE.EquirectangularReflectionMapping;

  // Set as the scene's background and environment map
  scene.background = texture;
  scene.environment = texture;
});

renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 2; // Adjust for brightness



const sunRadius = 10;
const color = new THREE.Color(0x8B0000);
const SUNgeometry = new THREE.IcosahedronGeometry(sunRadius, 20);
const STexture = new THREE.TextureLoader().load('images/suntext.png'); // Load the texture

// Ensure the texture is loaded correctly
STexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
STexture.minFilter = THREE.LinearFilter;
STexture.magFilter = THREE.LinearFilter;

// Shader material
const sunMaterial = new THREE.MeshBasicMaterial({
  map: STexture, // Apply the texture
  emissive: color,  // Set emissive color to make the sun appear glowing
  emissiveIntensity: 6, // Intensity of the glow
  side: THREE.FrontSide, // Make sure the texture appears on the front side
  transparent: false, // Don't use transparency, as it's not needed here
});

// Create the sun mesh
const sun = new THREE.Mesh(SUNgeometry, sunMaterial);
sun.position.set(0, 0, 0); // Ensure the sun is in the center of the scene
scene.layers.set(2);
scene.add(sun);


// Add a point light for the sun's glow
const sunLight = new THREE.PointLight(color, 1, 100);
sunLight.position.set(0, 0, 0); // Position the light at the sun's location
scene.add(sunLight);


//create asteroid belt
const asteroidCount = 250;
const asteroidDistanceMin = 52;
const asteroidDistanceMax = 60;
const asteroidRadius = 0.2;
const asteroidColors = [0x888888, 0x999999, 0xaaaaaa, 0xbbbbbb]; // Colors for each asteroid

const asteroids = [];

for (let i = 0; i < asteroidCount; i++) {
  const asteroidGeometry = new THREE.SphereGeometry(asteroidRadius,8, 8);  
  const asteroidMaterial = new THREE.MeshBasicMaterial({ color: asteroidColors[Math.floor(Math.random() * asteroidColors.length)] });
  const asteroid = new THREE.Mesh(asteroidGeometry, asteroidMaterial);

  const distance = Math.random() * (asteroidDistanceMax - asteroidDistanceMin) + asteroidDistanceMin;
  const angle = Math.random() * Math.PI * 2;
  const x = Math.cos(angle) * distance;
  const z = Math.sin(angle) * distance;
  asteroid.position.set(x, 0, z);

  scene.add(asteroid);
  asteroids.push(asteroid);
}

// Create the planets
const planetDistances = [15, 25, 35, 45, 70, 80, 90, 100]; // Distances from the sun
const revolutionTimeScale = 0.0005;//Used for revolution
const planetRotationSpeeds = [0.02, 0.03, 0.009, 0.01, 0.009, 0.0075, 0.006, 0.0045]; // Rotation speeds for each planet


 const planets = [];
 //mercury
 const planetGeometry1 = new THREE.SphereGeometry(0.8, 32, 32);
 const EMtexture = new THREE.TextureLoader().load('images/mercury.jpg');
 const planetMaterial1 = new THREE.MeshBasicMaterial({ map:EMtexture });
 const planet1 = new THREE.Mesh(planetGeometry1, planetMaterial1);
 const angle1 = (0 / planetDistances.length) * Math.PI * 2;
 const x1 = Math.cos(angle1) * 15;
 const z1 = Math.sin(angle1) * 15;
 planet1.position.set(x1, 0, z1);
 scene.add(planet1);
 planets.push(planet1);

 //venus
 const planetGeometry2 = new THREE.SphereGeometry(1.6, 32, 32);
 const EEtexture = new THREE.TextureLoader().load('images/venus.jpg');
 const planetMaterial2 = new THREE.MeshBasicMaterial({ map:EEtexture});
 const planet2 = new THREE.Mesh(planetGeometry2, planetMaterial2);
 const angle2 = (1 / planetDistances.length) * Math.PI * 2;
 const x2 = Math.cos(angle2) * 25;
 const z2= Math.sin(angle2) * 25;
 planet2.position.set(x2, 0, z2);
 scene.add(planet2);
 planets.push(planet2);

 //earth
 const planetGeometry3 = new THREE.SphereGeometry(1.6, 32, 32);
 const Etexture = new THREE.TextureLoader().load('images/earth_main.jpg');
 const EGTexture = new THREE.TextureLoader().load('images/earth_main.jpg');
 const planetMaterial3 = new THREE.MeshBasicMaterial({map: Etexture});
 const glowGeometry1 = new THREE.SphereGeometry(1.6, 32, 32);
 const glowMaterial1 = new THREE.MeshBasicMaterial({ map:Etexture, bumpMap: EGTexture, bumpScale:0.3 });
 const ECloudsTexture = new THREE.TextureLoader().load('images/Earth-clouds.png');
 const cloudsGeometry = new THREE.SphereGeometry(1.625, 32, 32); // Slightly larger geometry for clouds
 const cloudsMaterial = new THREE.MeshBasicMaterial({map: ECloudsTexture, transparent: true});
 const glows1 = new THREE.Mesh(glowGeometry1, glowMaterial1);
 const clouds = new THREE.Mesh(cloudsGeometry, cloudsMaterial);
 const planet3 = new THREE.Mesh(planetGeometry3, planetMaterial3);
 const angle3 = (2 / planetDistances.length) * Math.PI * 2;
 const x3 = Math.cos(angle3) * 35;
 const z3= Math.sin(angle3) * 35;
 planet3.position.set(x3, 0, z3);
 clouds.position.set(x3, 0, z3);
 glows1.position.set(x3, 0, z3);
 scene.add(clouds);
 scene.add(planet3);
 scene.add(glows1);
 planets.push(planet3);
 const moonGeometry = new THREE.SphereGeometry(0.25, 32, 32);
 const moonTexture = new THREE.TextureLoader().load('images/moonmap.jpg');
 const moonMaterial = new THREE.MeshBasicMaterial({ map: moonTexture});
 const moon = new THREE.Mesh(moonGeometry, moonMaterial);
 const moongGeometry = new THREE.SphereGeometry(0.29, 32, 32);
 const moongTexture = new THREE.TextureLoader().load('images/moong.png');
 const moongMaterial = new THREE.MeshBasicMaterial({ map: moongTexture, transparent:true, opacity:0.001});
 const moong = new THREE.Mesh(moongGeometry, moongMaterial);
 const moonDistance = 3; // Distance from the center of the Earth
 moon.position.set(x3 + moonDistance, 0, z3); // Offset from Earth's position
 moong.position.set(x3 + moonDistance, 0, z3); 
 scene.add(moon);
 scene.add(moong);


 //mars
   const planetGeometry4 = new THREE.SphereGeometry(1.2, 32, 32);
   const Mtexture = new THREE.TextureLoader().load('images/mmap.jpeg');
   const planetMaterial4 = new THREE.MeshBasicMaterial({ map:Mtexture });
   const planet4 = new THREE.Mesh(planetGeometry4, planetMaterial4);
   const planetgGeometry4 = new THREE.SphereGeometry(1.22, 32, 32);
   const Mgtexture = new THREE.TextureLoader().load('images/redg.png');
   const planetgMaterial4 = new THREE.MeshBasicMaterial({ map:Mgtexture , transparent:true, opacity:0.5});
   const planetg4 = new THREE.Mesh(planetgGeometry4, planetgMaterial4);
   const angle4 = (3 / planetDistances.length) * Math.PI * 2;
   const x4 = Math.cos(angle4) * 45;
   const z4 = Math.sin(angle4) * 45;
   planet4.position.set(x4, 0, z4);
   planetg4.position.set(x4, 0, z4);
   scene.add(planetg4);
   scene.add(planet4);
   planets.push(planet4);

  //jupiter
   const planetGeometry5 = new THREE.SphereGeometry(3.0, 32, 32);
   const JTexture = new THREE.TextureLoader().load('images/Jupmap.jpeg');
   const planetMaterial5 = new THREE.MeshBasicMaterial({ map : JTexture });
   const planet5 = new THREE.Mesh(planetGeometry5, planetMaterial5);
   const planetGeometry51 = new THREE.SphereGeometry(3.1, 32, 32);
   const JCTexture = new THREE.TextureLoader().load('images/Jupcloud.png');
   const planetMaterial51 = new THREE.MeshBasicMaterial({ map: JCTexture, transparent: true});
   const planet51 = new THREE.Mesh(planetGeometry51, planetMaterial51);
   const angle5 = (4 / planetDistances.length) * Math.PI * 2;
   const x5 = Math.cos(angle5) * 70;
   const z5 = Math.sin(angle5) * 70;
   planet5.position.set(x5, 0, z5);
   planet51.position.set(x5, 0, z5);
   scene.add(planet5);
   scene.add(planet51);
   planets.push(planet5);
   const SasteroidCount = 400;
   const SasteroidDistanceMin = 5;
   const SasteroidDistanceMax = 6;
   const SasteroidRadius = 0.05;
   const SasteroidColors = [0x888888, 0x999999, 0xaaaaaa, 0xbbbbbb]; // Colors for each asteroid
   const Sasteroids = [];
   for (let i = 0; i < SasteroidCount; i++) {
     const SasteroidGeometry = new THREE.SphereGeometry(SasteroidRadius, 8, 8);
     const SasteroidMaterial = new THREE.MeshBasicMaterial({ color: SasteroidColors[Math.floor(Math.random() * SasteroidColors.length)] });
     const Sasteroid = new THREE.Mesh(SasteroidGeometry, SasteroidMaterial);
     const distance51 = Math.random() * (SasteroidDistanceMax - SasteroidDistanceMin) + SasteroidDistanceMin;
     const angle51 = Math.random() * Math.PI * 2;
     const x51 = Math.cos(angle51) * distance51 + x5;
     const z51 = Math.sin(angle51) * distance51 + z5;
     Sasteroid.position.set(x51, 0, z51);
     Sasteroids.push(Sasteroid);
     scene.add(Sasteroid);
   }
 
   //saturn
   const planetGeometry6 = new THREE.SphereGeometry(2.4, 32, 32);
   const SaTexture = new THREE.TextureLoader().load('images/saturnmapp.jpg');
   const planetMaterial6 = new THREE.MeshBasicMaterial({ map : SaTexture });
   const planet6 = new THREE.Mesh(planetGeometry6, planetMaterial6);
   const CplanetGeometry6 = new THREE.SphereGeometry(2.3, 32, 32);
   const CplanetMaterial6 = new THREE.MeshBasicMaterial({ color: 0xffaa00 , transparent:true });
   const planet61 = new THREE.Mesh(CplanetGeometry6, CplanetMaterial6);
   const angle6 = (5 / planetDistances.length) * Math.PI * 2;
   const x6 = Math.cos(angle6) * 80;
   const z6 = Math.sin(angle6) * 80;
   planet6.position.set(x6, 0, z6);
   planet61.position.set(x6, 0, z6);
   scene.add(planet6);
   scene.add(planet61);
   planets.push(planet6);
   const JasteroidCount = 500;
   const JasteroidDistanceMin = 5;
   const JasteroidDistanceMax = 7;
   const JasteroidRadius = 0.05;
   const JasteroidColors = [0x888888, 0x999999, 0xaaaaaa, 0xbbbbbb]; // Colors for each asteroid
   const Jasteroids = [];
   for (let i = 0; i < JasteroidCount; i++) {
     const JasteroidGeometry = new THREE.SphereGeometry(JasteroidRadius, 8, 8);
     const JasteroidMaterial = new THREE.MeshBasicMaterial({ color: JasteroidColors[Math.floor(Math.random() * JasteroidColors.length)] });
     const Jasteroid = new THREE.Mesh(JasteroidGeometry, JasteroidMaterial);
     const distance61 = Math.random() * (JasteroidDistanceMax - JasteroidDistanceMin) + JasteroidDistanceMin;
     const angle61 = Math.random() * Math.PI * 2;
     const x61 = Math.cos(angle61) * distance61 + x6;
     const z61 = Math.sin(angle61) * distance61 + z6;
     Jasteroid.position.set(x61, 0, z61);
     Jasteroids.push(Jasteroid);
     scene.add(Jasteroid);
   }

   //uranus
   const planetGeometry7 = new THREE.SphereGeometry(1.5, 32, 32);
   const Urtexture = new THREE.TextureLoader().load('images/uranmap.jpg');
   const planetMaterial7 = new THREE.MeshBasicMaterial({map : Urtexture});
   const planet7 = new THREE.Mesh(planetGeometry7, planetMaterial7);
   const CplanetGeometry7 = new THREE.SphereGeometry(1.4, 32, 32);
   const CplanetMaterial7 = new THREE.MeshBasicMaterial({ color: 0xffaa00 });
   const planet71 = new THREE.Mesh(CplanetGeometry7, CplanetMaterial7);
   const angle7 = (6 / planetDistances.length) * Math.PI * 2;
   const x7 = Math.cos(angle7) * 90;
   const z7 = Math.sin(angle7) * 90;
   planet7.position.set(x7, 0, z7);
   planet71.position.set(x7, 0, z7);
   scene.add(planet7);
   scene.add(planet71);
   planets.push(planet7);
   const UasteroidCount = 500;
   const UasteroidDistanceMin = 5;
   const UasteroidDistanceMax = 4;
   const UasteroidRadius = 0.03;
   const UasteroidColors = [0x888888, 0x999999, 0xaaaaaa, 0xbbbbbb]; // Colors for each asteroid
   const Uasteroids = [];
   for (let i = 0; i < UasteroidCount; i++) {
     const UasteroidGeometry = new THREE.SphereGeometry(UasteroidRadius, 8, 8);
     const UasteroidMaterial = new THREE.MeshBasicMaterial({ color: UasteroidColors[Math.floor(Math.random() * UasteroidColors.length)] });
     const Uasteroid = new THREE.Mesh(UasteroidGeometry, UasteroidMaterial);
     const distance71 = Math.random() * (UasteroidDistanceMax - UasteroidDistanceMin) + UasteroidDistanceMin;
     const angle71 = Math.random() * Math.PI * 2;
     const x71 = Math.cos(angle71) * distance71 + x7;
     const z71 = Math.sin(angle71) * distance71 + z7;
     Uasteroid.position.set(x71, 0, z71);
     Uasteroids.push(Uasteroid);
     scene.add(Uasteroid);
   }

   //neptune
   const planetGeometry8 = new THREE.SphereGeometry(1.4, 32, 32);
   const Netexture  = new THREE.TextureLoader().load('images/neptune.jpg');
   const planetMaterial8 = new THREE.MeshBasicMaterial({map: Netexture});
   const planet8 = new THREE.Mesh(planetGeometry8, planetMaterial8);
   const CplanetGeometry8 = new THREE.SphereGeometry(1.3, 32, 32);
   const CplanetMaterial8 = new THREE.MeshBasicMaterial({ color: 0xffaa00 });
   const planet81 = new THREE.Mesh(CplanetGeometry8, CplanetMaterial8);
   const angle8 = (7 / planetDistances.length) * Math.PI * 2;
   const x8 = Math.cos(angle8) * 100;
   const z8 = Math.sin(angle8) * 100;
   planet8.position.set(x8, 0, z8);
   planet81.position.set(x8, 0, z8);
   scene.add(planet8);
   scene.add(planet81);
   planets.push(planet8);
   const NasteroidCount = 500;
   const NasteroidDistanceMin = 5;
   const NasteroidDistanceMax = 4;
   const NasteroidRadius = 0.03;
   const NasteroidColors = [0x888888, 0x999999, 0xaaaaaa, 0xbbbbbb]; // Colors for each asteroid
   const Nasteroids = [];
   for (let i = 0; i < NasteroidCount; i++) {
     const NasteroidGeometry = new THREE.SphereGeometry(NasteroidRadius, 8, 8);
     const NasteroidMaterial = new THREE.MeshBasicMaterial({ color: NasteroidColors[Math.floor(Math.random() * NasteroidColors.length)] });
     const Nasteroid = new THREE.Mesh(NasteroidGeometry, NasteroidMaterial);
     const distance81 = Math.random() * (NasteroidDistanceMax - NasteroidDistanceMin) + NasteroidDistanceMin;
     const angle81 = Math.random() * Math.PI * 2;
     const x81 = Math.cos(angle81) * distance81 + x8;
     const z81 = Math.sin(angle81) * distance81 + z8;
     Nasteroid.position.set(x81, 0, z81);
     Nasteroids.push(Nasteroid);
     scene.add(Nasteroid);
   }



// Set up the orbital controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enablePan = false;
controls.enableZoom = true;
controls.enableRotate = true; // Enable rotation as well if desired

// Adjust camera position and target
camera.position.set(0, 0, 150); // Adjust the camera position as needed
controls.target.set(0, 0, 0); // Set the target point to the center of the scene


// Mouse click event listener
renderer.domElement.addEventListener('click', (event) => {
  // Calculate normalized device coordinates (NDC) from mouse coordinates
  const mouse = new THREE.Vector2();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  // Raycasting from camera to the clicked point
  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camera);
  // Check for intersections with the scene objects
  const intersects = raycaster.intersectObjects(planets);
  // If an intersection is found, update the controls' target
  if (intersects.length > 0) {
    const target = intersects[0].object.position;
    controls.target.copy(target);
  }
});


// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Rotate the sun
  sun.rotation.y -= 0.005;

  // Rotate and revolve the asteroid belt
  asteroids.forEach((asteroid) => {
    asteroid.rotation.y += 0.01; // Adjust rotation speed as desired

    const distance = asteroid.position.length();
    const revolutionSpeed = 0.05 / distance; // Adjust revolution speed as desired
    const angle = Math.atan2(asteroid.position.z, asteroid.position.x);
    asteroid.position.x = Math.cos(angle + revolutionSpeed) * distance;
    asteroid.position.z = Math.sin(angle + revolutionSpeed) * distance;
  });
  //earth clouds and glows
  planetg4.rotation.y +=0.01
  clouds.rotation.y += 0.007
  glows1.rotation.y += 0.009
  const revolutionSpeed1 = (Date.now() * revolutionTimeScale) / 35;
  glows1.position.x = Math.cos(revolutionSpeed1) * 35;
  glows1.position.z = Math.sin(revolutionSpeed1) * 35;
  const revolutionSpeed = (Date.now() * revolutionTimeScale) / 35;
  clouds.position.x = Math.cos(revolutionSpeed) * 35;
  clouds.position.z = Math.sin(revolutionSpeed) * 35;
  const revolutionSpeedg = (Date.now() * revolutionTimeScale) / 45;
  planetg4.position.x = Math.cos(revolutionSpeedg) * 45;
  planetg4.position.z = Math.sin(revolutionSpeedg) * 45;
  planet51.rotation.y += 0.009
  const revolutionSpeed5 = (Date.now() * revolutionTimeScale) / 70;
  planet51.position.x = Math.cos(revolutionSpeed5) * 70;
  planet51.position.z = Math.sin(revolutionSpeed5) * 70;
  planet61.rotation.y += 0.0075
  const revolutionSpeed6 = (Date.now() * revolutionTimeScale) / 80;
  planet61.position.x = Math.cos(revolutionSpeed6) * 80;
  planet61.position.z = Math.sin(revolutionSpeed6) * 80;
  planet71.rotation.y += 0.006
  const revolutionSpeed7 = (Date.now() * revolutionTimeScale) / 90;
  planet71.position.x = Math.cos(revolutionSpeed7) * 90;
  planet71.position.z = Math.sin(revolutionSpeed7) * 90;
  planet81.rotation.y += 0.0045
  const revolutionSpeed8 = (Date.now() * revolutionTimeScale) / 100;
  planet81.position.x = Math.cos(revolutionSpeed8) * 100;
  planet81.position.z = Math.sin(revolutionSpeed8) * 100;
  //revolve neptune rings
  Nasteroids.forEach((Nasteroid) => {
    Nasteroid.rotation.y += 0.01; // Adjust rotation speed as desired
    const relativePosition3 = Nasteroid.position.clone().sub(planet81.position);
    const NRevolutionSpeed = 0.9;
    const distance8 = relativePosition3.length();
    const time = Date.now() * 1; // Use a consistent time value for smooth revolution
    const NrevolutionSpeed = (time * NRevolutionSpeed) / distance8; // Adjust revolution speed as desired
    const angle81 = Math.atan2(relativePosition3.z, relativePosition3.x);
    const N1 = Math.cos(angle81 + NrevolutionSpeed) * distance8;
    const N2 = Math.sin(angle81 + NrevolutionSpeed) * distance8;
    const newPosition3 = new THREE.Vector3(N1, Nasteroid.position.y, N2).add(planet81.position);
    
    // Limit the distance of the asteroid from the planet
    const maxDistance3 = 3; 
    const asteroidDistance3 = newPosition3.distanceTo(planet81.position);
    if (asteroidDistance3 > maxDistance3) {
      const direction3 = newPosition3.clone().sub(planet81.position).normalize();
      newPosition3.copy(planet81.position).add(direction3.multiplyScalar(maxDistance3));
    }
    
    Nasteroid.position.copy(newPosition3);
  });
  //revolve uranus rings
  Uasteroids.forEach((Uasteroid) => {
    Uasteroid.rotation.y += 0.01; // Adjust rotation speed as desired
    const relativePosition2 = Uasteroid.position.clone().sub(planet71.position);
    const URevolutionSpeed = 0.9;
    const distance7 = relativePosition2.length();
    const time = Date.now() * 1; // Use a consistent time value for smooth revolution
    const UrevolutionSpeed = (time * URevolutionSpeed) / distance7; // Adjust revolution speed as desired
    const angle71 = Math.atan2(relativePosition2.z, relativePosition2.x);
    const U1 = Math.cos(angle71 + UrevolutionSpeed) * distance7;
    const U2 = Math.sin(angle71 + UrevolutionSpeed) * distance7;
    const newPosition2 = new THREE.Vector3(U1, Uasteroid.position.y, U2).add(planet71.position);
    
    // Limit the distance of the asteroid from the planet
    const maxDistance2 = 4; 
    const asteroidDistance2 = newPosition2.distanceTo(planet71.position);
    if (asteroidDistance2 > maxDistance2) {
      const direction2 = newPosition2.clone().sub(planet71.position).normalize();
      newPosition2.copy(planet71.position).add(direction2.multiplyScalar(maxDistance2));
    }
    
    Uasteroid.position.copy(newPosition2);
  });
  //revolve saturn rings
  Jasteroids.forEach((Jasteroid) => {
    Jasteroid.rotation.y += 0.01; // Adjust rotation speed as desired
    const relativePosition1 = Jasteroid.position.clone().sub(planet61.position);
    const JRevolutionSpeed = 0.9;
    const distance6 = relativePosition1.length();
    const time = Date.now() * 1; // Use a consistent time value for smooth revolution
    const JrevolutionSpeed = (time * JRevolutionSpeed) / distance6; // Adjust revolution speed as desired
    const angle61 = Math.atan2(relativePosition1.z, relativePosition1.x);
    const J1 = Math.cos(angle61 + JrevolutionSpeed) * distance6;
    const J2 = Math.sin(angle61 + JrevolutionSpeed) * distance6;
    const newPosition1 = new THREE.Vector3(J1, Jasteroid.position.y, J2).add(planet61.position);
    
    // Limit the distance of the asteroid from the planet
    const maxDistance1 = 6; 
    const asteroidDistance1 = newPosition1.distanceTo(planet61.position);
    if (asteroidDistance1 > maxDistance1) {
      const direction1 = newPosition1.clone().sub(planet61.position).normalize();
      newPosition1.copy(planet61.position).add(direction1.multiplyScalar(maxDistance1));
    }
    
    Jasteroid.position.copy(newPosition1);
  });
 //revolve jupiter rings 
 Sasteroids.forEach((Sasteroid) => {
  Sasteroid.rotation.y += 0.01; // Adjust rotation speed as desired
  const relativePosition = Sasteroid.position.clone().sub(planet51.position);
  const SRevolutionSpeed = 0.1;
  const distance5 = relativePosition.length();
  const time = Date.now() * 1; // Use a consistent time value for smooth revolution
  const SrevolutionSpeed = (time * SRevolutionSpeed) / distance5; // Adjust revolution speed as desired
  const angle51 = Math.atan2(relativePosition.z, relativePosition.x);
  const S1 = Math.cos(angle51 + SrevolutionSpeed) * distance5;
  const S2 = Math.sin(angle51 + SrevolutionSpeed) * distance5;
  const newPosition = new THREE.Vector3(S1, Sasteroid.position.y, S2).add(planet51.position);
  
  // Limit the distance of the asteroid from the planet
  const maxDistance = 5; // Adjust the maximum distance from the planet
  const asteroidDistance = newPosition.distanceTo(planet51.position);
  if (asteroidDistance > maxDistance) {
    const direction = newPosition.clone().sub(planet51.position).normalize();
    newPosition.copy(planet51.position).add(direction.multiplyScalar(maxDistance));
  }
  
  Sasteroid.position.copy(newPosition);
});

  // Revolve and rotate moon around Earth
  const RevolutionSpeed = 0.003; // Adjust as needed
  const moonSpeed = (Date.now() * RevolutionSpeed) / 5;
  const moonX = Math.cos(moonSpeed) * 5;
  const moonZ = Math.sin(moonSpeed) * 5;
  moon.position.x = clouds.position.x + moonX;
  moon.position.z = clouds.position.z + moonZ;
    moon.rotation.y += 0.007;
  //Rotate and revolution the planets
  planets.forEach((planet, index) => {
    const rotationSpeed = planetRotationSpeeds[index];

    planet.rotation.y += rotationSpeed;

    const revolutionSpeed = (Date.now() * revolutionTimeScale) / planetDistances[index];
    planet.position.x = Math.cos(revolutionSpeed) * planetDistances[index];
    planet.position.z = Math.sin(revolutionSpeed) * planetDistances[index];
   });

   

  // Update the orbital controls
  controls.update();
  
  renderer.render(scene, camera);
}

// Start the animation loop
animate();

