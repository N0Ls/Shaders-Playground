precision mediump float;

#define PI 3.141592653
uniform vec3 uColor;
uniform float uSinXScale;
uniform float uSinYScale;
uniform float uSinXOffset;
uniform float uSinYOffset;
uniform float uXSpeed;
uniform float uYSpeed;
uniform float uXCenter;
uniform float uYCenter;
uniform float uThickness;
uniform float uTime;

varying vec2 vUv;

float random(vec2 st)
{
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

vec2 rotate(vec2 uv, float rotation, vec2 center){
    return vec2(
        cos(rotation) * (uv.x - center.x) + sin(rotation) * (uv.y - center.y) + center.x,
        cos(rotation) * (uv.y - center.y) - sin(rotation) * (uv.x - center.x) + center.y
    );
}

void main()
{
    vec2 wavedUv = vec2(
        vUv.x + sin(vUv.y * uSinXScale + uSinXOffset + (uXSpeed * uTime)) * 0.1,
        vUv.y + sin(vUv.x * uSinYScale + uSinYOffset + (uYSpeed * uTime)) * 0.1
    );
    float strength = 1.-step(uThickness, abs(distance(wavedUv, vec2(uXCenter,uYCenter))- 0.25));


    gl_FragColor = vec4(strength, strength, strength, 1.0);
}