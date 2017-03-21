
const THREE = require('three'); // older modules are imported like this. You shouldn't have to worry about this much
import Framework from './framework'
import Noise from './noise'
import {other} from './noise'
import DAT from 'dat-gui'

var adamMaterial = new THREE.ShaderMaterial({
    uniforms: {
      image: { // Check the Three.JS documentation for the different allowed types and values
        type: "t", 
        value: THREE.ImageUtils.loadTexture('./explosion.png')
      },
        time: {
        type: "f",
        value: 1.0
    },
        persistance_p: {
            type: "f",
            value: 0.5
        },
        audData: {
            type: "iv1",
            value: new Array
        }
        
    },
    vertexShader: require('./shaders/adam-vert.glsl'),
    fragmentShader: require('./shaders/adam-frag.glsl')
  });

//points stuff
var material = new THREE.PointsMaterial( { color: 0xeeeeee } );
material.size = 0.1;
//material.sizeAttenuation = false;

var speed = 0.01;
var time = 0;

var octageom;
var geometry;
var points;

//other stuff
var timer ={ 
    speed: 0.03
    }

var persist = {
    persistance: 1.13
}

var audToggle = {
    AudioToggle: false
}

// called after the scene loads
function onLoad(framework) {
  var scene = framework.scene;
  var camera = framework.camera;
  var renderer = framework.renderer;
  var gui = framework.gui;
  var stats = framework.stats;
    var audio = framework.audio;
    
  // set camera position
  camera.position.set(1, 1, 2);
  camera.lookAt(new THREE.Vector3(0,0,0));

    //base geom to whcih the particles will confine
    //octageom = new THREE.OctahedronGeometry(0,1);
    //octageom = new THREE.ConeGeometry( 5, 20, 32 );
    //octageom = new THREE.CylinderGeometry( 5, 5, 20, 32 );
     octageom = new THREE.DodecahedronGeometry(5, 2);
    
    //creating a bunch of position for the geometry
    geometry = new THREE.Geometry();

    for(var i = 0; i < octageom.vertices.length; i++)
    {
         geometry.vertices.push(new THREE.Vector3(  THREE.Math.randFloatSpread(15), THREE.Math.randFloatSpread(15), THREE.Math.randFloatSpread(15) ));
    }
   
    //points geometry
    points = new THREE.Points(geometry, material);
    
    scene.add(points);
    debugger;

}

  //var gui1 = new DAT.GUI();
  

// called on frame updates
function onUpdate(framework) {
  // console.log(`the time is ${new Date()}`);
    
//    adamMaterial.uniforms.time.value += timer.speed;
//    adamMaterial.uniforms.persistance_p.value = persist.persistance;  
//    adamMaterial.uniforms.audData.value = Int32Array.from(framework.frequencyData);
    //console.log(framework.frequencyData)
    
    var clock = new THREE.Clock();
    clock.start;

    speed += clock.getDelta();
    
        if(geometry !== undefined && octageom !== undefined){
            for(var i = 0; i < geometry.vertices.length; i++){
                geometry.vertices[i].x = geometry.vertices[i].x + speed * (octageom.vertices[i].x - geometry.vertices[i].x);
                geometry.vertices[i].y = geometry.vertices[i].y + speed * (octageom.vertices[i].y - geometry.vertices[i].y);
                geometry.vertices[i].z = geometry.vertices[i].z + speed * (octageom.vertices[i].z - geometry.vertices[i].z);
            } 
            geometry.verticesNeedUpdate = true;
        }

    
    
}

// when the scene is done initializing, it will call onLoad, then on frame updates, call onUpdate
Framework.init(onLoad, onUpdate);

// console.log('hello world');

// console.log(Noise.generateNoise());

// Noise.whatever()

// console.log(other())