const container = document.querySelector('.cube-container');
const cube = document.querySelector('.cube');

cube.style.animation = 'spinCube 30s infinite ease-in-out';

// TURN CUBE ON MOUSEMOVE INSIDE CONTAINER
container.addEventListener('mousemove', (e) => {
  rotY = e.clientX / 2;
  rotZ = e.clientY / 2;

  cube.style.animation = 'none';
  cube.style.transform = 'rotateY(' + rotY + 'deg) rotateZ(' + rotZ + 'deg)';
  cube.style.transition = '500ms ease-out';
});

container.addEventListener('mouseout', (e) => {
  cube.style.animation = 'spinCube 30s infinite ease-in-out';
})