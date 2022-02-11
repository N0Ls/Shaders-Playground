precision mediump float;

uniform vec3 uLightDirection_vs;
uniform vec3 uLightIntensity;

uniform vec3 uKd;
uniform vec3 uKs;
uniform float uShininess;

uniform mat4 viewMatrix;

varying vec3 vPosition_vs;
varying vec3 vNormal_vs;

vec3 blinnPhong() {
  return uLightIntensity * (uKd * dot(normalize(uLightDirection_vs), vNormal_vs) + uKs * pow((dot((normalize(-vPosition_vs) + normalize(uLightDirection_vs)) / 2.0, vNormal_vs)), uShininess));
}
void main() {
  gl_FragColor=vec4(blinnPhong(), 1.);
}