precision mediump float;

varying vec3 vPosition;
varying vec2 vUv;

vec2 complexSqr(vec2 z){
  return vec2(pow(z.x,2.0)-pow(z.y,2.0),2.0*z.x*z.y);
}

const int n_Max = 100;

int computeMandelbrot(vec2 coord){
	vec2 z = vec2(0,0);
	for(int i=0; i<n_Max; i++){
		z = complexSqr(z) + coord;
		if(length(z)>2.) return i/n_Max;
	}
	return n_Max;
}

void main() {
    vec2 p = vec2(vPosition.x - 0.25, vPosition.y) * 2.;
    gl_FragColor = vec4(vec3(computeMandelbrot(p)),1.0);
}