import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import { useEcg } from '../context';
import { formatTime } from '../../../utils';

export const Chart = () => {
  const { data } = useEcg();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 5,
          left: 20,
          bottom: 80,
        }}
      >
        <CartesianGrid stroke="#808080" />
        <XAxis dataKey="Time" tickFormatter={formatTime} />
        <YAxis
          width={80}
          domain={[-2600, 2600]}
          ticks={Array.from({ length: 53 }, (_, i) => (i - 26) * 100)}
          tickFormatter={(value) => `${value} uV`}
          allowDataOverflow={true}
        />
        <Line
          type="monotone"
          dataKey="1"
          stroke="#fffd02"
          dot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
