
//create a scene
const scene = new THREE.Scene();

let clientX = 820;
let clientY = 320;

//create a camera
const camera = new THREE.PerspectiveCamera(
  90,
  1,
  0.1,
  500
);
camera.position.z = 1.5;

//create an object
const geometry = new THREE.SphereGeometry( 1, 8, 4 ); 
const material = new THREE.MeshStandardMaterial( { color: 0xffffff } ); 
const sphere = new THREE.Mesh( geometry, material );
scene.add( sphere );

//add the object to scene
scene.add(sphere);

//create renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

const light = new THREE.DirectionalLight( 0xa8cfff, 1 );
light.position.set( 0, 0, 1.5 ); //default; light shining from top
light.castShadow = true; // default false
scene.add( light );

renderer.render(scene, camera);


//animation loop
const animate = time => {
  if(!sphere.rotation.x || !sphere.rotation.y) {
    sphere.rotation.x = -1000;
    sphere.rotation.y = -3;
  }
  requestAnimationFrame(animate);
  rotationY = clientX * -0.01;
  rotationX = clientY * -0.01 - 1000;

  // console.log('rotation', sphere.rotation.x, sphere.rotation.y)
  // console.log(rotationX, rotationY);
  rotationX = sphere.rotation.x + (rotationX - sphere.rotation.x) * 0.1;
  rotationY = sphere.rotation.y + (rotationY - sphere.rotation.y) * 0.1;
  // console.log('postlerp', rotationX, rotationY);

  sphere.rotation.y = rotationY;
  sphere.rotation.x = rotationX;
  renderer.render(scene, camera);
};

window.addEventListener('mousemove', e => {
  clientX = e.clientX;
  clientY = e.clientY;
})

requestAnimationFrame(animate);

renderer.setPixelRatio(1)
renderer.domElement.id = 'sphere';
document.querySelector('#sphere-body').appendChild(renderer.domElement);
document.querySelector('#sphere').style.width = '200px'
document.querySelector('#sphere').style.height = '200px'