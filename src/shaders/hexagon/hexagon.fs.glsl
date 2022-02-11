precision mediump float;

#define PI 3.141592653

uniform float uTime;

varying vec2 vUv;

float computeHexDistance(vec2 position)
{
    float hexHalfWidth= .5;
    vec2 diagonal = vec2(1, sqrt(3.));
    position = abs(position);
    return max(dot(position, diagonal * .5), position.x) - hexHalfWidth;
}

vec2 rotate(vec2 uv, float rotation, vec2 center){
    return vec2(
        cos(rotation) * (uv.x - center.x) + sin(rotation) * (uv.y - center.y) + center.x,
        cos(rotation) * (uv.y - center.y) - sin(rotation) * (uv.x - center.x) + center.y
    );
}

void main() {
  vec2 rotatedUv = rotate(vUv, uTime, vec2(0.5));
  float hexValue = computeHexDistance(
    vec2(
      (rotatedUv.x * 1.) - 0.5 ,
      (rotatedUv.y * 1.) - 0.5 
    ) * 1.2
  );
  gl_FragColor=vec4(vec3(smoothstep(.001,0.,hexValue)),1.);
}