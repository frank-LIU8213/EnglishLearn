import { Suspense, lazy } from 'react';
import './SceneIllustration.css';

// 懒加载场景组
const WeatherScenes = lazy(() => import('./scenes/WeatherScenes'));
const TimeScenes = lazy(() => import('./scenes/TimeScenes'));
const ObjectScenes = lazy(() => import('./scenes/ObjectScenes'));
const VehicleLocationScenes = lazy(() => import('./scenes/VehicleLocationScenes'));
const AbstractScenes = lazy(() => import('./scenes/AbstractScenes'));
const EmotionActionScenes = lazy(() => import('./scenes/EmotionActionScenes'));
const LifeScenes = lazy(() => import('./scenes/LifeScenes'));
const WorkTravelScenes = lazy(() => import('./scenes/WorkTravelScenes'));

// 根据图标名称分发到对应的组件族
const getSceneFamily = (icon) => {
  const weather = ['rain', 'snow', 'cloud', 'wind', 'water', 'moon', 'sunrise'];
  const time = ['clock', 'hourglass', 'calendar'];
  const objects = ['book', 'wallet', 'key', 'ring', 'photo', 'frame', 'tooth', 'money', 'food', 'bulb', 'volume', 'lock'];
  const vehicle = ['car', 'plane', 'road', 'map', 'crossroads', 'mountain', 'city'];
  const abstract = ['puzzle', 'target', 'brain', 'link', 'gap', 'arrow_up', 'refresh', 'check', 'warning', 'scale', 'music', 'empty', 'trophy', 'megaphone', 'magnifier', 'ruler', 'star', 'fire', 'energy'];
  const emotion = ['handshake', 'thinking', 'angry', 'hand', 'wave', 'fist', 'walk', 'stop', 'heart', 'smile', 'face', 'tear', 'child', 'shrug', 'peace', 'run'];
  
  // 新增两大场景族：生活类与职场出行类
  const life = ['receipt', 'plate_fork', 'coffee_cup', 'bag', 'shopping_cart', 'box', 'mirror', 'fridge', 'sofa', 'plant', 'pill', 'stethoscope'];
  const workTravel = ['home', 'briefcase', 'message', 'chart_bar', 'bed', 'keycard', 'laptop', 'phone'];

  if (life.includes(icon)) return LifeScenes;
  if (workTravel.includes(icon)) return WorkTravelScenes;
  if (weather.includes(icon)) return WeatherScenes;
  if (time.includes(icon)) return TimeScenes;
  if (objects.includes(icon)) return ObjectScenes;
  if (vehicle.includes(icon)) return VehicleLocationScenes;
  if (abstract.includes(icon)) return AbstractScenes;
  if (emotion.includes(icon)) return EmotionActionScenes;
  
  return AbstractScenes; // fallback
};

export default function SceneIllustration({ sentence }) {
  const { scene_icon, animation_type } = sentence;
  const icon = scene_icon || 'star';
  
  // 决定色调情绪
  const isWarm = ['shatter_effect', 'verb_flip'].includes(animation_type);
  const color1 = isWarm ? 'var(--accent-amber)' : 'var(--accent-cyan)';
  const color2 = isWarm ? 'var(--accent-red)' : 'var(--accent-purple)';

  const SceneComponent = getSceneFamily(icon);

  return (
    <div className="scene-illustration custom-engine">
      <Suspense fallback={<div className="scene-loading" />}>
        <SceneComponent icon={icon} color1={color1} color2={color2} />
      </Suspense>
    </div>
  );
}
