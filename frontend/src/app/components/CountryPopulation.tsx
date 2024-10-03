import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface PopulationData {
  year: number;
  value: number;
}

interface CountryPopulationProps {
  populationData: PopulationData[];
}

const CountryPopulation: React.FC<CountryPopulationProps> = ({
  populationData,
}) => {
  return (
    <ResponsiveContainer width="100%" aspect={3}>
      <AreaChart
        data={populationData}
        margin={{
          top: 10,
          right: 100,
          left: 20,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="value"
          stackId="1"
          stroke="#8884d8"
          fill="#8884d8"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default CountryPopulation;