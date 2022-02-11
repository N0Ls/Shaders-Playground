precision mediump float;

uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
uniform mat4 normalMatrix;

attribute vec3 position;
attribute vec2 uv;
attribute vec3 normal;

varying vec3 vPosition_vs;
varying vec3 vNormal_vs;

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;

    vec4 vertexPosition = vec4(position, 1.);
    vec4 vertexNormal = vec4(normal, 0.);

    vPosition_vs = vec3(viewMatrix * vertexPosition);
    vNormal_vs = vec3(normalMatrix * vertexNormal);
}