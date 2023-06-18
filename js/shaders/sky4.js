Based on "A Practical Analytic Model for Daylight"
aka The Preetham Model, the de facto standard analytic skydome model
http://www.cs.utah.edu/~shirley/papers/sunsky/sunsky.pdf

First implemented by Simon Wallner http://www.simonwallner.at/projects/atmospheric-scattering

Improved by Martin Upitis http://blenderartists.org/forum/showthread.php?245954-preethams-sky-impementation-HDR

Three.js integration by zz85 http://twitter.com/blurspline
Refactored by @jbouny

*/

'uniform sampler2D skySampler;',
'uniform vec3 sunPosition;',
'varying vec3 vWorldPosition;',
'varying vec2 vUv;',

'vec3 cameraPos = vec3(0., 0., 0.);',

'uniform float luminance;',
'uniform float turbidity;',
'uniform float reileigh;',
'uniform float mieCoefficient;',
'uniform float mieDirectionalG;',


'vec3 sunDirection = normalize(sunPosition);',
'float reileighCoefficient = reileigh;',

// constants for atmospheric scattering
'const float e = 2.71828182845904523536028747135266249775724709369995957;',
'const float pi = 3.141592653589793238462643383279502884197169;',

'const float n = 1.0003;', // refractive index of air
'const float N = 2.545E25;', // number of molecules per unit volume for air at						// 288.15K and 1013mb (sea level -45 celsius)
'const float pn = 0.035;',	// depolatization factor for standard air

// wavelength of used primaries, according to preetham
'const vec3 lambda = vec3(680E-9, 550E-9, 450E-9);',

// mie stuff
// K coefficient for the primaries
'const vec3 K = vec3(0.686, 0.678, 0.666);',
'const float v = 4.0;',

// optical length at zenith for molecules
'const float rayleighZenithLength = 8.4E3;',
'const float mieZenithLength = 1.25E3;',
'const vec3 up = vec3(0.0, 1.0, 0.0);',

'const float EE = 1000.0;',
'const float sunAngularDiameterCos = 0.999956676946448443553574619906976478926848692873900859324;',
