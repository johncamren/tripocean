THREE.ShaderChunk["screenplane_pars_vertex"] = [
		
		'const float infinite = 10000000000.0;',
		'const float screenScale = 1.2;',
		'const vec3 groundNormal = vec3( 0.0, 1.0, 0.0 );',
		'const float groundHeight = 0.0;',
		
		'varying vec3 vCamPosition;',
		'varying vec4 vWorldPosition;',
		
		'vec3 interceptPlane( in vec3 source, in vec3 dir, in vec3 normal, float height )',
		'{',
		'	// Compute the distance between the source and the surface, following a ray, then return the intersection',
		'	//float distance = - source.y / dir.y;',
		'	float distance = ( height - dot( normal, source ) ) / dot( dir, normal );',
		'	if( distance < 0.0 )',
		'		return source + dir * distance;',
		'	else ',
		'		return vec3( source.x, 0.0, source.z ) - vec3( dir.x, 0.0, dir.z ) * infinite;',
		'}',
		
		'mat3 getRotation()',
		'{',
		'	// Extract the 3x3 rotation matrix from the 4x4 model view matrix',
		'	return mat3( ',
		'		modelViewMatrix[0].xyz,',
		'		modelViewMatrix[1].xyz,',
		'		modelViewMatrix[2].xyz',
		'	);',
		'}',
		
		'vec3 getCameraPos( in mat3 rotation )',
		'{',
		'	// Xc = R * Xw + t',
		'	// c = - R.t() * t <=> c = - t.t() * R',
		'	return - modelViewMatrix[3].xyz * rotation;',
		'}',

		'vec2 getImagePlan(vec2 coord)',
		'{				',
		'	// Extracting aspect from projection matrix:',
		'	// P = | e   0       0   0 |',
		'	//     | 0   e/(h/w) 0   0 |',
		'	//     | 0   0       .   . |',
		'	//     | 0   0       -1  0 |',
		'	float focal = projectionMatrix[0][0];',
		'	float aspect = projectionMatrix[1][1] / focal;',
			
		'	// Fix coordinate aspect and scale',
		'	return vec2( coord.x * aspect * screenScale, coord.y / aspect * screenScale );',
		'}',
		
		'vec3 getCamRay( in mat3 rotation, in vec2 screenUV )',
		'{',
		'	// Compute camera ray then rotate it in order to get it in world coordinate',
		'	return vec3( screenUV.x, screenUV.y, projectionMatrix[0][0] ) * rotation;',
		'}',
		
		'vec3 computeProjectedPosition()',
		'{',
		'	// Extract camera position and rotation from the model view matrix',
		'	mat3 cameraRotation = getRotation();',
		'	vCamPosition = getCameraPos( cameraRotation );',
		
		'	// Extract coordinate of the vertex on the image plan',
		'	vec2 screenUV = getImagePlan( ( projectionMatrix * vec4( position, 1.0 ) ).xy ) ;',
			
		'	// Compute the ray from camera to world',
		'	vec3 ray = getCamRay( cameraRotation, screenUV );',
			
		'	// Return the intersection between the camera ray and a given plane',
		'	return interceptPlane( vCamPosition, ray, groundNormal, groundHeight );',
		'}'
	
].join('\n');

THREE.ShaderChunk["vertex"] = [
	'vWorldPosition = vec4( computeProjectedPosition(), 1.0 );',
].join('\n');

THREE.ShaderChunk["screenplane_pars_fragment"] = [
		'varying vec3 vCamPosition;',
		'varying vec4 vWorldPosition;'
].join('\n');