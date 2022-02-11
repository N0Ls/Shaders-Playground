precision mediump float;

#define PI 3.141592653

uniform float uTime;

varying vec2 vUv;

vec3 hue( float c )
{
    return smoothstep(0.,1., abs(mod(c*6.+vec3(0,4,2), 6.)-3.)-1.);
}

float random(vec2 st)
{
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

float computeHexDistance(vec2 position)
{
    float hexHalfWidth= .5;
    vec2 diagonal = vec2(1, sqrt(3.));
    position = abs(position);
    return max(dot(position, diagonal * .5), position.x) - hexHalfWidth;
}

vec4 calcHexInfo(vec2 uv)
{
  vec2 diagonal = vec2(1, sqrt(3.));
  vec4 hexCenter = floor((vec4(uv, uv - vec2(.5, 1.)) / diagonal.xyxy)+0.5);
  vec4 offset = vec4(uv - hexCenter.xy * diagonal, uv - (hexCenter.zw + .5) * diagonal);
  return dot(offset.xy, offset.xy) < dot(offset.zw, offset.zw) ? vec4(offset.xy, hexCenter.xy) : vec4(offset.zw, hexCenter.zw);
}


vec2 rotate(vec2 uv, float rotation, vec2 center){
    return vec2(
        cos(rotation) * (uv.x - center.x) + sin(rotation) * (uv.y - center.y) + center.x,
        cos(rotation) * (uv.y - center.y) - sin(rotation) * (uv.x - center.x) + center.y
    );
}

void main() {
  vec2 rotatedUv = rotate(vUv, uTime, vec2(0.5));
  vec4 hexValue = calcHexInfo(
    vec2(
      vUv.x,
      vUv.y 
    ) * 5.
  );
  gl_FragColor=vec4(vec3(hue(random(hexValue.zw))),1.);
}