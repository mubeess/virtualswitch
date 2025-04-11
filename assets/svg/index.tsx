import { ClipPath, Defs, G, Path, Rect, Svg } from 'react-native-svg';

export const ArrowRightIcon = ({ color = '#000', size = 9 }) => (
  <Svg width={size} height={size} viewBox="0 0 9 9" fill="none">
    <Path
      d="M4.88889 1.58325L7.66667 4.49992M7.66667 4.49992L4.88889 7.41659M7.66667 4.49992L1 4.49992"
      stroke={color}
      stroke-width="1.33333"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);
